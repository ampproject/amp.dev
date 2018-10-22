<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://444.hu/2017/10/20/tulszamlazo-helyen-utottek-rajta-budapest-belvarosaban',
            'body' => array(
                '//div[@id="headline"]/h1',
		'//article'
            ),
            'strip' => array(
		'//article/footer',
		'//article/div[@class="jeti-roadblock ad"]',
		'//figcaption',
		'//noscript',
		'//ul[@class="widget-stream-items"]'
            )
        ),
    ),
);
