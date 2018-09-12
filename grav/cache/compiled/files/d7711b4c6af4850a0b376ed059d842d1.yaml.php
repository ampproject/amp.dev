<?php
return [
    '@class' => 'Grav\\Common\\File\\CompiledYamlFile',
    'filename' => '/Users/andrew.mckeever/amp.dev/grav/system/languages/hu.yaml',
    'modified' => 1536757975,
    'data' => [
        'FRONTMATTER_ERROR_PAGE' => '---
cím: %1$s
---

# Hiba: Érvénytelen Frontmatter

Elérési út: `%2$s`

**%3$s**

```
%4$s
```
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
            '/(buffal|tomat)o$/i' => '\\1oes',
            '/(bu)s$/i' => '\\1ses',
            '/(alias|status)/i' => '\\1es',
            '/(octop|vir)us$/i' => '\\1i',
            '/(ax|test)is$/i' => '\\1es',
            '/s$/i' => 's',
            '/$/' => 's'
        ],
        'INFLECTOR_SINGULAR' => [
            '/(quiz)zes$/i' => '\\1',
            '/(matr)ices$/i' => '\\1ix',
            '/(vert|ind)ices$/i' => '\\1ex',
            '/^(ox)en/i' => '\\1',
            '/(alias|status)es$/i' => '\\1',
            '/([octop|vir])i$/i' => '\\1us',
            '/(cris|ax|test)es$/i' => '\\1is',
            '/(shoe)s$/i' => '\\1',
            '/(o)es$/i' => '\\1',
            '/(bus)es$/i' => '\\1',
            '/([m|l])ice$/i' => '\\1ouse',
            '/(x|ch|ss|sh)es$/i' => '\\1',
            '/(m)ovies$/i' => '\\1ovie',
            '/(s)eries$/i' => '\\1eries',
            '/([^aeiouy]|qu)ies$/i' => '\\1y',
            '/([lr])ves$/i' => '\\1f',
            '/(tive)s$/i' => '\\1',
            '/(hive)s$/i' => '\\1',
            '/([^f])ves$/i' => '\\1fe',
            '/(^analy)ses$/i' => '\\1sis',
            '/((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$/i' => '\\1\\2sis',
            '/([ti])a$/i' => '\\1um',
            '/(n)ews$/i' => '\\1ews'
        ],
        'INFLECTOR_UNCOUNTABLE' => [
            0 => 'felszerelés',
            1 => 'információ',
            2 => 'rizs',
            3 => 'pénz',
            4 => 'fajok',
            5 => 'sorozat',
            6 => 'hal',
            7 => 'juh'
        ],
        'INFLECTOR_IRREGULAR' => [
            'person' => 'személyek',
            'man' => 'férfiak',
            'child' => 'gyerekek',
            'sex' => 'nemek',
            'move' => 'lépések'
        ],
        'INFLECTOR_ORDINALS' => [
            'default' => '.',
            'first' => '.',
            'second' => '.',
            'third' => '.'
        ],
        'NICETIME' => [
            'NO_DATE_PROVIDED' => 'Nincs dátum megadva',
            'BAD_DATE' => 'Hibás dátum',
            'AGO' => 'elteltével',
            'FROM_NOW' => 'mostantól',
            'SECOND' => 'másodperc',
            'MINUTE' => 'perc',
            'HOUR' => 'óra',
            'DAY' => 'nap',
            'WEEK' => 'hét',
            'MONTH' => 'hónap',
            'YEAR' => 'év',
            'DECADE' => 'évtized',
            'SEC' => 'mp',
            'MIN' => 'p',
            'HR' => 'ó',
            'WK' => 'hét',
            'MO' => 'hó',
            'YR' => 'év',
            'DEC' => 'évt',
            'SECOND_PLURAL' => 'másodperc',
            'MINUTE_PLURAL' => 'perc',
            'HOUR_PLURAL' => 'óra',
            'DAY_PLURAL' => 'nap',
            'WEEK_PLURAL' => 'hét',
            'MONTH_PLURAL' => 'hónap',
            'YEAR_PLURAL' => 'év',
            'DECADE_PLURAL' => 'évtized',
            'SEC_PLURAL' => 'mp',
            'MIN_PLURAL' => 'perc',
            'HR_PLURAL' => 'ó',
            'WK_PLURAL' => 'hét',
            'MO_PLURAL' => 'hó',
            'YR_PLURAL' => 'év',
            'DEC_PLURAL' => 'évt'
        ],
        'FORM' => [
            'VALIDATION_FAIL' => '<b>A validáció hibát talált:</b>',
            'INVALID_INPUT' => 'Az itt megadott érték érvénytelen:',
            'MISSING_REQUIRED_FIELD' => 'Ez a kötelező mező nincs kitöltve:'
        ],
        'MONTHS_OF_THE_YEAR' => [
            0 => 'január',
            1 => 'február',
            2 => 'március',
            3 => 'április',
            4 => 'május',
            5 => 'június',
            6 => 'július',
            7 => 'augusztus',
            8 => 'szeptember',
            9 => 'október',
            10 => 'november',
            11 => 'december'
        ],
        'DAYS_OF_THE_WEEK' => [
            0 => 'hétfő',
            1 => 'kedd',
            2 => 'szerda',
            3 => 'csütörtök',
            4 => 'péntek',
            5 => 'szombat',
            6 => 'vasárnap'
        ]
    ]
];
