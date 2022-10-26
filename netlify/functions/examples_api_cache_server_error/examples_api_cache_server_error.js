const handler = () => {
  return {
    statusCode: 500,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: '500 - Internal Server Error',
  };
};

module.exports = {handler};
