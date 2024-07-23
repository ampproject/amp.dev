const cartJSON = require('./cart.json');

const handler = async (ev) => {
  const headers = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
  };

  const ampSourceOrigin = ev.queryStringParameters?.['__amp_source_origin'];

  if (ampSourceOrigin) {
    headers['AMP-Access-Control-Allow-Source-Origin'] = ampSourceOrigin;
    headers['Access-Control-Expose-Headers'] =
      'AMP-Access-Control-Allow-Source-Origin';
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(cartJSON),
  };
};

module.exports = {handler};
