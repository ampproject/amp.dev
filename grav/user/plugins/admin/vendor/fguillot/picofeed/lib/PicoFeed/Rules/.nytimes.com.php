<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.nytimes.com/2011/05/15/world/middleeast/15prince.html',
            'body' => array(
                '//p[contains(@class, "story-content")] | //div[@class="image"]',
            ),
        )
    )
);
