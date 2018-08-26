<?php
namespace Grav\Plugin\Admin;

use Grav\Common\Config\Config;
use Grav\Common\Grav;
use Grav\Common\Page\Page;

/**
 * Class Popularity
 * @package Grav\Plugin
 */
class Popularity
{
    /** @var Config */
    protected $config;
    protected $data_path;

    protected $daily_file;
    protected $monthly_file;
    protected $totals_file;
    protected $visitors_file;

    protected $daily_data;
    protected $monthly_data;
    protected $totals_data;
    protected $visitors_data;

    const DAILY_FORMAT = 'd-m-Y';
    const MONTHLY_FORMAT = 'm-Y';
    const DAILY_FILE = 'daily.json';
    const MONTHLY_FILE = 'monthly.json';
    const TOTALS_FILE = 'totals.json';
    const VISITORS_FILE = 'visitors.json';

    public function __construct()
    {
        $this->config = Grav::instance()['config'];

        $this->data_path     = Grav::instance()['locator']->findResource('log://popularity', true, true);
        $this->daily_file    = $this->data_path . '/' . self::DAILY_FILE;
        $this->monthly_file  = $this->data_path . '/' . self::MONTHLY_FILE;
        $this->totals_file   = $this->data_path . '/' . self::TOTALS_FILE;
        $this->visitors_file = $this->data_path . '/' . self::VISITORS_FILE;

    }

    public function trackHit()
    {
        // Don't track bot or crawler requests
        if (!Grav::instance()['browser']->isHuman()) {
            return;
        }

        /** @var Page $page */
        $page         = Grav::instance()['page'];
        $relative_url = str_replace(Grav::instance()['base_url_relative'], '', $page->url());

        // Don't track error pages or pages that have no route
        if ($page->template() === 'error' || !$page->route()) {
            return;
        }

        // Make sure no 'widcard-style' ignore matches this url
        foreach ((array)$this->config->get('plugins.admin.popularity.ignore') as $ignore) {
            if (fnmatch($ignore, $relative_url)) {
                return;
            }
        }

        // initial creation if it doesn't exist
        if (!file_exists($this->data_path)) {
            mkdir($this->data_path);
            $this->flushPopularity();
        }

        // Update the data we want to track
        $this->updateDaily();
        $this->updateMonthly();
        $this->updateTotals($page->route());
        $this->updateVisitors(Grav::instance()['uri']->ip());

    }

    protected function updateDaily()
    {

        if (!$this->daily_data) {
            $this->daily_data = $this->getData($this->daily_file);
        }

        $day_month_year = date(self::DAILY_FORMAT);

        // get the daily access count
        if (array_key_exists($day_month_year, $this->daily_data)) {
            $this->daily_data[$day_month_year] = (int)$this->daily_data[$day_month_year] + 1;
        } else {
            $this->daily_data[$day_month_year] = 1;
        }

        // keep correct number as set by history
        $count = (int)$this->config->get('plugins.admin.popularity.history.daily', 30);
        $total = count($this->daily_data);

        if ($total > $count) {
            $this->daily_data = array_slice($this->daily_data, -$count, $count, true);
        }

        file_put_contents($this->daily_file, json_encode($this->daily_data));
    }

    /**
     * @return array
     */
    public function getDailyChartData()
    {
        if (!$this->daily_data) {
            $this->daily_data = $this->getData($this->daily_file);
        }

        $limit      = (int)$this->config->get('plugins.admin.popularity.dashboard.days_of_stats', 7);
        $chart_data = array_slice($this->daily_data, -$limit, $limit);

        $labels = [];
        $data   = [];

        foreach ($chart_data as $date => $count) {
            $labels[] = Grav::instance()['grav']['admin']->translate([
                'PLUGIN_ADMIN.' . strtoupper(date('D', strtotime($date)))]) .
                '<br>' . date('M d', strtotime($date));
            $data[]   = $count;
        }

        return ['labels' => $labels, 'data' => $data];
    }

