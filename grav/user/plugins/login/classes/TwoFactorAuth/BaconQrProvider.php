<?php
/**
 * @package    Grav\Plugin\Login
 *
 * @copyright  Copyright (C) 2014 - 2018 RocketTheme, LLC. All rights reserved.
 * @license    MIT License; see LICENSE file for details.
 */
namespace Grav\Plugin\Login\TwoFactorAuth;

use BaconQrCode\Renderer\Image\Png as BaconPng;
use BaconQrCode\Writer as BaconWriter;
use RobThree\Auth\Providers\Qr\IQRCodeProvider;

class BaconQrProvider implements IQRCodeProvider
{
    public function getMimeType()
    {
        return 'image/png';
    }

    public function getQRCodeImage($qrtext, $size = 256)
    {
        $renderer = new BaconPng();
        $renderer->setHeight($size);
        $renderer->setWidth($size);
        $writer = new BaconWriter($renderer);

        return $writer->writeString($qrtext);
    }
}
