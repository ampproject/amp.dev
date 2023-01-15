const Cookie = require('cookie');
const busboyLib = require('busboy');

const parseFormData = (ev) => {
  return new Promise((resolve, reject) => {
    const busboy = busboyLib({
      headers: {
        ...ev.headers,
        'content-type':
          ev.headers['Content-Type'] || ev.headers['content-type'],
      },
    });
    const result = {
      files: [],
    };

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      file.on('data', (data) => {
        result.files.push({
          file: data,
          fileName: filename,
          contentType: mimetype,
        });
      });
    });
    busboy.on('field', (fieldname, value) => {
      try {
        result[fieldname] = JSON.parse(value);
      } catch (err) {
        result[fieldname] = value;
      }
    });
    busboy.on('error', (error) => reject(new Error(`Parse error: ${error}`)));
    busboy.on('finish', () => {
      ev.body = result;
      resolve(ev);
    });
    busboy.write(ev.body, ev.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
  });
};

const COOKIE_NAME = 'amp-subscription-settings';
const COOKIE_EXPIRATION_DATE = 365 * 24 * 60 * 60 * 1000; // 365 days in ms
const COOKIE_VALUES = new Set(['watching', 'only-mentions', 'ignoring']);
const COOKIE_DEFAULT = 'only-mentions';

function readSubscription(cookies) {
  return parseSubscription((cookies[COOKIE_NAME] || {}).value);
}

function parseSubscription(value) {
  return COOKIE_VALUES.has(value) ? value : COOKIE_DEFAULT;
}

function generateSubscription(value) {
  return Cookie.serialize(COOKIE_NAME, parseSubscription(value), {
    maxAge: COOKIE_EXPIRATION_DATE,
  });
}

const handler = async (ev) => {
  const cookieStr = ev.headers.cookie || '';
  const cookies = Cookie.parse(cookieStr);

  const query = ev.queryStringParameters;

  const headers = {
    'Cache-Control': 'public, max-age=0, stale-while-revalidate=0',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
  };

  const ampSourceOrigin = query?.['__amp_source_origin'];

  if (ampSourceOrigin) {
    headers['AMP-Access-Control-Allow-Source-Origin'] = ampSourceOrigin;
    headers['Access-Control-Expose-Headers'] =
      'AMP-Access-Control-Allow-Source-Origin';
  }

  if (ev.httpMethod === 'POST') {
    // Simulate a modest delay so that the UI's "submitting" state is discernible
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (query.fail) {
      return {
        headers,
        statusCode: 500,
      };
    } else {
      const parsedEvent = await parseFormData(ev);

      ev.body = ev.body ? parsedEvent.body : {};

      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Set-Cookie': `${generateSubscription(ev.body.nextSubscription)}`,
        },
        body: JSON.stringify({}),
      };
    }
  } else if (ev.httpMethod === 'GET') {
    const currentSubscription = readSubscription(cookies);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        currentSubscription,
        options: Array.from(COOKIE_VALUES, (value) => ({
          value,
          isSelected: value === currentSubscription,
          text: `${value[0].toUpperCase()}${value
            .substring(1)
            .replace(/-/g, ' ')}`,
          imgUrl: `/static/samples/img/${value}`,
        })),
      }),
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      result: `Item with ID ${id} bookmarked.`,
    }),
  };
};

module.exports = {handler};
