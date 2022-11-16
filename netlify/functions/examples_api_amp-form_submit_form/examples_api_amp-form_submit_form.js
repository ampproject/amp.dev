const handler = async () => {
  return {
    statusCode: 303,
    headers: {
      'Location': '/static/samples/files/amp-form-success.html',
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
  };
};

module.exports = {handler};
