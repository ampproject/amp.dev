const handler = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      result: 'ok',
    }),
  };
};

module.exports = {handler};
