<?php
namespace Grav\Plugin;

use Grav\Common\Grav;
use Grav\Common\Plugin;
use Grav\Common\Twig\Twig;
use Grav\Plugin\Email\Email;
use RocketTheme\Toolbox\Event\Event;
use Swift_RfcComplianceException;

class EmailPlugin extends Plugin
{
    /**
     * @var Email
     */
    protected $email;

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            'onPluginsInitialized' => ['onPluginsInitialized', 0],
            'onFormProcessed' => ['onFormProcessed', 0],
            'onTwigTemplatePaths' => ['onTwigTemplatePaths', 0]
        ];
    }

    /**
     * Initialize emailing.
     */
    public function onPluginsInitialized()
    {
        require_once __DIR__ . '/vendor/autoload.php';

        $this->email = new Email();

        if ($this->email->enabled()) {
            $this->grav['Email'] = $this->email;
        }
    }

    /**
     * Add twig paths to plugin templates.
     */
    public function onTwigTemplatePaths()
    {
        $twig = $this->grav['twig'];
        $twig->twig_paths[] = __DIR__ . '/templates';
    }

    /**
     * Send email when processing the form data.
     *
     * @param Event $event
     */
    public function onFormProcessed(Event $event)
    {
        $form = $event['form'];
        $action = $event['action'];
        $params = $event['params'];

        if (!$this->email->enabled()) {
            return;
        }

        switch ($action) {
            case 'email':
                // Prepare Twig variables
                $vars = array(
                    'form' => $form
                );

                $grav = Grav::instance();
                $grav->fireEvent('onEmailSend', new Event(['params' => &$params, 'vars' => &$vars]));

                // Build message
                $message = $this->buildMessage($params, $vars);

                if (isset($params['attachments'])) {
                    $filesToAttach = (array)$params['attachments'];
                    if ($filesToAttach) foreach ($filesToAttach as $fileToAttach) {
                        $filesValues = $form->value($fileToAttach);

                        if ($filesValues) foreach($filesValues as $fileValues) {
                            if (isset($fileValues['file'])) {
                                $filename = $fileValues['file'];
                            } else {
                                $filename = ROOT_DIR . $fileValues['path'];
                            }

                            $message->attach(\Swift_Attachment::fromPath($filename));
                        }
                    }
                }

                // Send e-mail
                $this->email->send($message);
                break;
        }
    }

    /**
     * Build e-mail message.
     *
     * @param array $params
     * @param array $vars
     * @return \Swift_Message
     */
    protected function buildMessage(array $params, array $vars = array())
    {
        /** @var Twig $twig */
        $twig = $this->grav['twig'];

        // Extend parameters with defaults.
        $params += array(
            'bcc' => $this->config->get('plugins.email.bcc', array()),
            'body' => $this->config->get('plugins.email.body', '{% include "forms/data.html.twig" %}'),
            'cc' => $this->config->get('plugins.email.cc', array()),
            'cc_name' => $this->config->get('plugins.email.cc_name'),
            'charset' =>  $this->config->get('plugins.email.charset', 'utf-8'),
            'from' => $this->config->get('plugins.email.from'),
            'from_name' => $this->config->get('plugins.email.from_name'),
            'content_type' => $this->config->get('plugins.email.content_type', 'text/html'),
            'reply_to' => $this->config->get('plugins.email.reply_to', array()),
            'reply_to_name' => $this->config->get('plugins.email.reply_to_name'),
            'subject' => !empty($vars['form']) && $vars['form'] instanceof Form ? $vars['form']->page()->title() : null,
            'to' => $this->config->get('plugins.email.to'),
            'to_name' => $this->config->get('plugins.email.to_name'),
            'process_markdown' => false,
        );

        // Create message object.
        $message = $this->email->message();

        if (!$params['to']) {
            throw new \RuntimeException($this->grav['language']->translate('PLUGIN_EMAIL.PLEASE_CONFIGURE_A_TO_ADDRESS'));
        }
        if (!$params['from']) {
            throw new \RuntimeException($this->grav['language']->translate('PLUGIN_EMAIL.PLEASE_CONFIGURE_A_FROM_ADDRESS'));
        }

        // Process parameters.
        foreach ($params as $key => $value) {
            switch ($key) {
                case 'bcc':
                    foreach ($this->parseAddressValue($value, $vars) as $address) {
                        try {
                            $message->addBcc($address->mail, $address->name);
                        } catch (Swift_RfcComplianceException $e) {
                            continue;
                        }
                    }
                    break;

                case 'body':
                    if (is_string($value)) {
                        $body = $twig->processString($value, $vars);

                        if ($params['process_markdown']) {
                            $parsedown = new \Parsedown();
                            $body = $parsedown->text($body);
                        }

                        $content_type = !empty($params['content_type']) ? $twig->processString($params['content_type'], $vars) : null;
                        $charset = !empty($params['charset']) ? $twig->processString($params['charset'], $vars) : null;

                        $message->setBody($body, $content_type, $charset);
                    }
                    elseif (is_array($value)) {
                        foreach ($value as $body_part) {
                            $body_part += array(
                                'charset' => $params['charset'],
                                'content_type' => $params['content_type'],
                            );

                            $body = !empty($body_part['body']) ? $twig->processString($body_part['body'], $vars) : null;

                            if ($params['process_markdown']) {
                                $parsedown = new \Parsedown();
                                $body = $parsedown->text($body);
                            }

                            $content_type = !empty($body_part['content_type']) ? $twig->processString($body_part['content_type'], $vars) : null;
                            $charset = !empty($body_part['charset']) ? $twig->processString($body_part['charset'], $vars) : null;

                            if (!$message->getBody()) {
                                $message->setBody($body, $content_type, $charset);
                            }
                            else {
                                $message->addPart($body, $content_type, $charset);
                            }
                        }
                    }
                    break;

                case 'cc':
                    if (is_string($value) && !empty($params['cc_name'])) {
                        $value = array(
                            'mail' => $twig->processString($value, $vars),
                            'name' => $twig->processString($params['cc_name'], $vars),
                        );
                    }

                    foreach ($this->parseAddressValue($value, $vars) as $address) {
                        try {
                            $message->addCc($address->mail, $address->name);
                        } catch (Swift_RfcComplianceException $e) {
                            continue;
                        }
                    }
                    break;

                case 'from':
                    if (is_string($value) && !empty($params['from_name'])) {
                        $value = array(
                            'mail' => $twig->processString($value, $vars),
                            'name' => $twig->processString($params['from_name'], $vars),
                        );
                    }

                    foreach ($this->parseAddressValue($value, $vars) as $address) {
                        try {
                            $message->addFrom($address->mail, $address->name);
                        } catch (Swift_RfcComplianceException $e) {
                            continue;
                        }
                    }
                    break;

                case 'reply_to':
                    if (is_string($value) && !empty($params['reply_to_name'])) {
                        $value = array(
                            'mail' => $twig->processString($value, $vars),
                            'name' => $twig->processString($params['reply_to_name'], $vars),
                        );
                    }

                    foreach ($this->parseAddressValue($value, $vars) as $address) {
                        try {
                            $message->addReplyTo($address->mail, $address->name);
                        } catch (Swift_RfcComplianceException $e) {
                            continue;
                        }
                    }
                    break;

                case 'subject':
                    $message->setSubject($twig->processString($this->grav['language']->translate($value), $vars));
                    break;

                case 'to':
                    if (is_string($value) && !empty($params['to_name'])) {
                        $value = array(
                            'mail' => $twig->processString($value, $vars),
                            'name' => $twig->processString($params['to_name'], $vars),
                        );
                    }

                    foreach ($this->parseAddressValue($value, $vars) as $address) {
                        try {
                            $message->addTo($address->mail, $address->name);
                        } catch (Swift_RfcComplianceException $e) {
                            continue;
                        }
                    }
                    break;
            }
        }

        return $message;
    }

    /**
     * Return parsed e-mail address value.
     *
     * @param $value
     * @param array $vars
     * @return array
     */
    protected function parseAddressValue($value, array $vars = array())
    {
        $parsed = array();

        /** @var Twig $twig */
        $twig = $this->grav['twig'];

        // Single e-mail address string
        if (is_string($value)) {
            $parsed[] = (object) array(
                'mail' => $twig->processString($value, $vars),
                'name' => null,
            );
        }

        else {
            // Cast value as array
            $value = (array) $value;

            // Single e-mail address array
            if (!empty($value['mail'])) {
                $parsed[] = (object) array(
                    'mail' => $twig->processString($value['mail'], $vars),
                    'name' => !empty($value['name']) ? $twig->processString($value['name'], $vars) : NULL,
                );
            }

            // Multiple addresses (either as strings or arrays)
            elseif (!(empty($value['mail']) && !empty($value['name']))) {
                foreach ($value as $y => $itemx) {
                    $addresses = $this->parseAddressValue($itemx, $vars);

                    if (($address = reset($addresses))) {
                        $parsed[] = $address;
                    }
                }
            }
        }

        return $parsed;
    }
}
