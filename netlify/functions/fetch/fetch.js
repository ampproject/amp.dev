const RateLimitedFetch = require('./rateLimitedFetch');
const FetchError = require('./fetchError');

const rateLimitedFetch = new RateLimitedFetch({
  requestHeaders: {
    'x-requested-by': 'playground',
    'Referer': 'https://amp.dev/playground',
  },
});

/**
 * Time a fetched document is cached on the requesting client in minutes.
 * One hour.
 * @type {Number}
 */
const MAX_AGE = 60 * 60;

const errorIdMap = {
  [FetchError.INVALID_URL]: 400,
  [FetchError.TOO_MANY_REQUESTS]: 429,
  [FetchError.NO_SUCCESS_RESPONSE]: 502,
  [FetchError.UNSUPPORTED_CONTENT_TYPE]: 502,
  [FetchError.OTHER]: 502,
};

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  let statusCode = 200;
  const headers = {
    'Cache-Control': `public, max-age=${MAX_AGE}, stale-while-revalidate=${Math.floor(
      MAX_AGE * 2
    )}`,
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
    'Content-Type': 'text/html',
  };
  let body = '';

  try {
    const doc = await rateLimitedFetch.fetchHtmlDocument(query.url);
    body = doc;
  } catch (error) {
    console.error('Could not fetch URL', query.url, error);
    headers['Content-Type'] = 'text/plain';
    if (error.errorId) {
      statusCode = errorIdMap[error.errorId] || 502;
      body = error.message;
    } else {
      statusCode = 500;
      body = `Internal error fetching ${request.query.url}`;
    }
  }

  return {
    statusCode,
    headers,
    body,
  };
};

module.exports = {handler};
