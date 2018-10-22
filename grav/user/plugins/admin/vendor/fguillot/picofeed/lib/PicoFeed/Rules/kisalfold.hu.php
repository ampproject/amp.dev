<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.kisalfold.hu/szorakozas/egy_15_eves_srac_szuntetheti_meg_a_wc-parat_budapesten/2536699/',
            'body' => array(
                '//header[@class="single-article__header"]/h1',
                '//header[@class="single-article__header"]/h2',
		'//figure[@class="single-article__image"]/img',
		'//div[@class="single-article__content"]/div[@id="single-article__lead"]',
		'//div[@id="article_text"]'
            ),
            'strip' => array(
            )
        ),
    ),
);
