<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.vezess.hu/hirek/2017/10/20/audi-a7-2018-bemutato/',
            'body' => array(
		'//article[@id="news"]/h1',
                '//article[@id="news"]/h2',
                '//article[@id="news"]/p[@class="lead"]',
                '//article[@id="news"]/p[@class="main-pic responsive-img-container"]',
		'//div[@class="article-body"]'
            ),
            'strip' => array(
		'//div[@class="info-bar"]',
		'//ul[@class="breadcrumb"]',
		'//div[@class="embed-link ce_widget"]'
            )
        ),
    ),
);
