<?php
// This is global bootstrap for autoloading

use Codeception\Util\Fixtures;
use Faker\Factory;

ini_set('error_log', __DIR__ . '/error.log');

$fake = Factory::create();
Fixtures::add('fake', $fake);

