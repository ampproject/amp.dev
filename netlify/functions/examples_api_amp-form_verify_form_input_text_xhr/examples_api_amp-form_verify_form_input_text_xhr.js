const ERROR_CASE_AMP_FORM = 'error';
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

function isUserTryingTheInputTextErrorDemo(name) {
  return name === ERROR_CASE_AMP_FORM;
}

const handler = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  const parsedEvent = await parseFormData(ev);

  ev.body = ev.body ? parsedEvent.body : {};

  const {username} = ev.body;

  if (isUserTryingTheInputTextErrorDemo(username)) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        verifyErrors: [
          {
            message: `The username ${username} is already taken`,
            name: 'username',
          },
        ],
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
    }),
  };
};

module.exports = {handler};
