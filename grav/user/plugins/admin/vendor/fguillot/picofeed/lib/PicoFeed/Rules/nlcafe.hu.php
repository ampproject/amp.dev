<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.nlcafe.hu/ezvan/20171021/nyugdijas-drogdilert-fogtak-a-ferencvarosi-rendorok/',
            'body' => array(
                '//div[@class="single-title"]',
		'//div[@class="single-excerpt"]',
		'//div[@class="single-post-container-content"]/p',
                '//div[@class="single-post-container-content"]/div'
            ),
            'strip' => array(
		'//div[@class="widget-container related-articles bigdata-widget related-full"]',
		'//div[@class="banner-container clear-banner-row clearfix"]'
            )
        ),
    ),
);