    /**
     * @return int
     */
    public function getDailyTotal()
    {
        if (!$this->daily_data) {
            $this->daily_data = $this->getData($this->daily_file);
        }

        if (isset($this->daily_data[date(self::DAILY_FORMAT)])) {
            return $this->daily_data[date(self::DAILY_FORMAT)];
        }

        return 0;
    }

    /**
     * @return int
     */
    public function getWeeklyTotal()
    {
        if (!$this->daily_data) {
            $this->daily_data = $this->getData($this->daily_file);
        }

        $day   = 0;
        $total = 0;
        foreach (array_reverse($this->daily_data) as $daily) {
            $total += $daily;
            $day++;
            if ($day === 7) {
                break;
            }
        }

        return $total;
    }

    /**
     * @return int
     */
    public function getMonthlyTotal()
    {
        if (!$this->monthly_data) {
            $this->monthly_data = $this->getData($this->monthly_file);
        }
        if (isset($this->monthly_data[date(self::MONTHLY_FORMAT)])) {
            return $this->monthly_data[date(self::MONTHLY_FORMAT)];
        }

        return 0;
    }

    protected function updateMonthly()
    {

        if (!$this->monthly_data) {
            $this->monthly_data = $this->getData($this->monthly_file);
        }

        $month_year = date(self::MONTHLY_FORMAT);

        // get the monthly access count
        if (array_key_exists($month_year, $this->monthly_data)) {
            $this->monthly_data[$month_year] = (int)$this->monthly_data[$month_year] + 1;
        } else {
            $this->monthly_data[$month_year] = 1;
        }

        // keep correct number as set by history
        $count              = (int)$this->config->get('plugins.admin.popularity.history.monthly', 12);
        $total              = count($this->monthly_data);
        $this->monthly_data = array_slice($this->monthly_data, $total - $count, $count);


        file_put_contents($this->monthly_file, json_encode($this->monthly_data));
    }

    /**
     * @return array
     */
    protected function getMonthyChartData()
    {
        if (!$this->monthly_data) {
            $this->monthly_data = $this->getData($this->monthly_file);
        }

        $labels = [];
        $data   = [];

        foreach ($this->monthly_data as $date => $count) {
            $labels[] = date('M', strtotime($date));
            $data[]   = $count;
        }

        return ['labels' => $labels, 'data' => $data];
    }

    /**
     * @param string $url
     */
    protected function updateTotals($url)
    {
        if (!$this->totals_data) {
            $this->totals_data = $this->getData($this->totals_file);
        }

        // get the totals for this url
        if (array_key_exists($url, $this->totals_data)) {
            $this->totals_data[$url] = (int)$this->totals_data[$url] + 1;
        } else {
            $this->totals_data[$url] = 1;
        }

        file_put_contents($this->totals_file, json_encode($this->totals_data));
    }

    /**
     * @param string $ip
     */
    protected function updateVisitors($ip)
    {
        if (!$this->visitors_data) {
            $this->visitors_data = $this->getData($this->visitors_file);
        }

        // update with current timestamp
        $this->visitors_data[hash('sha1', $ip)] = time();
        $visitors                 = $this->visitors_data;
        arsort($visitors);

        $count               = (int)$this->config->get('plugins.admin.popularity.history.visitors', 20);
        $this->visitors_data = array_slice($visitors, 0, $count, true);

        file_put_contents($this->visitors_file, json_encode($this->visitors_data));
    }

    /**
     * @param string $path
     *
     * @return array
     */
    protected function getData($path)
    {
        if (file_exists($path)) {
            return (array)json_decode(file_get_contents($path), true);
        }

        return [];
    }


    public function flushPopularity()
    {
        file_put_contents($this->daily_file, []);
        file_put_contents($this->monthly_file, []);
        file_put_contents($this->totals_file, []);
        file_put_contents($this->visitors_file, []);
    }
}
