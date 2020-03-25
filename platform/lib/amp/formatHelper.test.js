const {
  getFormatFromRequest,
  DEFAULT_FORMAT,
  SUPPORTED_FORMATS,
} = require('./formatHelper.js');

const request = {
  query: {},
};

test('returns default format if no format given', () => {
  request.query = {};
  const format = getFormatFromRequest(request);
  expect(format).toBe(DEFAULT_FORMAT);
});

test('returns default format if invalid format given', () => {
  request.query.format = 'dummy';
  const format = getFormatFromRequest(request);
  expect(format).toBe(DEFAULT_FORMAT);
});

test('supports uppercase formats', () => {
  const testFormat = SUPPORTED_FORMATS[1];
  request.query.format = testFormat.toUpperCase();
  const format = getFormatFromRequest(request);
  expect(format).toBe(testFormat);
});

test('matches all existing formats', () => {
  SUPPORTED_FORMATS.forEach((expectedFormat) => {
    request.query.format = expectedFormat;
    const actualFormat = getFormatFromRequest(request);
    expect(actualFormat).toBe(expectedFormat);
  });
});
