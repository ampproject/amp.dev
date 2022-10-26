const handler = async (ev) => {
  if (ev.httpMethod !== 'POST') {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }

  return {
    statusCode: 200,
  };
};

module.exports = {handler};
