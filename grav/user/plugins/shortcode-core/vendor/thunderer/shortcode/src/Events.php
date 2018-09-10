<?php
namespace Thunder\Shortcode;

/**
 * @author Tomasz Kowalczyk <tomasz@kowalczyk.cc>
 */
final class Events
{
    const FILTER_SHORTCODES = 'event.filter-shortcodes';
    const REPLACE_SHORTCODES = 'event.replace-shortcodes';

    public static function getEvents()
    {
        return array(static::FILTER_SHORTCODES, static::REPLACE_SHORTCODES);
    }
}
