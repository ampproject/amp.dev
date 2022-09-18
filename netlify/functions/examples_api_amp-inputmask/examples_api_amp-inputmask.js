const middy = require('middy');
const {
  httpErrorHandler,
  httpHeaderNormalizer,
  jsonBodyParser,
} = require('middy/middlewares');

/* Normal lambda code */
const businessLogic = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  const code = ev.body ? ev.body['code'] : '';
  const codeUnmasked = ev.body ? ev.body['code-unmasked'] : '';

  return {
    statusCode: 200,
    body: JSON.stringify({
      code,
      'code-unmasked': codeUnmasked,
    }),
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
