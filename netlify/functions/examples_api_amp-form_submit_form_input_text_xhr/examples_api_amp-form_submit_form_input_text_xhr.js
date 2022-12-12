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

const ERROR_CASE_AMP_FORM = 'error';

const handler = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  const query = ev.queryStringParameters;
  const ampSourceOrigin = query['__amp_source_origin'];

  const headers = {
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
    'Content-Type': 'application/json',
  };

  if (ampSourceOrigin) {
    headers['AMP-Access-Control-Allow-Source-Origin'] = ampSourceOrigin;
    headers['Access-Control-Expose-Headers'] =
      'AMP-Access-Control-Allow-Source-Origin';
  }

  const parsedEvent = await parseFormData(ev);

  ev.body = ev.body ? parsedEvent.body : {};

  const {email, name} = ev.body;

  if (isUserTryingTheInputTextErrorDemo(name)) {
    return {
      statusCode: 400,
    };
  }

  const body = JSON.stringify({
    email,
    name,
  });

  return {
    statusCode: 200,
    headers,
    body,
  };
};

module.exports = {handler};
