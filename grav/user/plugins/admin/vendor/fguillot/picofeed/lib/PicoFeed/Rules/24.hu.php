<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://24.hu/belfold/2017/10/20/millios-lehuzasok-miatt-razziaztak-egy-budapesti-barban-videoval/',
            'body' => array(
		'//div[@class="post-title-wrapper"]/h1',
		'//div[@class="post-header-wrapper has-img"]/img',
		'//div[@class="post-body"]'
		
            ),
            'strip' => array(
            )
        ),
    ),
);
