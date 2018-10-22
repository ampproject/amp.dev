<?php
/**
 * PHP Exif Native Mapper
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
use Exception;

/**
 * PHP Exif Native Mapper
 *
 * Maps native raw data to valid data for the \PHPExif\Exif class
 *
 * @category    PHPExif
 * @package     Mapper
 */
class Native implements MapperInterface
{
    const APERTUREFNUMBER  = 'ApertureFNumber';
    const ARTIST           = 'Artist';
    const CAPTION          = 'caption';
    const COLORSPACE       = 'ColorSpace';
    const COPYRIGHT        = 'copyright';
    const DATETIMEORIGINAL = 'DateTimeOriginal';
    const CREDIT           = 'credit';
    const EXPOSURETIME     = 'ExposureTime';
    const FILESIZE         = 'FileSize';
    const FOCALLENGTH      = 'FocalLength';
    const FOCUSDISTANCE    = 'FocusDistance';
    const HEADLINE         = 'headline';
    const HEIGHT           = 'Height';
    const ISOSPEEDRATINGS  = 'ISOSpeedRatings';
    const JOBTITLE         = 'jobtitle';
    const KEYWORDS         = 'keywords';
    const MIMETYPE         = 'MimeType';
    const MODEL            = 'Model';
    const ORIENTATION      = 'Orientation';
    const SOFTWARE         = 'Software';
    const SOURCE           = 'source';
    const TITLE            = 'title';
    const WIDTH            = 'Width';
    const XRESOLUTION      = 'XResolution';
    const YRESOLUTION      = 'YResolution';
    const GPSLATITUDE      = 'GPSLatitude';
    const GPSLONGITUDE     = 'GPSLongitude';

    const SECTION_FILE      = 'FILE';
    const SECTION_COMPUTED  = 'COMPUTED';
    const SECTION_IFD0      = 'IFD0';
    const SECTION_THUMBNAIL = 'THUMBNAIL';
    const SECTION_COMMENT   = 'COMMENT';
    const SECTION_EXIF      = 'EXIF';
    const SECTION_ALL       = 'ANY_TAG';
    const SECTION_IPTC      = 'IPTC';

    /**
     * A list of section names
     *
     * @var array
     */
    protected $sections = array(
        self::SECTION_FILE,
        self::SECTION_COMPUTED,
        self::SECTION_IFD0,
        self::SECTION_THUMBNAIL,
        self::SECTION_COMMENT,
        self::SECTION_EXIF,
        self::SECTION_ALL,
        self::SECTION_IPTC,
    );

    /**
     * Maps the ExifTool fields to the fields of
     * the \PHPExif\Exif class
     *
     * @var array
     */
    protected $map = array(
        self::APERTUREFNUMBER  => Exif::APERTURE,
        self::FOCUSDISTANCE    => Exif::FOCAL_DISTANCE,
        self::HEIGHT           => Exif::HEIGHT,
        self::WIDTH            => Exif::WIDTH,
        self::CAPTION          => Exif::CAPTION,
        self::COPYRIGHT        => Exif::COPYRIGHT,
        self::CREDIT           => Exif::CREDIT,
        self::HEADLINE         => Exif::HEADLINE,
        self::JOBTITLE         => Exif::JOB_TITLE,
        self::KEYWORDS         => Exif::KEYWORDS,
        self::SOURCE           => Exif::SOURCE,
        self::TITLE            => Exif::TITLE,
        self::ARTIST           => Exif::AUTHOR,
        self::MODEL            => Exif::CAMERA,
        self::COLORSPACE       => Exif::COLORSPACE,
        self::DATETIMEORIGINAL => Exif::CREATION_DATE,
        self::EXPOSURETIME     => Exif::EXPOSURE,
        self::FILESIZE         => Exif::FILESIZE,
        self::FOCALLENGTH      => Exif::FOCAL_LENGTH,
        self::ISOSPEEDRATINGS  => Exif::ISO,
        self::MIMETYPE         => Exif::MIMETYPE,
        self::ORIENTATION      => Exif::ORIENTATION,
        self::SOFTWARE         => Exif::SOFTWARE,
        self::XRESOLUTION      => Exif::HORIZONTAL_RESOLUTION,
        self::YRESOLUTION      => Exif::VERTICAL_RESOLUTION,
        self::GPSLATITUDE      => Exif::GPS,
        self::GPSLONGITUDE     => Exif::GPS,
    );

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
            if ($this->isSection($field) && is_array($value)) {
                $subData = $this->mapRawData($value);

                $mappedData = array_merge($mappedData, $subData);
                continue;
            }

