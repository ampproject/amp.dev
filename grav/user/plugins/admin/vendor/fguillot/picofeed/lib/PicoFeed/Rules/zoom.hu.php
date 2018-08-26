<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://zoom.hu/2017/10/20/mar-nem-nyomoznak-a-vegrehajtok-botranyai-miatt',
            'body' => array(
                '//div[@class="title-wrapper"]/h1',
		'//div[@class="entry-excerpt"]',
		'//div[@class="thumbnail-wrapper"]',
		'//div[@id="entry-content-id"]'
            ),
            'strip' => array(
		'//div[@class="place first normal"]'
            )
        ),
    ),
);
