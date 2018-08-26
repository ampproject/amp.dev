<?php
/**
 * PHP Exif Exiftool Mapper
 *
 * @link        http://github.com/miljar/PHPExif for the canonical source repository
 * @copyright   Copyright (c) 2015 Tom Van Herreweghe <tom@theanalogguy.be>
 * @license     http://github.com/miljar/PHPExif/blob/master/LICENSE MIT License
 * @category    PHPExif
 * @package     Mapper
 */

namespace PHPExif\Mapper;

use PHPExif\Exif;
use DateTime;

/**
 * PHP Exif Exiftool Mapper
 *
 * Maps Exiftool raw data to valid data for the \PHPExif\Exif class
 *
 * @category    PHPExif
 * @package     Mapper
 */
class Exiftool implements MapperInterface
{
    const APERTURE                 = 'Composite:Aperture';
    const APPROXIMATEFOCUSDISTANCE = 'XMP-aux:ApproximateFocusDistance';
    const ARTIST                   = 'IFD0:Artist';
    const CAPTION                  = 'XMP-acdsee';
    const CAPTIONABSTRACT          = 'IPTC:Caption-Abstract';
    const COLORSPACE               = 'ExifIFD:ColorSpace';
    const COPYRIGHT                = 'IFD0:Copyright';
    const DATETIMEORIGINAL         = 'ExifIFD:DateTimeOriginal';
    const CREDIT                   = 'IPTC:Credit';
    const EXPOSURETIME             = 'ExifIFD:ExposureTime';
    const FILESIZE                 = 'System:FileSize';
    const FOCALLENGTH              = 'ExifIFD:FocalLength';
    const HEADLINE                 = 'IPTC:Headline';
    const IMAGEHEIGHT              = 'File:ImageHeight';
    const IMAGEWIDTH               = 'File:ImageWidth';
    const ISO                      = 'ExifIFD:ISO';
    const JOBTITLE                 = 'IPTC:By-lineTitle';
    const KEYWORDS                 = 'IPTC:Keywords';
    const MIMETYPE                 = 'File:MIMEType';
    const MODEL                    = 'IFD0:Model';
    const ORIENTATION              = 'IFD0:Orientation';
    const SOFTWARE                 = 'IFD0:Software';
    const SOURCE                   = 'IPTC:Source';
    const TITLE                    = 'IPTC:ObjectName';
    const XRESOLUTION              = 'IFD0:XResolution';
    const YRESOLUTION              = 'IFD0:YResolution';
    const GPSLATITUDE              = 'GPS:GPSLatitude';
    const GPSLONGITUDE             = 'GPS:GPSLongitude';

    /**
     * Maps the ExifTool fields to the fields of
     * the \PHPExif\Exif class
     *
     * @var array
     */
    protected $map = array(
        self::APERTURE                 => Exif::APERTURE,
        self::ARTIST                   => Exif::AUTHOR,
        self::MODEL                    => Exif::CAMERA,
        self::CAPTION                  => Exif::CAPTION,
        self::COLORSPACE               => Exif::COLORSPACE,
        self::COPYRIGHT                => Exif::COPYRIGHT,
        self::DATETIMEORIGINAL         => Exif::CREATION_DATE,
        self::CREDIT                   => Exif::CREDIT,
        self::EXPOSURETIME             => Exif::EXPOSURE,
        self::FILESIZE                 => Exif::FILESIZE,
        self::FOCALLENGTH              => Exif::FOCAL_LENGTH,
        self::APPROXIMATEFOCUSDISTANCE => Exif::FOCAL_DISTANCE,
        self::HEADLINE                 => Exif::HEADLINE,
        self::IMAGEHEIGHT              => Exif::HEIGHT,
        self::XRESOLUTION              => Exif::HORIZONTAL_RESOLUTION,
        self::ISO                      => Exif::ISO,
        self::JOBTITLE                 => Exif::JOB_TITLE,
        self::KEYWORDS                 => Exif::KEYWORDS,
        self::MIMETYPE                 => Exif::MIMETYPE,
        self::ORIENTATION              => Exif::ORIENTATION,
        self::SOFTWARE                 => Exif::SOFTWARE,
        self::SOURCE                   => Exif::SOURCE,
        self::TITLE                    => Exif::TITLE,
        self::YRESOLUTION              => Exif::VERTICAL_RESOLUTION,
        self::IMAGEWIDTH               => Exif::WIDTH,
        self::CAPTIONABSTRACT          => Exif::CAPTION,
        self::GPSLATITUDE              => Exif::GPS,
        self::GPSLONGITUDE             => Exif::GPS,
    );

