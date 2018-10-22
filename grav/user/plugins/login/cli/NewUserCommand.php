<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Console;

use Grav\Common\Config\Config;
use Grav\Console\ConsoleCommand;
use Grav\Common\File\CompiledYamlFile;
use Grav\Common\User\User;
use Grav\Common\Grav;
use Grav\Plugin\Login\Login;
use RocketTheme\Toolbox\ResourceLocator\UniformResourceLocator;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Helper\Helper;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;

/**
 * Class CleanCommand
 *
 * @package Grav\Console\Cli
 */
class NewUserCommand extends ConsoleCommand
{
    /** @var array */
    protected $options = [];

    /** @var Login */
    protected $login;

    /**
     * Configure the command
     */
    protected function configure()
    {
        $this
            ->setName('new-user')
            ->setAliases(['add-user', 'newuser'])
            ->addOption(
                'user',
                'u',
                InputOption::VALUE_REQUIRED,
                'The username'
            )
            ->addOption(
                'password',
                'p',
                InputOption::VALUE_REQUIRED,
                "The password. Note that this option is not recommended because the password will be visible by users listing the processes. You should also make sure the password respects Grav's password policy."
            )
            ->addOption(
                'email',
                'e',
                InputOption::VALUE_REQUIRED,
                'The user email'
            )
            ->addOption(
                'permissions',
                'P',
                InputOption::VALUE_REQUIRED,
                'The user permissions. It can be either `a` for Admin access only, `s` for Site access only and `b` for both Admin and Site access.'
            )
            ->addOption(
                'fullname',
                'N',
                InputOption::VALUE_REQUIRED,
                'The user full name.'
            )
            ->addOption(
                'title',
                't',
                InputOption::VALUE_REQUIRED,
                'The title of the user. Usually used as a subtext. Example: Admin, Collaborator, Developer'
            )
            ->addOption(
                'state',
                's',
                InputOption::VALUE_REQUIRED,
                'The state of the account. Can be either `enabled` or `disabled`. [default: "enabled"]'
            )
            ->setDescription('Creates a new user')
            ->setHelp('The <info>new-user</info> creates a new user file in user/accounts/ folder')
        ;
    }

