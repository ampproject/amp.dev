---
$title: Markdown
$view: /views/styleguide.j2
---

This page showcases the styling of all default markdown elements.

| Das | ist | eine | Tabelle | mit |
|---|---|---|---|---|
| sehr | sehr  | sehr | sehr | sehr |
| geilem | Inhalt | . | . | . |

The command line tool offers additional features including switching off
the color, printing JSON output, or running a specific version of the
validator Javascript (by default it runs the latest published script).

```yaml
grow_version: ">=0.0.66"
home: /content/amp-dev/index.html

localization:
  root_path: /{locale}/
  default_locale: en
```

```js
var test = 'das ist ein string';
const konstante = undefined;

// kommentar

function(asd, test) {
  /* kommentar */
    return {
      'key': 'val'
    }
}
```

[sourcecode:html]
<html lang="de">
  <!-- kommentar -->
  <div class="geil">Bunt</div>
</html>
[/sourcecode]

[sourcecode:console]
$ amphtml-validator --help

  Usage: index [options] <fileOrUrlOrMinus...>

  Validates the files or urls provided as arguments. If "-" is
  specified, reads from stdin instead.

  Options:

    -h, --help                  output usage information
    -V, --version               output the version number
    --validator_js <fileOrUrl>  The Validator Javascript.
      Latest published version by default, or
      dist/validator_minified.js (built with build.py)
      for development.
    --format <color|text|json>  How to format the output.
      "color" displays errors/warnings/success in
              red/orange/green.
      "text"  avoids color (e.g., useful in terminals not
              supporting color).
      "json"  emits json corresponding to the ValidationResult
              message in validator.proto.
[/sourcecode]
