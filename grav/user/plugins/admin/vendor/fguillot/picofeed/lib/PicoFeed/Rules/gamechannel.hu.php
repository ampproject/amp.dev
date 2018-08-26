<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.gamechannel.hu/cikk/hirblock/a-legacy-of-kain-feltamasztasara-keszul-a-crystal-dynamics',
            'body' => array(
		'//div[@class="post"]/div[@class="entry"]'
            ),
            'strip' => array(
		'//div[@class="valaszto"]',
		'//center/blockquote' // as we can't grab iframe here
            )
        ),
    ),
);
