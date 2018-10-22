<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://hvg.hu/brandchannel/mastercardbch_20171006_Egyetlen_mobillal_erintettuk_Budapest_legjobb_gasztrohelyeit',
            'body' => array(
		'//div[@class="article-title article-title"]',
		'//div[@class="article-cover-img"]',
		'//div[@class="article-main"]'
            ),
            'strip' => array(
		'//figcaption',
		'//div[@class="article-info byline"]'
            )
        ),
    ),
);
