<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'http://www.linux-magazin.de/Ausgaben/2017/09/AWS-Alternativen',
            'body' => array(
                '//div[@class="attribute-content"]/div[@class="attribute-intro"]',
                '(//div[@class="attribute-image"])[1]',
                '//div[@itemprop="articleBody"]',
            ),
            'strip' => array(
                '//p[@class="attribute-advice"]',
            )
        )
    )
);
