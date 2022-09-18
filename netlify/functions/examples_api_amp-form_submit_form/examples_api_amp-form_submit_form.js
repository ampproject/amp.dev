const handler = async () => {
  return {
    statusCode: 303,
    headers: {
      'Location': '/static/samples/files/amp-form-success.html',
    },
  };
};

module.exports = {handler};
