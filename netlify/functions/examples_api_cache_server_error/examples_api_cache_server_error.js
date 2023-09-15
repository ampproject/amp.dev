const handler = () => {
  return {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'text/plain',
    },
    body: '500 - Internal Server Error',
  };
};

module.exports = {handler};
