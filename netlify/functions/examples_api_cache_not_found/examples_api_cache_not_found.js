const handler = async () => {
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=365000000, immutable',
    },
    body: '404 - Not found',
  };
};

module.exports = {handler};
