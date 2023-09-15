const handler = async () => {
  return {
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'text/plain',
    },
    statusCode: 200,
    body: 'null',
  };
};

module.exports = {handler};
