<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.maclife.de/news/neue-farbe-iphone-8-kommt-blush-gold-10094817.html',
            'body' => array(
                '//div[contains(@class, "article_wrapper")]/p | //div[contains(@class, "article_wrapper")]/h2 | //div[@class="gallery"]//figure | //div[contains(@class, "gallery_single")]//figure',
            )
        )
    )
);
