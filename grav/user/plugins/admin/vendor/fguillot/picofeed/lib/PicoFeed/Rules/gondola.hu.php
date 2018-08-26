<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://gondola.hu/hirek/213754-A_budapesti_fejlesztesek_kerdese_mar_nem_zsakbamacska.html',
            'body' => array(
                '//div[@id="cikk"]/div[@class="cim"]',
		'//br[1]',
                '//div[@class="alcim"]',
                '//div[@class="lead"]',
                '//div[@class="szoveg"]'
            ),
            'strip' => array(
		'//div[@class="ikonok"]',
		'//div[@class="linkekblokk"]',
		'//div[@id="billboardbanner"]',
		'//div[@class="szerzo"]',
		'//div[@class="kulcsszavak"]'
            )
        ),
    ),
);
