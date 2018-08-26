<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://index.hu/mindekozben/poszt/2017/10/20/art_deco_budapest_varosnezo_zsebkonyv_bolla_zoltan/',
            'body' => array(
		'//div[@class="mindenkozben_post_content content"]',
		'//div[@id="content"]'
            ),
            'strip' => array(
                '//div[@class="topszponzor_wrapper"]',
                '//ul[@class="cikk-cimkek"]',
		'//div[@class="author-share-date-container"]',
		'//div[@class="pp-list"]',
		'//div[@class="social-stripe cikk-bottom-box"]',
		'//div[@class="cikk-bottom-text-ad"]',
		'//a[@name="hozzaszolasok"]',
		'//div[@class="cikk-vegi-ajanlo-reklamok-container"]',
		'//div[@id="comments"]',
		'//div[@class="comments"]',
		'//div[@class="linkpreview-box bekezdes_utan"]',
		'//div[@class="lapozo"]',
		'//div[@class="szelso-jobb"]',
		'//div[@class="social cikk-bottom-box"]',
		'//input'
            )
        ),
    ),
);
