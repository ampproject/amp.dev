<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://totalcar.hu/tesztek/2017/10/21/veteran_fiat-abarth_1000tc_1968/',
            'body' => array(
                '//div[@class="content-title"]',
		'//div[@class="lead-container"]/div[@class="lead"]',
		'//div[@class="cikk-torzs"]'
            ),
            'strip' => array(
		'//span[@class="gallery_title newline"]',
		'//div[@class="social-stripe cikk-bottom-box"]',
		'//div[@class="cikk-bottom-text-ad"]'
            )
        ),
    ),
);
