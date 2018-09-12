<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/andrew.mckeever/amp.dev/grav/user/themes/amp-dev/blueprints.yaml',
    'modified' => 1536656623,
    'data' => [
        'name' => 'amp.dev',
        'version' => '0.1.0',
        'description' => 'The theme powering the succesor of ampproject.org: the all-new amp.dev',
        'icon' => 'flash',
        'author' => [
            'name' => 'Jung von Matt/next Alster GmbH',
            'email' => 'next-technik-kontakt@jvm.de'
        ],
        'homepage' => 'https://github.com/jungvonmatt/amp.dev',
        'demo' => 'http://ampproject.org',
        'keywords' => 'amphtml, ampproject, accelerated, mobile, pages, amp',
        'bugs' => 'https://github.com/jungvonmatt/amp.dev/issues',
        'readme' => 'https://github.com/jungvonmatt/amp.dev/blob/develop/README.md',
        'license' => 'MIT',
        'form' => [
            'validation' => 'loose',
            'fields' => [
                'dropdown.enabled' => [
                    'type' => 'toggle',
                    'label' => 'Dropdown in Menu',
                    'highlight' => 1,
                    'default' => 1,
                    'options' => [
                        1 => 'PLUGIN_ADMIN.ENABLED',
                        0 => 'PLUGIN_ADMIN.DISABLED'
                    ],
                    'validate' => [
                        'type' => 'bool'
                    ]
                ]
            ]
        ]
    ]
];
