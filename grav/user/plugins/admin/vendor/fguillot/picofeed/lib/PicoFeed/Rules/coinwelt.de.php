<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://coinwelt.de/2017/08/bitcache-kreierer-kim-dotcom-bietet-arbeitsplaetze-fuer-blockchain-goetter/',
            'body' => array(
                '//div[@class="post-inner"]//div[@class="entry"]',
            ),
            'strip' => array(
                '//div[contains(@class, "shariff")]',
            ),
        ),
    ),
);
