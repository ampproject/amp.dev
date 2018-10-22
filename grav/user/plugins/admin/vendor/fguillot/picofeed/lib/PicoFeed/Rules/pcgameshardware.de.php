<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.pcgameshardware.de/Dragon-Age-Thema-259929/News/Plaene-fuer-Teil-4-und-5-der-Serie-1235682/',
            'body' => array(
                '//p[@class="introText"]',
                '//figure[contains(@class, "articleBigTeaser")]',
                '//div[@id="articleTextBody"]//p | //div[@id="articleTextBody"]//h2[@class="anchorHeadline"]',
            ),
            'strip' => array(
                '//p[@class="introText"]//time',
            )
        )
    )
);