    /**
     * @var bool
     */
    protected $numeric = true;

    /**
     * Mutator method for the numeric property
     *
     * @param bool $numeric
     * @return \PHPExif\Mapper\Exiftool
     */
    public function setNumeric($numeric)
    {
        $this->numeric = (bool) $numeric;

        return $this;
    }

    /**
     * Maps the array of raw source data to the correct
     * fields for the \PHPExif\Exif class
     *
     * @param array $data
     * @return array
     */
    public function mapRawData(array $data)
    {
        $mappedData = array();
        $gpsData = array();
        foreach ($data as $field => $value) {
            if (!array_key_exists($field, $this->map)) {
                // silently ignore unknown fields
                continue;
            }

            $key = $this->map[$field];

            // manipulate the value if necessary
            switch ($field) {
                case self::APERTURE:
                    $value = sprintf('f/%01.1f', $value);
                    break;
                case self::APPROXIMATEFOCUSDISTANCE:
                    $value = sprintf('%1$sm', $value);
                    break;
                case self::DATETIMEORIGINAL:
                    try {
                        $value = new DateTime($value);
                    } catch (\Exception $exception) {
                        continue 2;
                    }
                    break;
                case self::EXPOSURETIME:
                    // Based on the source code of Exiftool (PrintExposureTime subroutine):
                    // http://cpansearch.perl.org/src/EXIFTOOL/Image-ExifTool-9.90/lib/Image/ExifTool/Exif.pm
                    if ($value < 0.25001 && $value > 0) {
                        $value = sprintf('1/%d', intval(0.5 + 1 / $value));
                    } else {
                        $value = sprintf('%.1f', $value);
                        $value = preg_replace('/.0$/', '', $value);
                    }
                    break;
                case self::FOCALLENGTH:
                    if (!$this->numeric || strpos($value, ' ') !== false) {
                        $focalLengthParts = explode(' ', $value);
                        $value = reset($focalLengthParts);
                    }
                    break;
                case self::GPSLATITUDE:
                    $gpsData['lat']  = $this->extractGPSCoordinates($value);
                    break;
                case self::GPSLONGITUDE:
                    $gpsData['lon']  = $this->extractGPSCoordinates($value);
                    break;
            }

            // set end result
            $mappedData[$key] = $value;
        }

        // add GPS coordinates, if available
        if (count($gpsData) === 2 && $gpsData['lat'] !== false && $gpsData['lon'] !== false) {
            $latitudeRef = empty($data['GPS:GPSLatitudeRef'][0]) ? 'N' : $data['GPS:GPSLatitudeRef'][0];
            $longitudeRef = empty($data['GPS:GPSLongitudeRef'][0]) ? 'E' : $data['GPS:GPSLongitudeRef'][0];

            $gpsLocation = sprintf(
                '%s,%s',
                (strtoupper($latitudeRef) === 'S' ? -1 : 1) * $gpsData['lat'],
                (strtoupper($longitudeRef) === 'W' ? -1 : 1) * $gpsData['lon']
            );

            $mappedData[Exif::GPS] = $gpsLocation;
        } else {
            unset($mappedData[Exif::GPS]);
        }

        return $mappedData;
    }

    /**
     * Extract GPS coordinates from formatted string
     *
     * @param string $coordinates
     * @return array
     */
    protected function extractGPSCoordinates($coordinates)
    {
        if ($this->numeric === true) {
            return abs((float) $coordinates);
        } else {
            if (!preg_match('!^([0-9.]+) deg ([0-9.]+)\' ([0-9.]+)"!', $coordinates, $matches)) {
                return false;
            }

            return intval($matches[1]) + (intval($matches[2]) / 60) + (floatval($matches[3]) / 3600);
        }
    }
}
