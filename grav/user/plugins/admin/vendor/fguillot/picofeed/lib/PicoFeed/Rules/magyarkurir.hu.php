<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.magyarkurir.hu/hirek/a-vilagszerte-ismert-dicsoito-csapat-hillsong-young-free-lep-fel-budapesten',
            'body' => array(
                '//div[@class="behuzas"]'
            ),
            'strip' => array(
                '//div[@class="ikonsav"]',
                '//p[@class="copyright"]',
                '//div[@class="cimkek"]',
                '//div[@id="footerbanner"]',
                '//div[@class="rovat sargabg rovatdobozcim"]',
                '//div[@class="rovatdoboz"]',
                '//a[contains(., "Own")]',
		'//a[@class="fblink"]'
            )
        ),
    ),
);
