const AMP_ACCESS_COOKIE = 'ABE_LOGGED_IN';

function isValidURL(url) {
  try {
    const a = new URL(url);

    return (
      a.host &&
      a.protocol &&
      (a.protocol === 'http:' || a.protocol === 'https:')
    );
  } catch (e) {
    return false;
  }
}

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  let returnUrl = query.return || '';

  if (!isValidURL(returnUrl)) {
    return {
      statusCode: 422,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Invalid return URL',
    };
  }

  returnUrl += '#success=true';

  return {
    statusCode: 303,
    headers: {
      'Set-Cookie': `${AMP_ACCESS_COOKIE}=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      'Location': returnUrl,
    },
  };
};

module.exports = {handler};
