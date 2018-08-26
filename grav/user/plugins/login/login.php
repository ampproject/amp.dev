<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Language\Language;
use Grav\Common\Page\Page;
use Grav\Common\Page\Pages;
use Grav\Common\Plugin;
use Grav\Common\Twig\Twig;
use Grav\Common\User\User;
use Grav\Common\Utils;
use Grav\Common\Uri;
use Grav\Plugin\Login\Events\UserLoginEvent;
use Grav\Plugin\Login\Login;
use Grav\Plugin\Login\Controller;
use Grav\Plugin\Login\RememberMe\RememberMe;
use RocketTheme\Toolbox\Event\Event;
use RocketTheme\Toolbox\Session\Message;

/**
 * Class LoginPlugin
 * @package Grav\Plugin\Login
 */
class LoginPlugin extends Plugin
{
    const TMP_COOKIE_NAME = 'tmp-message';

    /** @var string */
    protected $route;

    /** @var string */
    protected $route_register;

    /** @var string */
    protected $route_forgot;

    /** @var bool */
    protected $authenticated = true;

    /** @var Login */
    protected $login;

    protected $redirect_to_login;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized'      => [['initializeSession', 10000], ['initializeLogin', 1000]],
            'onTask.login.login'        => ['loginController', 0],
            'onTask.login.twofa'        => ['loginController', 0],
            'onTask.login.forgot'       => ['loginController', 0],
            'onTask.login.logout'       => ['loginController', 0],
            'onTask.login.reset'        => ['loginController', 0],
            'onPagesInitialized'        => [['storeReferrerPage', 0], ['pageVisibility', 0]],
            'onPageInitialized'         => ['authorizePage', 0],
            'onPageFallBackUrl'         => ['authorizeFallBackUrl', 0],
            'onTwigTemplatePaths'       => ['onTwigTemplatePaths', 0],
            'onTwigSiteVariables'       => ['onTwigSiteVariables', -100000],
            'onFormProcessed'           => ['onFormProcessed', 0],
            'onUserLoginAuthenticate'   => [['userLoginAuthenticateByRegistration', 10002], ['userLoginAuthenticateByRememberMe', 10001], ['userLoginAuthenticateByEmail', 10000], ['userLoginAuthenticate', 0]],
            'onUserLoginAuthorize'      => ['userLoginAuthorize', 0],
            'onUserLoginFailure'        => ['userLoginFailure', 0],
            'onUserLogin'               => ['userLogin', 0],
            'onUserLogout'              => ['userLogout', 0],
        ];
    }

    /**
     * [onPluginsInitialized] Initialize login plugin if path matches.
     * @throws \RuntimeException
     */
    public function initializeSession()
    {
        // Check to ensure sessions are enabled.
        if (!$this->config->get('system.session.enabled')) {
            throw new \RuntimeException('The Login plugin requires "system.session" to be enabled');
        }

        // Autoload classes
        $autoload = __DIR__ . '/vendor/autoload.php';
        if (!is_file($autoload)) {
            throw new \RuntimeException('Login Plugin failed to load. Composer dependencies not met.');
        }
        require_once $autoload;

        // Define login service.
        $this->grav['login'] = function (Grav $c) {
            return new Login($c);
        };

        // Define current user service.
        $this->grav['user'] = function (Grav $c) {
            $session = $c['session'];

            if (empty($session->user)) {
                $session->user = $c['login']->login(['username' => ''], ['remember_me' => true, 'remember_me_login' => true]);
            }

            return $session->user;
        };
    }

    /**
     * [onPluginsInitialized] Initialize login plugin if path matches.
     * @throws \RuntimeException
     */
    public function initializeLogin()
    {
        $this->login = $this->grav['login'];

        /** @var Uri $uri */
        $uri = $this->grav['uri'];

        // Admin has its own login; make sure we're not in admin.
        if (!isset($this->grav['admin'])) {
            $this->route = $this->config->get('plugins.login.route');
        }

        $path = $uri->path();
        $this->redirect_to_login = $this->config->get('plugins.login.redirect_to_login');

        // Register route to login page if it has been set.
        if ($this->route && $this->route === $path) {
            $this->enable([
                'onPagesInitialized' => ['addLoginPage', 0],
            ]);
            return;
        }

        if ($path === $this->config->get('plugins.login.route_forgot')) {
            $this->enable([
                'onPagesInitialized' => ['addForgotPage', 0],
            ]);
            return;
        }

        if ($path === $this->config->get('plugins.login.route_reset')) {
            $this->enable([
                'onPagesInitialized' => ['addResetPage', 0],
            ]);
            return;
        }

        if ($path === $this->config->get('plugins.login.route_register')) {
            if ($this->config->get('plugins.login.user_registration.enabled')) {
                $this->enable([
                    'onPagesInitialized' => ['addRegisterPage', 0],
                ]);
            } else {
                throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.REGISTRATION_DISABLED'), 404);
            }
            return;
        }

        if ($path === $this->config->get('plugins.login.route_activate')) {
            $this->enable([
                'onPagesInitialized' => ['handleUserActivation', 0],
            ]);
            return;
        }

        if ($path === $this->config->get('plugins.login.route_profile')) {
            $this->enable([
                'onPagesInitialized' => ['addProfilePage', 0],
            ]);
            return;
        }
    }

    /**
     * Optional ability to dynamically set visibility based on page access and page header
     * that states `login.visibility_requires_access: true`
     *
     * Note that this setting may be slow on large sites as it loads all pages into memory for each page load!
     *
     * @param Event $e
     */
    public function pageVisibility(Event $e)
    {
        if ($this->config->get('plugins.login.dynamic_page_visibility')) {
            /** @var Pages $pages */
            $pages = $e['pages'];
            $user = $this->grav['user'];

            foreach ($pages->instances() as $page) {
                $header = $page->header();
                if (isset($header->login['visibility_requires_access'])) {
                    $config = $this->mergeConfig($page);
                    $access = $this->login->isUserAuthorizedForPage($user, $page, $config);
                    if ($access === false) {
                        $page->visible(false);
                    }
                }
            }
        }
    }

    /**
     * [onPagesInitialized]
     */
    public function storeReferrerPage()
    {
        $invalid_redirect_routes = [
            $this->config->get('plugins.login.route') ?: '/login',
            $this->config->get('plugins.login.route_register') ?: '/register',
            $this->config->get('plugins.login.route_activate') ?: '/activate_user',
            $this->config->get('plugins.login.route_forgot') ?: '/forgot_password',
            $this->config->get('plugins.login.route_reset') ?: '/reset_password',
        ];

        /** @var Uri $uri */
        $uri = $this->grav['uri'];
        $current_route = $uri->route();
        $redirect = $this->grav['config']->get('plugins.login.redirect_after_login');

        if (!$redirect && !in_array($current_route, $invalid_redirect_routes, true)) {
            // No login redirect set in the configuration; can we redirect to the current page?
            $allowed = true;

            /** @var Page $page */
            $page = $this->grav['pages']->dispatch($current_route);

            if ($page) {
                $header = $page->header();
                if (isset($header->login_redirect_here) && $header->login_redirect_here === false) {
                    $allowed = false;
                }

                if ($allowed && $page->routable()) {
                    $redirect = $page->route() . ($uri->params() ?: '');
                }
            }
        }

        $this->grav['session']->redirect_after_login = $redirect;
    }

    /**
     * Add Login page
     * @throws \Exception
     */
    public function addLoginPage()
    {
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($this->route);

        if (!$page) {
            // Only add login page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . '/pages/login.md'));
            $page->slug(basename($this->route));

            $pages->addPage($page, $this->route);
        }
    }

    /**
     * Add Login page
     * @throws \Exception
     */
    public function addForgotPage()
    {
        $route = $this->config->get('plugins.login.route_forgot');
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add forgot page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . '/pages/forgot.md'));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Add Reset page
     * @throws \Exception
     */
    public function addResetPage()
    {
        $route = $this->config->get('plugins.login.route_reset');

        $uri = $this->grav['uri'];
        $token = $uri->param('token');
        $user = $uri->param('user');

        if (!$user || !$token) {
            return;
        }

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add login page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . '/pages/reset.md'));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Add Register page
     * @throws \Exception
     */
    public function addRegisterPage()
    {
        $route = $this->config->get('plugins.login.route_register');

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . '/pages/register.md'));
            $page->template('form');
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }
    }

    /**
     * Handle user activation
     * @throws \RuntimeException
     */
    public function handleUserActivation()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];

        /** @var Message $messages */
        $messages = $this->grav['messages'];

        $username = $uri->param('username');

        $token = $uri->param('token');
        $user = User::load($username);

        if (empty($user->activation_token)) {
            $message = $this->grav['language']->translate('PLUGIN_LOGIN.INVALID_REQUEST');
            $messages->add($message, 'error');
        } else {
            list($good_token, $expire) = explode('::', $user->activation_token, 2);

            if ($good_token === $token) {
                if (time() > $expire) {
                    $message = $this->grav['language']->translate('PLUGIN_LOGIN.ACTIVATION_LINK_EXPIRED');
                    $messages->add($message, 'error');
                } else {
                    $user['state'] = 'enabled';
                    unset($user['activation_token']);
                    $user->save();

                    $message = $this->grav['language']->translate('PLUGIN_LOGIN.USER_ACTIVATED_SUCCESSFULLY');
                    $messages->add($message, 'info');

                    if ($this->config->get('plugins.login.user_registration.options.send_welcome_email', false)) {
                        $this->login->sendWelcomeEmail($user);
                    }
                    if ($this->config->get('plugins.login.user_registration.options.send_notification_email', false)) {
                        $this->login->sendNotificationEmail($user);
                    }

                    if ($this->config->get('plugins.login.user_registration.options.login_after_registration', false)) {
                        $this->login->login(['username' => $username], ['after_registration' => true]);
                    }
                }
            } else {
                $message = $this->grav['language']->translate('PLUGIN_LOGIN.INVALID_REQUEST');
                $messages->add($message, 'error');
            }
        }

        $redirect_route = $this->config->get('plugins.login.user_registration.redirect_after_activation', '/');
        $this->grav->redirect($redirect_route);
    }

    /**
     * Add Profile page
     */
    public function addProfilePage()
    {
        $route = $this->config->get('plugins.login.route_profile');
        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            // Only add forgot page if it hasn't already been defined.
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . "/pages/profile.md"));
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }

        $this->storeReferrerPage();
    }

    /**
     * Set Unauthorized page
     * @throws \Exception
     */
    public function setUnauthorizedPage()
    {
        $route = $this->config->get('plugins.login.route_unauthorized');

        /** @var Pages $pages */
        $pages = $this->grav['pages'];
        $page = $pages->dispatch($route);

        if (!$page) {
            $page = new Page;
            $page->init(new \SplFileInfo(__DIR__ . '/pages/unauthorized.md'));
            $page->template('default');
            $page->slug(basename($route));

            $pages->addPage($page, $route);
        }

        unset($this->grav['page']);
        $this->grav['page'] = $page;
    }

    /**
     * Initialize login controller
     */
    public function loginController()
    {
        /** @var Uri $uri */
        $uri = $this->grav['uri'];
        $task = !empty($_POST['task']) ? $_POST['task'] : $uri->param('task');
        $task = substr($task, strlen('login.'));
        $post = !empty($_POST) ? $_POST : [];

        switch ($task) {
            case 'login':
                if (!isset($post['login-form-nonce']) || !Utils::verifyNonce($post['login-form-nonce'], 'login-form')) {
                    $this->grav['messages']->add($this->grav['language']->translate('PLUGIN_LOGIN.ACCESS_DENIED'),
                        'info');
                    $twig = $this->grav['twig'];
                    $twig->twig_vars['notAuthorized'] = true;

                    return;
                }
                break;

            case 'forgot':
                if (!isset($post['forgot-form-nonce']) || !Utils::verifyNonce($post['forgot-form-nonce'], 'forgot-form')) {
                    $this->grav['messages']->add($this->grav['language']->translate('PLUGIN_LOGIN.ACCESS_DENIED'),'info');
                    return;
                }
                break;
        }

        $controller = new Controller($this->grav, $task, $post);
        $controller->execute();
        $controller->redirect();
    }

    /**
     * Authorize the Page fallback url (page media accessed through the page route)
     */
    public function authorizeFallBackUrl()
    {
        if ($this->config->get('plugins.login.protect_protected_page_media', false)) {
            $page_url = dirname($this->grav['uri']->path());
            $page = $this->grav['pages']->find($page_url);
            unset($this->grav['page']);
            $this->grav['page'] = $page;
            $this->authorizePage();
        }
    }

    /**
     * [onPageInitialized] Authorize Page
     */
    public function authorizePage()
    {
        if (!$this->authenticated) {
            return;
        }

        /** @var User $user */
        $user = $this->grav['user'];

        /** @var Page $page */
        $page = $this->grav['page'];

        if (!$page || $this->grav['login']->isUserAuthorizedForPage($user, $page, $this->mergeConfig($page))) {
            return;
        }

        // If this is not an HTML page request, simply throw a 403 error
        $uri_extension = $this->grav['uri']->extension('html');
        $supported_types = $this->config->get('media.types');
        if ($uri_extension !== 'html' && array_key_exists($uri_extension, $supported_types)) {
            header('HTTP/1.0 403 Forbidden');
            exit;
        }

        $authorized = $user->authenticated && $user->authorized;

        // User is not logged in; redirect to login page.
        if ($this->redirect_to_login && $this->route && !$authorized) {
            $this->grav->redirect($this->route, 302);
        }

        /** @var Twig $twig */
        $twig = $this->grav['twig'];

        // Reset page with login page.
        if (!$authorized) {
            if ($this->route) {
                $page = $this->grav['pages']->dispatch($this->route);
            } else {

                $page = new Page;
                // $this->grav['session']->redirect_after_login = $this->grav['uri']->path() . ($this->grav['uri']->params() ?: '');

                // Get the admin Login page is needed, else teh default
                if ($this->isAdmin()) {
                    $login_file = $this->grav['locator']->findResource('plugins://admin/pages/admin/login.md');
                    $page->init(new \SplFileInfo($login_file));
                } else {
                    $page->init(new \SplFileInfo(__DIR__ . '/pages/login.md'));
                }

                $page->slug(basename($this->route));

                /** @var Pages $pages */
                $pages = $this->grav['pages'];
                $pages->addPage($page, $this->route);
            }

            $this->authenticated = false;
            unset($this->grav['page']);
            $this->grav['page'] = $page;

            $twig->twig_vars['form'] = new Form($page);
        } else {
            /** @var Language $l */
            $l = $this->grav['language'];
            $this->grav['messages']->add($l->translate('PLUGIN_LOGIN.ACCESS_DENIED'), 'error');
            $twig->twig_vars['notAuthorized'] = true;

            $this->setUnauthorizedPage();
        }
    }

    /**
     * [onTwigTemplatePaths] Add twig paths to plugin templates.
     */
    public function onTwigTemplatePaths()
    {
        $twig = $this->grav['twig'];
        $twig->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * [onTwigSiteVariables] Set all twig variables for generating output.
     */
    public function onTwigSiteVariables()
    {
        /** @var Twig $twig */
        $twig = $this->grav['twig'];

        $this->grav->fireEvent('onLoginPage');

        $extension = $this->grav['uri']->extension();
        $extension = $extension ?: 'html';

        if (!$this->authenticated) {
            $twig->template = "login.{$extension}.twig";
        }

        // add CSS for frontend if required
        if (!$this->isAdmin() && $this->config->get('plugins.login.built_in_css')) {
            $this->grav['assets']->add('plugin://login/css/login.css');
        }

        $task = $this->grav['uri']->param('task') ?: (isset($_POST['task']) ? $_POST['task'] : '');
        $task = substr($task, strlen('login.'));
        if ($task === 'reset') {
            $username = $this->grav['uri']->param('user');
            $token = $this->grav['uri']->param('token');

            if (!empty($username) && !empty($token)) {
                $twig->twig_vars['username'] = $username;
                $twig->twig_vars['token'] = $token;
            }
        } elseif ($task === 'login') {
            $twig->twig_vars['username'] = isset($_POST['username']) ? $_POST['username'] : '';
        }

        $flashData = $this->grav['session']->getFlashCookieObject(self::TMP_COOKIE_NAME);

        if (isset($flashData->message)) {
            $this->grav['messages']->add($flashData->message, $flashData->status);
        }
    }

    /**
     * Process the user registration, triggered by a registration form
     *
     * @param Form $form
     * @throws \RuntimeException
     */
    private function processUserRegistration($form, Event $event)
    {
        $language = $this->grav['language'];
        $messages = $this->grav['messages'];

        if (!$this->config->get('plugins.login.enabled')) {
            throw new \RuntimeException($language->translate('PLUGIN_LOGIN.PLUGIN_LOGIN_DISABLED'));
        }

        if (!$this->config->get('plugins.login.user_registration.enabled')) {
            throw new \RuntimeException($language->translate('PLUGIN_LOGIN.USER_REGISTRATION_DISABLED'));
        }

        // Check for existing username
        $username = $form->value('username');
        $existing_username = User::find($username,['username']);
        if ($existing_username->exists()) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $language->translate([
                    'PLUGIN_LOGIN.USERNAME_NOT_AVAILABLE',
                    $username
                ])
            ]));
            $event->stopPropagation();
            return;
        }

        // Check for existing email
        $email    = $form->value('email');
        $existing_email = User::find($email,['email']);
        if ($existing_email->exists()) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $language->translate([
                    'PLUGIN_LOGIN.EMAIL_NOT_AVAILABLE',
                    $email
                ])
            ]));
            $event->stopPropagation();
            return;
        }

        $data = [];
        $data['username'] = $username;


        // if multiple password fields, check they match and set password field from it
        if ($this->config->get('plugins.login.user_registration.options.validate_password1_and_password2',
            false)
        ) {
            if ($form->value('password1') !== $form->value('password2')) {
                $this->grav->fireEvent('onFormValidationError', new Event([
                    'form'    => $form,
                    'message' => $language->translate('PLUGIN_LOGIN.PASSWORDS_DO_NOT_MATCH')
                ]));
                $event->stopPropagation();

                return;
            }
            $data['password'] = $form->value('password1');
        }

        $fields = (array)$this->config->get('plugins.login.user_registration.fields', []);

        foreach ($fields as $field) {
            // Process value of field if set in the page process.register_user
            $default_values = (array)$this->config->get('plugins.login.user_registration.default_values');
            if ($default_values) {
                foreach ($default_values as $key => $param) {

                    if ($key === $field) {
                        if (is_array($param)) {
                            $values = explode(',', $param);
                        } else {
                            $values = $param;
                        }
                        $data[$field] = $values;
                    }
                }
            }

            if (!isset($data[$field]) && $form->value($field)) {
                $data[$field] = $form->value($field);
            }
        }

        if ($this->config->get('plugins.login.user_registration.options.set_user_disabled', false)) {
            $data['state'] = 'disabled';
        } else {
            $data['state'] = 'enabled';
        }

        $this->grav->fireEvent('onUserLoginRegisterData', new Event(['data' => &$data]));
        $user = $this->login->register($data);

        $fullname = $user->fullname ?: $user->username;

        if ($this->config->get('plugins.login.user_registration.options.send_activation_email', false)) {
            $this->login->sendActivationEmail($user);
            $message = $language->translate(['PLUGIN_LOGIN.ACTIVATION_NOTICE_MSG', $fullname]);
            $messages->add($message, 'info');
        } else {
            if ($this->config->get('plugins.login.user_registration.options.send_welcome_email', false)) {
                $this->login->sendWelcomeEmail($user);
            }
            if ($this->config->get('plugins.login.user_registration.options.send_notification_email', false)) {
                $this->login->sendNotificationEmail($user);
            }
            $message = $language->translate(['PLUGIN_LOGIN.WELCOME_NOTICE_MSG', $fullname]);
            $messages->add($message, 'info');
        }

        $this->grav->fireEvent('onUserLoginRegistered', new Event(['user' => $user]));

        if (isset($data['state']) && $data['state'] === 'enabled' && $this->config->get('plugins.login.user_registration.options.login_after_registration', false)) {
            $this->login->login(['username' => $username], ['after_registration' => true], ['user' => $user]);
        }

        $redirect = $this->config->get('plugins.login.user_registration.redirect_after_registration', false);
        if ($redirect) {
            $this->grav->redirect($redirect);
        }
    }

    /**
     * Save user profile information
     *
     * @param Form $form
     * @param Event $event
     * @return bool
     */
    private function processUserProfile($form, Event $event)
    {
        /** @var User $user */
        $user     = $this->grav['user'];
        $language = $this->grav['language'];

        // Don't save if user doesn't exist
        if (!$user->exists()) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $language->translate('PLUGIN_LOGIN.USER_IS_REMOTE_ONLY')
            ]));
            $event->stopPropagation();
            return;
        }

        // Stop overloading of username
        $username = $form->value('username');
        if (isset($username)) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $language->translate([
                    'PLUGIN_LOGIN.USERNAME_NOT_AVAILABLE',
                    $username
                ])
            ]));
            $event->stopPropagation();
            return;
        }

        // Check for existing email
        $email    = $form->value('email');
        $existing_email = User::find($email,['email']);
        if ($user->username != $existing_email->username && $existing_email->exists()) {
            $this->grav->fireEvent('onFormValidationError', new Event([
                'form'    => $form,
                'message' => $language->translate([
                    'PLUGIN_LOGIN.EMAIL_NOT_AVAILABLE',
                    $email
                ])
            ]));
            $event->stopPropagation();
            return;
        }

        $user->merge($form->getData()->toArray());

        try {
            $user->save();
        } catch (\Exception $e) {
            $form->setMessage($e->getMessage(), 'error');
            return false;
        }

        return true;
    }

    /**
     * [onFormProcessed] Process a registration form. Handles the following actions:
     *
     * - register_user: registers a user
     * - update_user: updates user profile
     *
     * @param Event $event
     * @throws \RuntimeException
     */
    public function onFormProcessed(Event $event)
    {
        $form = $event['form'];
        $action = $event['action'];

        switch ($action) {
            case 'register_user':
                $this->processUserRegistration($form, $event);
                break;
            case 'update_user':
                $this->processUserProfile($form, $event);
                break;
        }
    }

    /**
     * @param UserLoginEvent $event
     * @throws \RuntimeException
     */
    public function userLoginAuthenticateByRegistration(UserLoginEvent $event)
    {
        // Check that we're logging in after registration.
        if (!$event->getOption('after_registration') || $this->isAdmin()) {
            return;
        }

        $event->setStatus($event::AUTHENTICATION_SUCCESS);
        $event->stopPropagation();
    }

    /**
     * @param UserLoginEvent $event
     * @throws \RuntimeException
     */
    public function userLoginAuthenticateByRememberMe(UserLoginEvent $event)
    {
        // Check that we're logging in with remember me.
        if (!$event->getOption('remember_me_login') || !$event->getOption('remember_me') || $this->isAdmin()) {
            return;
        }

        // Only use remember me if user isn't set and feature is enabled.
        if ($this->grav['config']->get('plugins.login.rememberme.enabled') && !$event->getUser()->exists()) {
            /** @var RememberMe $rememberMe */
            $rememberMe = $this->grav['login']->rememberMe();
            $username = $rememberMe->login();

            if ($rememberMe->loginTokenWasInvalid()) {
                // Token was invalid. We will display error page as this was likely an attack.
                throw new \RuntimeException($this->grav['language']->translate('PLUGIN_LOGIN.REMEMBER_ME_STOLEN_COOKIE'), 403);
            }

            if ($username === false) {
                // User has not been remembered, there is no point of continuing.
                $event->setStatus($event::AUTHENTICATION_FAILURE);
                $event->stopPropagation();

                return;
            }

            // Allow remember me to work with different login methods.
            $event->setCredential('username', $username);
            $event->setUser(User::load($username, false));
        }
    }

    public function userLoginAuthenticateByEmail(UserLoginEvent $event)
    {
        if (($username = $event->getCredential('username')) && !$event->getUser()->exists()) {
            $event->setUser(User::find($username));
        }
    }

    public function userLoginAuthenticate(UserLoginEvent $event)
    {
        $user = $event->getUser();
        $credentials = $event->getCredentials();

        if (!$user->exists()) {
            // Never let non-existing users to pass the authentication.
            // Higher level plugins may override this behavior by stopping propagation.
            $event->setStatus($event::AUTHENTICATION_FAILURE);
            $event->stopPropagation();

            return;
        }

        // Never let empty password to pass the authentication.
        // Higher level plugins may override this behavior by stopping propagation.
        if (empty($credentials['password'])) {
            $event->setStatus($event::AUTHENTICATION_FAILURE);
            $event->stopPropagation();

            return;
        }

        // Try default user authentication. Stop propagation if authentication succeeds.
        if ($user->authenticate($credentials['password'])) {
            $event->setStatus($event::AUTHENTICATION_SUCCESS);
            $event->stopPropagation();

            return;
        }

        // If authentication status is undefined, lower level event handlers may still be able to authenticate user.
    }

    public function userLoginAuthorize(UserLoginEvent $event)
    {
        // Always block access if authorize defaulting to site.login fails.
        $user = $event->getUser();
        foreach ($event->getAuthorize() as $authorize) {
            if (!$user->authorize($authorize)) {
                $event->setStatus($event::AUTHORIZATION_DENIED);
                $event->stopPropagation();

                return;
            }
        }

        if ($event->getOption('twofa') && $user->twofa_enabled && $user->twofa_secret) {
            $event->setStatus($event::AUTHORIZATION_DELAYED);
        }
    }

    public function userLoginFailure(UserLoginEvent $event)
    {
        $this->grav['session']->user = User::load('', false);
    }

    public function userLogin(UserLoginEvent $event)
    {
        $session = $this->grav['session'];
        $session->user = $event->getUser();

        if ($event->getOption('remember_me')) {
            /** @var Login $login */
            $login = $this->grav['login'];

            $session->remember_me = (bool)$event->getOption('remember_me_login');

            // If the user wants to be remembered, create Rememberme cookie.
            $username = $event->getUser()->get('username');
            if ($event->getCredential('rememberme')) {
                $login->rememberMe()->createCookie($username);
            } else {
                $login->rememberMe()->getStorage()->cleanAllTriplets($username);
                $login->rememberMe()->clearCookie();
            }
        }
    }

    public function userLogout(UserLoginEvent $event)
    {
        if ($event->getOption('remember_me')) {
            /** @var Login $login */
            $login = $this->grav['login'];

            if (!$login->rememberMe()->login()) {
                $login->rememberMe()->getStorage()->cleanAllTriplets($event->getUser()->get('username'));
            }
            $login->rememberMe()->clearCookie();
        }

        $this->grav['session']->invalidate()->start();
    }
}
