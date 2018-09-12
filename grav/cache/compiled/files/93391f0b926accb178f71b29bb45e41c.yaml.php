<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => 'plugins://login/login.yaml',
    'modified' => 1536656622,
    'data' => [
        'enabled' => true,
        'built_in_css' => true,
        'route' => NULL,
        'redirect_to_login' => true,
        'redirect_after_login' => NULL,
        'redirect_after_logout' => '/',
        'route_activate' => '/activate_user',
        'route_forgot' => '/forgot_password',
        'route_reset' => '/reset_password',
        'route_profile' => '/user_profile',
        'route_register' => '/user_register',
        'route_unauthorized' => '/user_unauthorized',
        'dynamic_page_visibility' => false,
        'parent_acl' => false,
        'protect_protected_page_media' => false,
        'rememberme' => [
            'enabled' => true,
            'timeout' => 604800,
            'name' => 'grav-rememberme'
        ],
        'max_pw_resets_count' => 0,
        'max_pw_resets_interval' => 60,
        'max_login_count' => 0,
        'max_login_interval' => 2,
        'user_registration' => [
            'enabled' => false,
            'fields' => [
                0 => 'username',
                1 => 'password',
                2 => 'email',
                3 => 'fullname',
                4 => 'title',
                5 => 'level'
            ],
            'default_values' => [
                'level' => 'Newbie'
            ],
            'access' => [
                'site' => [
                    'login' => 'true'
                ]
            ],
            'redirect_after_registration' => '',
            'options' => [
                'validate_password1_and_password2' => true,
                'set_user_disabled' => false,
                'login_after_registration' => false,
                'send_activation_email' => false,
                'send_notification_email' => false,
                'send_welcome_email' => false
            ]
        ]
    ]
];
