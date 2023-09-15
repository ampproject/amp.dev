const handler = async (ev) => {
  const _url = ev?.queryStringParameters?.url;

  if (!_url) {
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Content-Type': 'text/html',
        'Cache-Control': 'max-age=365000000, immutable',
      },
      body: 'No url specified via <code>?url=https://example.com</code>',
    };
  }

  try {
    new URL(_url);
  } catch (err) {
    return {
      statusCode: 422,
      headers: {
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Cache-Control': 'max-age=365000000, immutable',
        'Content-Type': 'text/plain',
      },
      body: 'Invalid url specified',
    };
  }

  return {
    statusCode: 301,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Cache-Control': 'max-age=365000000, immutable',
      'Location': _url,
    },
  };
};

module.exports = {handler};