    /**
     * @return int|null|void
     */
    protected function serve()
    {
        include __DIR__ . '/../vendor/autoload.php';

        $grav = Grav::instance();
        if (!isset($grav['login'])) {
            $grav['login'] = new Login($grav);
        }
        $this->login = $grav['login'];

        $this->options = [
            'user'        => $this->input->getOption('user'),
            'password1'   => $this->input->getOption('password'),
            'email'       => $this->input->getOption('email'),
            'permissions' => $this->input->getOption('permissions'),
            'fullname'    => $this->input->getOption('fullname'),
            'title'       => $this->input->getOption('title'),
            'state'       => $this->input->getOption('state')
        ];

        $this->validateOptions();

        $helper = $this->getHelper('question');
        $data   = [];

        $this->output->writeln('<green>Creating new user</green>');
        $this->output->writeln('');

        if (!$this->options['user']) {
            // Get username and validate
            $question = new Question('Enter a <yellow>username</yellow>: ', 'admin');
            $question->setValidator(function ($value) {
                $this->validate('user', $value);

                if (User::find($value, ['username'])->exists()) {
                    throw new \RuntimeException('Username "' . $value . '" already exists, please pick another username');
                };

                return $value;
            });

            $username = $helper->ask($this->input, $this->output, $question);
        } else {
            $username = $this->options['user'];
        }


        if (!$this->options['password1']) {
            // Get password and validate
            $password = $this->askForPassword($helper, 'Enter a <yellow>password</yellow>: ', function ($password1) use ($helper) {
                $this->validate('password1', $password1);

                // Since input is hidden when prompting for passwords, the user is asked to repeat the password
                return $this->askForPassword($helper, 'Repeat the <yellow>password</yellow>: ', function ($password2) use ($password1) {
                    return $this->validate('password2', $password2, $password1);
                });
            });

            $data['password'] = $password;
        } else {
            $data['password'] = $this->options['password1'];
        }

        if (!$this->options['email']) {
            // Get email and validate
            $question = new Question('Enter an <yellow>email</yellow>:   ');
            $question->setValidator(function ($value) {
                return $this->validate('email', $value);
            });

            $data['email'] = $helper->ask($this->input, $this->output, $question);
        } else {
            $data['email'] = $this->options['email'];
        }

        if (!$this->options['permissions']) {
            // Choose permissions
            $question = new ChoiceQuestion(
                'Please choose a set of <yellow>permissions</yellow>:',
                array('a' => 'Admin Access', 's' => 'Site Access', 'b' => 'Admin and Site Access'),
                'a'
            );

            $question->setErrorMessage('Permissions %s is invalid.');
            $permissions_choice = $helper->ask($this->input, $this->output, $question);
        } else {
            $permissions_choice = $this->options['permissions'];
        }

        switch ($permissions_choice) {
            case 'a':
                $data['access']['admin'] = ['login' => true, 'super' => true];
                break;
            case 's':
                $data['access']['site'] = ['login' => true];
                break;
            case 'b':
                $data['access']['admin'] = ['login' => true, 'super' => true];
                $data['access']['site']  = ['login' => true];
        }

        if (!$this->options['fullname']) {
            // Get fullname
            $question = new Question('Enter a <yellow>fullname</yellow>: ');
            $question->setValidator(function ($value) {
                return $this->validate('fullname', $value);
            });

            $data['fullname'] = $helper->ask($this->input, $this->output, $question);
        } else {
            $data['fullname'] = $this->options['fullname'];
        }


        if (!$this->options['title'] && !count(array_filter($this->options))) {
            // Get title
            $question      = new Question('Enter a <yellow>title</yellow>:    ');
            $data['title'] = $helper->ask($this->input, $this->output, $question);
        } else {
            $data['title'] = $this->options['title'];
        }

        if (!$this->options['state'] && !count(array_filter($this->options))) {
            // Choose State
            $question = new ChoiceQuestion(
                'Please choose the <yellow>state</yellow> for the account:',
                array('enabled' => 'Enabled', 'disabled' => 'Disabled'),
                'enabled'
            );

            $question->setErrorMessage('State %s is invalid.');
            $data['state'] = $helper->ask($this->input, $this->output, $question);
        } else {
            $data['state'] = $this->options['state'] ?: 'enabled';
        }

        // Lowercase the username for the filename
        $username = strtolower($username);

        /** @var UniformResourceLocator $locator */
        $locator = Grav::instance()['locator'];

        // Create user object and save it
        $user = new User($data);
        $file = CompiledYamlFile::instance($locator->findResource('account://' . $username . YAML_EXT, true, true));
        $user->file($file);
        $user->save();

        $this->output->writeln('');
        $this->output->writeln('<green>Success!</green> User <cyan>' . $username . '</cyan> created.');
    }

    /**
     *
     */
    protected function validateOptions()
    {
        foreach (array_filter($this->options) as $type => $value) {
            $this->validate($type, $value);
        }
    }

    /**
     * @param string $type
     * @param mixed  $value
     * @param string $extra
     *
     * @return string
     */
    protected function validate($type, $value, $extra = '')
    {
        return $this->login->validateField($type, $value, $extra);
    }

    /**
     * Get password and validate.
     *
     * @param Helper   $helper
     * @param string   $question
     * @param callable $validator
     *
     * @return string
     */
    protected function askForPassword(Helper $helper, $question, callable $validator)
    {
        $question = new Question($question);
        $question->setValidator($validator);
        $question->setHidden(true);
        $question->setHiddenFallback(true);
        return $helper->ask($this->input, $this->output, $question);
    }
}