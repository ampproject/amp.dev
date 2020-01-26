const FORMAT_WEBSITES = 'websites';
const SUPPORTED_FORMATS = [FORMAT_WEBSITES, 'stories', 'ads', 'email'];
const DEFAULT_FORMAT = SUPPORTED_FORMATS[0];

/**
 * Extracts the active format from the format query parameter.
 * Returns 'websites' as default if no format is given.
 *
 * @param  {expressjs.Request} request
 * @return {String} the format
 */
function getFormatFromRequest(req) {
  let formatString = req.query.format;
  if (!formatString) {
    return DEFAULT_FORMAT;
  }
  formatString = formatString.toLowerCase();
  if (!SUPPORTED_FORMATS.includes(formatString)) {
    return DEFAULT_FORMAT;
  }
  return formatString;
}

module.exports = {
  getFormatFromRequest,
  SUPPORTED_FORMATS,
  DEFAULT_FORMAT,
  FORMAT_WEBSITES,
};
