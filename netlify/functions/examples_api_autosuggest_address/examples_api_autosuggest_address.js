const {US_CAPITAL_CITIES} = require('./autosuggest.js');
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

  const {city} = ev.body;

  let result;

  if (US_CAPITAL_CITIES.includes(city)) {
    result = `Success! Your package is on it's way to ${city}.`;
  } else {
    result = `Sorry! We don't ship to ${city}.`;
  }

  const body = JSON.stringify({
    result,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
    body,
  };
};

module.exports = {handler};
