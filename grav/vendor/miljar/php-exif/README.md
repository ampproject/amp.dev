# [PHPExif v0.6.1](http://github.com/PHPExif/php-exif) [![Build Status](https://travis-ci.org/PHPExif/php-exif.png?branch=master)](https://travis-ci.org/PHPExif/php-exif) [![Coverage Status](https://coveralls.io/repos/PHPExif/php-exif/badge.svg?branch=master)](https://coveralls.io/r/PHPExif/php-exif?branch=master) [![Code Climate](https://codeclimate.com/github/PHPExif/php-exif/badges/gpa.svg)](https://codeclimate.com/github/PHPExif/php-exif)

PHPExif is a library which gives you easy access to the EXIF meta-data of an image.

PHPExif serves as a wrapper around some native or CLI tools which access this EXIF meta-data from an image. As such, it provides a standard API for retrieving and accessing that information.

## Supported tools

* Native PHP functionality (exif_read_data, iptcparse)
* [Exiftool](http://www.sno.phy.queensu.ca/~phil/exiftool) adapter (wrapper for the exiftool binary)

## Installation (composer)

```json
composer require miljar/php-exif
```


## Usage

[Before v0.3.0](Resources/doc/usage_0.2.1.md)

[v0.3.0+](Resources/doc/usage.md)

## Contributing

Please submit all pull requests against the correct branch. The release branch for the next version is a branch with the same name as the next version. Bugfixes should go in the master branch, unless they are for code in a new release branch.

PHPExif is written according the [PSR-0/1/2 standards](http://www.php-fig.org/). When submitting code, please make sure it is conform these standards.
We aim to have all functionality covered by unit tests. When submitting code, you are strongly encouraged to unit test your code and to keep the level of code coverage on par with the current level.

All contributions are welcomed and greatly appreciated.

## Feedback

Have a bug or a feature request? [Please open a new issue](https://github.com/Miljar/php-exif/issues). Before opening any issue, please search for existing issues.

## Contributors

* [Tom Van Herreweghe](http://github.com/Miljar)
* [Ingewikkeld](https://github.com/Ingewikkeld)
* [Christophe Singer](https://github.com/wasinger)
* [Hanov Ruslan](https://github.com/hanovruslan)
* [Julian Gutierrez](https://github.com/juliangut)
* [Marek Szymczuk](https://github.com/bonzai)
* [Scott Pringle](https://github.com/Luciam91)

## License

[MIT License](http://github.com/Miljar/php-exif/blob/master/LICENSE)
