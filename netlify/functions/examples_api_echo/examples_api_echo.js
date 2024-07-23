const busboyLib = require('busboy');

function jsonReply(data, ev) {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Access-Control-Allow-Credentials': 'true',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
    },
    body: JSON.stringify(data),
  };
}

const parseFormData = (ev) => {
  return new Promise((resolve, reject) => {
    const busboy = busboyLib({
      headers: {
        ...ev.headers,
        'content-type':
          ev.headers['Content-Type'] || ev.headers['content-type'],
      },
    });
    const result = {};

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
  if (ev.httpMethod === 'GET') {
    if (ev.headers['content-type'] != 'application/json') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': ev.headers?.origin || '',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: 'Requests must set content-type=application/json',
      };
    } else {
      return jsonReply(ev.queryStringParameters, ev);
    }
  } else if (ev.httpMethod === 'POST') {
    const parsedEvent = await parseFormData(ev);

    return jsonReply(parsedEvent.body, ev);
  } else {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }
};

module.exports = {handler};