            if (!$this->isFieldKnown($field)) {
                // silently ignore unknown fields
                continue;
            }

            $key = $this->map[$field];

            // manipulate the value if necessary
            switch ($field) {
                case self::DATETIMEORIGINAL:
                    try {
                        $value = new DateTime($value);
                    } catch (Exception $exception) {
                        continue 2;
                    }
                    break;
                case self::EXPOSURETIME:
                    if (!is_float($value)) {
                        $value = $this->normalizeComponent($value);
                    }

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
                    $parts = explode('/', $value);
                    // Avoid division by zero if focal length is invalid
                    if (end($parts) == '0') {
                        $value = 0;
                    } else {
                        $value = (int) reset($parts) / (int) end($parts);
                    }
                    break;
                case self::XRESOLUTION:
                case self::YRESOLUTION:
                    $resolutionParts = explode('/', $value);
                    $value = (int) reset($resolutionParts);
                    break;
                case self::GPSLATITUDE:
                    $gpsData['lat'] = $this->extractGPSCoordinate($value);
                    break;
                case self::GPSLONGITUDE:
                    $gpsData['lon'] = $this->extractGPSCoordinate($value);
                    break;
            }

            // set end result
            $mappedData[$key] = $value;
        }

        // add GPS coordinates, if available
        if (count($gpsData) === 2) {
            $latitudeRef = empty($data['GPSLatitudeRef'][0]) ? 'N' : $data['GPSLatitudeRef'][0];
            $longitudeRef = empty($data['GPSLongitudeRef'][0]) ? 'E' : $data['GPSLongitudeRef'][0];

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
     * Determines if given field is a section
     *
     * @param string $field
     * @return bool
     */
    protected function isSection($field)
    {
        return (in_array($field, $this->sections));
    }

    /**
     * Determines if the given field is known,
     * in a case insensitive way for its first letter.
     * Also update $field to keep it valid against the known fields.
     *
     * @param  string  &$field
     * @return bool
     */
    protected function isFieldKnown(&$field)
    {
        $lcfField = lcfirst($field);
        if (array_key_exists($lcfField, $this->map)) {
            $field = $lcfField;

            return true;
        }

        $ucfField = ucfirst($field);
        if (array_key_exists($ucfField, $this->map)) {
            $field = $ucfField;

            return true;
        }

        return false;
    }

    /**
     * Extract GPS coordinates from components array
     *
     * @param array|string $components
     * @return float
     */
    protected function extractGPSCoordinate($components)
    {
        if (!is_array($components)) {
            $components = array($components);
        }
        $components = array_map(array($this, 'normalizeComponent'), $components);

        if (count($components) > 2) {
            return intval($components[0]) + (intval($components[1]) / 60) + (floatval($components[2]) / 3600);
        }

        return reset($components);
    }

    /**
     * Normalize component
     *
     * @param mixed $component
     * @return int|float
     */
    protected function normalizeComponent($component)
    {
        $parts = explode('/', $component);

        if (count($parts) > 1) {
            if ($parts[1]) {
                return intval($parts[0]) / intval($parts[1]);
            }

            return 0;
        }

        return floatval(reset($parts));
    }
}
