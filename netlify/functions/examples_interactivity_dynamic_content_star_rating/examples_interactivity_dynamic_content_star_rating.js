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

const handler = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  const parsedEvent = await parseFormData(ev);
  ev.body = ev.body ? parsedEvent.body : {};

  const rating = ev.body?.rating || '';

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
    body: JSON.stringify({
      rating,
    }),
  };
};

module.exports = {handler};
