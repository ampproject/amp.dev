<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://888.hu/article-a-budapesti-szocik-nem-szeretik-a-videki-szocikat',
            'body' => array(
		'//div[@id="cikkholder"]/h1',
		'//div[@class="maincontent8"]'
            ),
            'strip' => array(
		'//div[@class="AdW"]',
		'//h1[@class="olvastadmar"]'
            )
        ),
    ),
);
