const Busboy = require("busboy");

const parseFormData = (ev) => {
  return new Promise((resolve, reject) => {
    const busboy = Busboy({
      headers: {
        ...ev.headers,
        "content-type":
          ev.headers["Content-Type"] || ev.headers["content-type"],
      },
    });
    const result = {
      files: [],
    };

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      file.on("data", (data) => {
        result.files.push({
          file: data,
          fileName: filename,
          contentType: mimetype,
        });
      });
    });
    busboy.on("field", (fieldname, value) => {
      try {
        result[fieldname] = JSON.parse(value);
      } catch (err) {
        result[fieldname] = value;
      }
    });
    busboy.on("error", (error) => reject(`Parse error: ${error}`));
    busboy.on("finish", () => {
      ev.body = result;
      resolve(ev);
    });
    busboy.write(ev.body, ev.isBase64Encoded ? "base64" : "binary");
    busboy.end();
  });
};
const handler = async (ev) => {
  const headers = {};
  let name;

  if (ev.httpMethod === 'POST') {
    headers['Cache-Control'] = 'no-cache';
    const parsedEvent = await parseFormData(ev);

    name = parsedEvent.body.name;
  } else if (ev.httpMethod === 'GET') {
    headers['Cache-Control'] = 'max-age=365000000, immutable';
    name = ev.queryStringParameters.name;
  } else {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  if (!name || name.length > 10) {
    headers['Content-Type'] = 'text/plain';

    return {
      headers,
      statusCode: 400,
      body: JSON.stringify({
        error: 'Invalid input',
      }),
    };
  }

  headers['Content-Type'] = 'application/json';

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, ${name}!`,
    }),
  };
};

module.exports = {handler};
