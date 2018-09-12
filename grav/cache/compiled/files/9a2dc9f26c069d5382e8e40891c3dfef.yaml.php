<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/andrew.mckeever/amp.dev/grav/system/languages/ro.yaml',
    'modified' => 1536757975,
    'data' => [
        'FRONTMATTER_ERROR_PAGE' => '---
Titlu: %1$s
---
# Eroare: Frontmatter este invalid

Calea: `%2$s`

**%3$s**

```
%4$s
',
        'INFLECTOR_PLURALS' => [
            '/(quiz)$/i' => '\\1zes',
            '/^(ox)$/i' => '\\1en',
            '/([m|l])ouse$/i' => '\\1ice',
            '/(matr|vert|ind)ix|ex$/i' => '\\1ices',
            '/(x|ch|ss|sh)$/i' => '\\1es',
            '/([^aeiouy]|qu)ies$/i' => '\\1y',
            '/([^aeiouy]|qu)y$/i' => '\\1ies',
            '/(hive)$/i' => '\\1s',
            '/(?:([^f])fe|([lr])f)$/i' => '\\1\\2ves',
            '/sis$/i' => 'ses',
            '/([ti])um$/i' => '\\1a',
            '/(buffal|tomat)o$/i' => '\\1oes'
        ],
        'INFLECTOR_UNCOUNTABLE' => [
            0 => 'echipament',
            1 => 'informaţie',
            2 => 'orez',
            3 => 'bani',
            4 => 'specii',
            5 => 'serii',
            6 => 'peşte',
            7 => 'oaie'
        ],
        'INFLECTOR_IRREGULAR' => [
            'person' => 'persoane',
            'man' => 'bărbați',
            'child' => 'copii',
            'sex' => 'sexe',
            'move' => 'mutări'
        ],
        'NICETIME' => [
            'NO_DATE_PROVIDED' => 'Nu există o dată prevăzută',
            'BAD_DATE' => 'Dată incorectă',
            'AGO' => 'în urmă',
            'FROM_NOW' => 'de acum',
            'SECOND' => 'secundă',
            'MINUTE' => 'minut',
            'HOUR' => 'oră',
            'DAY' => 'zi',
            'WEEK' => 'săptămână',
            'MONTH' => 'lună',
            'YEAR' => 'an',
            'DECADE' => 'decadă',
            'SEC' => 'sec',
            'MIN' => 'min',
            'HR' => 'oră',
            'WK' => 'săpt',
            'MO' => 'lună',
            'YR' => 'an',
            'DEC' => 'decadă',
            'SECOND_PLURAL' => 'secunde',
            'MINUTE_PLURAL' => 'minute',
            'HOUR_PLURAL' => 'ore',
            'DAY_PLURAL' => 'zile',
            'WEEK_PLURAL' => 'săptămâni',
            'MONTH_PLURAL' => 'luni',
            'YEAR_PLURAL' => 'ani',
            'DECADE_PLURAL' => 'decade',
            'SEC_PLURAL' => 'sec',
            'MIN_PLURAL' => 'min',
            'HR_PLURAL' => 'ore',
            'WK_PLURAL' => 'săpt',
            'MO_PLURAL' => 'luni',
            'YR_PLURAL' => 'ani',
            'DEC_PLURAL' => 'decenii'
        ],
        'FORM' => [
            'VALIDATION_FAIL' => '<b>Validare nereușită</b>',
            'INVALID_INPUT' => 'Date incorecte în',
            'MISSING_REQUIRED_FIELD' => 'Câmp obligatoriu lipsă:'
        ],
        'MONTHS_OF_THE_YEAR' => [
            0 => 'Ianuarie',
            1 => 'Februarie',
            2 => 'Martie',
            3 => 'Aprilie',
            4 => 'Mai',
            5 => 'Iunie',
            6 => 'Iulie',
            7 => 'August',
            8 => 'Septembrie',
            9 => 'Octombrie',
            10 => 'Noiembrie',
            11 => 'Decembrie'
        ],
        'DAYS_OF_THE_WEEK' => [
            0 => 'Luni',
            1 => 'Marți',
            2 => 'Miercuri',
            3 => 'Joi',
            4 => 'Vineri',
            5 => 'Sâmbătă',
            6 => 'Duminică'
        ]
    ]
];
