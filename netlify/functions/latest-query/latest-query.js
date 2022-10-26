const handler = async () => {
  return {
    headers: {
      'Content-Type': 'text/plain',
    },
    statusCode: 200,
    body: 'null',
  };
};

module.exports = {handler};
