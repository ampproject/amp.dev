<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.portfolio.hu/gazdasag/mennybe-vagy-pokolba-megy-ma-a-cseh-trump.265833.html',
            'body' => array(
		'//div[@id="cikk"]/h1',
                '//div[@class="smscontent"]'
            ),
            'strip' => array(
		'//div[@class="traderhirdetes ga_viewanalytics"]'
            )
        ),
    ),
);
