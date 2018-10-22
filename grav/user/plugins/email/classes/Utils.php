<?php

namespace Grav\Plugin\Email;

use Grav\Common\Grav;

/**
 * Class Utils
 * @package Grav\Plugin\Email
 */
class Utils
{
    /**
     * Quick utility method to send an HTML email.
     *
     * @param        $subject
     * @param string $content
     * @param string $to
     * @param null $from
     * @param string $mimetype
     *
     * @return bool True if the action was performed.
     */
    public static function sendEmail($subject, $content, $to, $from = null, $mimetype = 'text/html')
    {
        $grav = Grav::instance();

        if (!$from) {
            $from = $grav['config']->get('plugins.email.from');
        }

        if (!isset($grav['Email']) || empty($from)) {
            throw new \RuntimeException($grav['language']->translate('PLUGIN_EMAIL.PLEASE_CONFIGURE_A_FROM_ADDRESS'));
        }

        if (empty($to) || empty($subject) || empty($content)) {
            return false;
        }

        //Initialize twig if not yet initialized
        $grav['twig']->init();

        $body = $grav['twig']->processTemplate('email/base.html.twig', ['content' => $content]);

        $message = $grav['Email']->message($subject, $body, $mimetype)
            ->setFrom($from)
            ->setTo($to);

        $sent = $grav['Email']->send($message);

        if ($sent < 1) {
            return false;
        } else {
            return true;
        }
    }
}
