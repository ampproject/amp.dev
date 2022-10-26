const nunjucks = require('nunjucks');
const path = require('path');
const LOGIN_FILE_PATH = path.join(__dirname, 'login.html');

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  const returnUrl = query.return;

  const body = nunjucks.render(LOGIN_FILE_PATH, {returnurl: returnUrl});

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body,
  };
};

module.exports = {handler};
