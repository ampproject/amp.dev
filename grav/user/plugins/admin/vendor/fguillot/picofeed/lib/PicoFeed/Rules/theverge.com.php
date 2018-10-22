<?php
return array(
    'grabber' => array(
        '%.*%' => array(
            'test_url' => 'https://www.theverge.com/2017/10/20/16512178/alphabet-project-loon-puerto-rico-lte-balloons-disaster-relief-connectivity',
            'body' => array(
		'//div[@class="c-entry-hero__header-wrap"]',
		'//span[@class="e-image__inner"]',
		'//div[@class="c-entry-content"]',
            ),
            'strip' => array(
                '//div[@class="c-entry-hero__meta"]',
            )
        ),
    ),
);
