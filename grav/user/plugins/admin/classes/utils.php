<?php
namespace Grav\Plugin\Admin;

use Grav\Common\Grav;
use Grav\Common\User\User;

/**
 * Admin utils class
 *
 * @license MIT
 */
class Utils
{
    /**
     * Matches an email to a user
     *
     * @param $email
     *
     * @return User
     */
    public static function findUserByEmail($email)
    {
        $account_dir = Grav::instance()['locator']->findResource('account://');
        $files       = array_diff(scandir($account_dir, SCANDIR_SORT_ASCENDING), ['.', '..']);

        foreach ($files as $file) {
            if (strpos($file, '.yaml') !== false) {
                $user = User::load(trim(substr($file, 0, -5)));
                if ($user['email'] === $email) {
                    return $user;
                }
            }
        }

        // If a User with the provided email cannot be found, then load user with that email as the username
        return User::load($email);
    }

    /**
     * Generates a slug of the given string
     *
     * @param string $str
     * @return string
     */
    public static function slug($str)
    {
        if (function_exists('transliterator_transliterate')) {
            $str = transliterator_transliterate('Any-Latin; NFD; [:Nonspacing Mark:] Remove; NFC; [:Punctuation:] Remove;', $str);
        } else {
            $str = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $str);
        }

        $str = strtolower($str);
        $str = preg_replace('/[-\s]+/', '-', $str);
        $str = preg_replace('/[^a-z0-9-]/i', '', $str);
        $str = trim($str, '-');

        return $str;
    }
}
