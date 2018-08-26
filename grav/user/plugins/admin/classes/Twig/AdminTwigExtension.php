<?php
namespace Grav\Plugin\Admin\Twig;

use Grav\Common\Grav;
use Grav\Common\Yaml;
use Grav\Common\Language\Language;
use Grav\Common\Page\Page;

class AdminTwigExtension extends \Twig_Extension
{
    /**
     * @var Grav
     */
    protected $grav;

    /**
     * @var Language $lang
     */
    protected $lang;

    public function __construct()
    {
        $this->grav = Grav::instance();
        $this->lang = $this->grav['user']->language;
    }

    public function getFilters()
    {
        return [
            new \Twig_SimpleFilter('tu', [$this, 'tuFilter']),
            new \Twig_SimpleFilter('toYaml', [$this, 'toYamlFilter']),
            new \Twig_SimpleFilter('fromYaml', [$this, 'fromYamlFilter']),
            new \Twig_SimpleFilter('adminNicetime', [$this, 'adminNicetimeFilter']),
        ];
    }

    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('getPageUrl', [$this, 'getPageUrl'], ['needs_context' => true]),
            new \Twig_SimpleFunction('clone', [$this, 'cloneFunc']),
        ];
    }

    public function cloneFunc($obj)
    {
        return clone $obj;
    }

    public function getPageUrl($context, Page $page)
    {
        $page_route = trim($page->rawRoute(), '/');
        $page_lang = $page->language();
        $base_url = $context['base_url'];
        $base_url_simple = $context['base_url_simple'];
        $admin_lang = Grav::instance()['session']->admin_lang ?: 'en';

        if ($page_lang && $page_lang !== $admin_lang) {
            $page_url = $base_url_simple . '/' . $page_lang . '/' . $context['admin_route'] . '/pages/' . $page_route;
        } else {
            $page_url = $base_url . '/pages/' . $page_route;
        }

        return $page_url;
    }

    public function tuFilter()
    {
        $args = func_get_args();
        $numargs = count($args);
        $lang = null;

        if (($numargs === 3 && is_array($args[1])) || ($numargs === 2 && !is_array($args[1]))) {
            $lang = array_pop($args);
        } elseif ($numargs === 2 && is_array($args[1])) {
            $subs = array_pop($args);
            $args = array_merge($args, $subs);
        }

        return $this->grav['admin']->translate($args, $lang);
    }

    public function toYamlFilter($value, $inline = null)
    {
        return Yaml::dump($value, $inline);

    }

    public function fromYamlFilter($value)
    {
        return Yaml::parse($value);
    }

    public function adminNicetimeFilter($date, $long_strings = true)
    {
        if (empty($date)) {
            return $this->grav['admin']->translate('NICETIME.NO_DATE_PROVIDED', null, true);
        }

        if ($long_strings) {
            $periods = [
                'NICETIME.SECOND',
                'NICETIME.MINUTE',
                'NICETIME.HOUR',
                'NICETIME.DAY',
                'NICETIME.WEEK',
                'NICETIME.MONTH',
                'NICETIME.YEAR',
                'NICETIME.DECADE'
            ];
        } else {
            $periods = [
                'NICETIME.SEC',
                'NICETIME.MIN',
                'NICETIME.HR',
                'NICETIME.DAY',
                'NICETIME.WK',
                'NICETIME.MO',
                'NICETIME.YR',
                'NICETIME.DEC'
            ];
        }

        $lengths = ['60', '60', '24', '7', '4.35', '12', '10'];

        $now = time();

        // check if unix timestamp
        if ((string)(int)$date === (string)$date) {
            $unix_date = $date;
        } else {
            $unix_date = strtotime($date);
        }

        // check validity of date
        if (empty($unix_date)) {
            return $this->grav['admin']->translate('NICETIME.BAD_DATE', null, true);
        }

        // is it future date or past date
        if ($now > $unix_date) {
            $difference = $now - $unix_date;
            $tense      = $this->grav['admin']->translate('NICETIME.AGO', null, true);

        } else {
            $difference = $unix_date - $now;
            $tense      = $this->grav['admin']->translate('NICETIME.FROM_NOW', null, true);
        }

        $len = count($lengths) - 1;
        for ($j = 0; $difference >= $lengths[$j] && $j < $len; $j++) {
            $difference /= $lengths[$j];
        }

        $difference = round($difference);

        if ($difference !== 1) {
            $periods[$j] .= '_PLURAL';
        }

        if ($this->grav['language']->getTranslation($this->grav['user']->language,
            $periods[$j] . '_MORE_THAN_TWO')
        ) {
            if ($difference > 2) {
                $periods[$j] .= '_MORE_THAN_TWO';
            }
        }

        $periods[$j] = $this->grav['admin']->translate($periods[$j], null, true);

        return "{$difference} {$periods[$j]} {$tense}";
    }

}
