<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://www.theregister.co.uk/2017/10/21/purism_cleanses_laptops_of_intel_management_engine/',
            'body' => array(
		'//div[@id="article"]',
            ),
            'strip' => array(
                '//div[@class="byline_and_share"]',
		'//div[@class="social_btns alt_colour dcl"]',
		'//div[@class="promo_article"]',
		'//div[@id="article_body_btm"]',
		'//p[@class="wptl btm"]'
            )
        ),
    ),
);
