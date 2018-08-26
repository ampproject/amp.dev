<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://www.idokep.hu/hirek/4-es-erossegu-tajfun-tart-japan-fele',
            'body' => array(
                '//div[@class="cikk-title"]/h3',
		'//div[@class="lead"]',
		'//div[@class="atvett_tartalom"]',
		'//div[@class="cikk-tartalom"]'
            ),
            'strip' => array(
		'//div[@class="cimkes-doboz"]',
		'//div[@class="komment-wrap"]'
            )
        ),
    ),
);
