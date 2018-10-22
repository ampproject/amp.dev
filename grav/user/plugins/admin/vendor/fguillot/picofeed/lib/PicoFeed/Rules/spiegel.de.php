<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.spiegel.de/politik/ausland/afrika-angola-geht-gegen-islam-vor-und-schliesst-moscheen-a-935788.html',
            'body' => array(
                '//div[@class="spArticleContent"]/p | //div[@class="spArticleContent"]//img[@class="spResponsiveImage "]',
            ),
            'strip' => array(
                '//div[@class="author-details"]',
            ),
        ),
    ),
);
