<?php
namespace Grav\Plugin\Email;

use Grav\Common\Config\Config;
use Grav\Common\Grav;
use \Monolog\Logger;
use \Monolog\Handler\StreamHandler;

class Email
{
    /**
     * @var \Swift_Transport
     */
    protected $mailer;

    /**
     * @var \Swift_Plugins_LoggerPlugin
     */
    protected $logger;

    /**
     * Returns true if emails have been enabled in the system.
     *
     * @return bool
     */
    public function enabled()
    {
        return Grav::instance()['config']->get('plugins.email.mailer.engine') != 'none';
    }

    /**
     * Returns true if debugging on emails has been enabled.
     *
     * @return bool
     */
    public function debug()
    {
        return Grav::instance()['config']->get('plugins.email.debug') == 'true';
    }

    /**
     * Creates an email message.
     *
     * @param string $subject
     * @param string $body
     * @param string $contentType
     * @param string $charset
     * @return \Swift_Message
     */
    public function message($subject = null, $body = null, $contentType = null, $charset = null)
    {
        return new \Swift_Message($subject, $body, $contentType, $charset);
    }

    /**
     * Creates an attachment.
     *
     * @param string $data
     * @param string $filename
     * @param string $contentType
     * @return \Swift_Attachment
     */
    public function attachment($data = null, $filename = null, $contentType = null)
    {
        return new \Swift_Attachment($data, $filename, $contentType);
    }

    /**
     * Creates an embedded attachment.
     *
     * @param string $data
     * @param string $filename
     * @param string $contentType
     * @return \Swift_EmbeddedFile
     */
    public function embedded($data = null, $filename = null, $contentType = null)
    {
        return new \Swift_EmbeddedFile($data, $filename, $contentType);
    }

    /**
     * Creates an image attachment.
     *
     * @param string $data
     * @param string $filename
     * @param string $contentType
     * @return \Swift_Image
     */
    public function image($data = null, $filename = null, $contentType = null)
    {
        return new \Swift_Image($data, $filename, $contentType);
    }

    /**
     * Send email.
     *
     * @param \Swift_Message $message
     * @return int
     */
    public function send($message)
    {
        $mailer = $this->getMailer();

        $result = $mailer ? $mailer->send($message) : 0;

        // Check if emails and debugging are both enabled.
        if ($mailer && $this->debug()) {

            $log = new Logger('email');
            $locator = Grav::instance()['locator'];
            $log_file = $locator->findResource('log://email.log', true, true);
            $log->pushHandler(new StreamHandler($log_file, Logger::DEBUG));

            // Append the SwiftMailer log to the log.
            $log->addDebug($this->getLogs());
        }

        return $result;
    }

    /**
     * Return debugging logs if enabled
     *
     * @return string
     */
    public function getLogs()
    {
        if ($this->debug()) {
            return $this->logger->dump();
        }
        return '';
    }

    /**
     * @internal
     * @return null|\Swift_Mailer
     */
    protected function getMailer()
    {
        if (!$this->enabled()) {
            return null;
        }

        if (!$this->mailer) {
            /** @var Config $config */
            $config = Grav::instance()['config'];
            $mailer = $config->get('plugins.email.mailer.engine');

            // Create the Transport and initialize it.
            switch ($mailer) {
                case 'smtp':
                    $transport = \Swift_SmtpTransport::newInstance();

                    $options = $config->get('plugins.email.mailer.smtp');
                    if (!empty($options['server'])) {
                        $transport->setHost($options['server']);
                    }
                    if (!empty($options['port'])) {
                        $transport->setPort($options['port']);
                    }
                    if (!empty($options['encryption']) && $options['encryption'] != 'none') {
                        $transport->setEncryption($options['encryption']);
                    }
                    if (!empty($options['user'])) {
                        $transport->setUsername($options['user']);
                    }
                    if (!empty($options['password'])) {
                        $transport->setPassword($options['password']);
                    }
                    break;
                case 'sendmail':
                default:
                    $options = $config->get('plugins.email.mailer.sendmail');
                    $bin = !empty($options['bin']) ? $options['bin'] : '/usr/sbin/sendmail';
                    $transport = \Swift_SendmailTransport::newInstance($bin);
                    break;
            }

            // Create the Mailer using your created Transport
            $this->mailer = \Swift_Mailer::newInstance($transport);

            // Register the logger if we're debugging.
            if ($this->debug()) {
                $this->logger = new \Swift_Plugins_Loggers_ArrayLogger();
                $this->mailer->registerPlugin(new \Swift_Plugins_LoggerPlugin($this->logger));
            }
        }

        return $this->mailer;
    }
}
