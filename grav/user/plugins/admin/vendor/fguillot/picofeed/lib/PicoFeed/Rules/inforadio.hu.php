<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://inforadio.hu/belfold/2017/10/20/fontos_valtozas_vegleg_lezarnak_tobb_villamosatjarot_budapesten/',
            'body' => array(
		'//div[@class="content-title"]',
                '//div[@class="szelso-jobb-lead_container"]',
                '//div[@class="cikk-torzs"]'
            ),
            'strip' => array(
                '//div[@id="microsite_microsite"]',
                '//div[@class="cikk-bottom-text-ad"]',
                '//div[@class="social-stripe_container"]',
                '//div[@class="facebook-like-box"]',
                '//div[@class="rovat sargabg rovatdobozcim"]',
		'//div[@class="m-okosradio_magazin arenaMagazineItem"]',
		'//header[@class="m-okosradio_header"]',
		'//div[@class="m-okosradio_elo"]',
		'//div[@class="m-okosradio_container"]',
                '//form'
            )
        ),
    ),
);
