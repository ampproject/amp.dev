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

const Cookie = require('cookie');
const AMP_ACCESS_COOKIE = 'ABE_LOGGED_IN';
const EXPIRATION_DATE = 24 * 60 * 60 * 1000; // 1 day in ms
const VALID_USERS = {
  'mark@gmail.com': true,
  'jane@gmail.com': true,
};

const businessLogic = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  const parsedEvent = await parseFormData(ev);

  let {email, returnUrl} = parsedEvent.body || {};

  if (!VALID_USERS[email]) {
    return {
      statusCode: 401,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
      },
      body: 'Invalid Email',
    };
  }

  if (!isValidURL(returnUrl)) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: 'Invalid return URL',
    };
  }

  returnUrl += '#success=true';

  const myCookie = Cookie.serialize(
    AMP_ACCESS_COOKIE,
    {email},
    {expires: new Date(Date.now() + EXPIRATION_DATE)}
  );

  return {
    statusCode: 303,
    headers: {
      'Set-Cookie': myCookie,
      'Location': returnUrl,
    },
  };
};

const handler = middy(businessLogic)
  .use(httpHeaderNormalizer())
  // parses the request body when it's a JSON and converts it to an object
  .use(jsonBodyParser())
  // handles common http errors and returns proper responses
  .use(httpErrorHandler());

module.exports = {
  handler,
};
