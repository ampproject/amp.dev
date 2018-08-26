<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://travelo.hu/csaladbarat/2017/10/20/mar_csak_egy_het_es_kezdodik_az_oszi_szunet/',
            'body' => array(
		'//div[@id="content"]/h1',
		'//div[@id="kopf"]',
		'//div[@id="szoveg"]'
            ),
            'strip' => array(
		'//div[@class="goAdverticum"]',
		'//h1[@class="border"]'
            )
        ),
    ),
);
