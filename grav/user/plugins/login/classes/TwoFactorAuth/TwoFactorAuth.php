<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2018 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login\TwoFactorAuth;

use Grav\Common\Grav;
use RobThree\Auth\TwoFactorAuth as Auth;
use RobThree\Auth\TwoFactorAuthException;

/**
 * Class TwoFactorAuth
 * @package Grav\Plugin\Login\RememberMe
 */
class TwoFactorAuth
{
    protected $twoFa;

    /**
     * TwoFactorAuth constructor.
     * @throws TwoFactorAuthException
     */
    public function __construct()
    {
        $this->twoFa = new Auth('Grav', 6, 30, 'sha1', new BaconQrProvider);
    }

    /**
     * @return Auth
     */
    public function get2FA()
    {
        return $this->twoFa;
    }

    /**
     * @param int $bits
     * @return string
     * @throws TwoFactorAuthException
     */
    public function createSecret($bits = 160)
    {
        return $this->twoFa->createSecret($bits);
    }

    /**
     * @param string $secret
     * @param string $code
     * @return bool
     */
    public function verifyCode($secret, $code)
    {
        $secret = str_replace(' ', '', $secret);

        return $this->twoFa->verifyCode($secret, $code);
    }

    /**
     * @param string $username
     * @param string $secret
     * @return string
     * @throws TwoFactorAuthException
     */
    public function getQrImageData($username, $secret)
    {
        $label = $username . ':' . Grav::instance()['config']->get('site.title');
        $secret = str_replace(' ', '', $secret);

        return $this->twoFa->getQRCodeImageAsDataUri($label, $secret);
    }
}
