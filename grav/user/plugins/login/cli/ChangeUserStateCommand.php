<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2017 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Console;

use Grav\Common\Config\Config;
use Grav\Common\Grav;
use Grav\Console\ConsoleCommand;
use Grav\Common\File\CompiledYamlFile;
use Grav\Common\User\User;
use Grav\Plugin\Login\Login;
use RocketTheme\Toolbox\ResourceLocator\UniformResourceLocator;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Question\ChoiceQuestion;
use Symfony\Component\Console\Question\Question;

/**
 * Class CleanCommand
 *
 * @package Grav\Console\Cli
 */
class ChangeUserStateCommand extends ConsoleCommand
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
            ->setName('toggle-user')
            ->setAliases(['disableuser', 'enableuser', 'toggleuser', 'change-user-state'])
            ->addOption(
                'user',
                'u',
                InputOption::VALUE_REQUIRED,
                'The username'
            )
            ->addOption(
                'state',
                's',
                InputOption::VALUE_REQUIRED,
                'The state of the account. Can be either `enabled` or `disabled`. [default: "enabled"]'
            )
            ->setDescription('Changes whether user can login or not')
            ->setHelp('The <info>toggle-user</info> sets a user\'s login status to enabled or disabled.')
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
            'state'       => $this->input->getOption('state')
        ];

        $this->validateOptions();

        $helper = $this->getHelper('question');
        $data   = [];

        $this->output->writeln('<green>Setting User State</green>');
        $this->output->writeln('');

        if (!$this->options['user']) {
            // Get username and validate
            $question = new Question('Enter a <yellow>username</yellow>: ');
            $question->setValidator(function ($value) {
                $this->validate('user', $value);

                if (!User::find($value, ['username'])->exists()) {
                    throw new \RuntimeException('Username "' . $value . '" does not exist, please pick another username');
                };

                return $value;
            });

            $username = $helper->ask($this->input, $this->output, $question);
        } else {
            $username = $this->options['user'];
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

        // Grab the account file and read in the information before setting the file (prevent setting erase)
        $oldUserFile = CompiledYamlFile::instance($locator->findResource('account://' . $username . YAML_EXT, true, true));
        $oldData = (array)$oldUserFile->content();
        
        //Set the state feild to new state
        $oldData['state'] = $data['state'];
        
        // Create user object and save it using oldData (with updated state)
        $user = new User($oldData);
        $file = CompiledYamlFile::instance($locator->findResource('account://' . $username . YAML_EXT, true, true));
        $user->file($file);
        $user->save();

        $this->output->writeln('');
        $this->output->writeln('<green>Success!</green> User <cyan>' . $username . '</cyan> state set to .' . $data['state']);
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
    protected function validate($type, $value)
    {
        return $this->login->validateField($type, $value);
    }
}
