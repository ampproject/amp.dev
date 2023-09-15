const {CHARACTERS} = require('./autosuggest.js');

const handler = async (ev) => {
  const query = ev.queryStringParameters;

  const ampSourceOrigin = query['__amp_source_origin'];

  const headers = {
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
    'Content-Type': 'application/json',
  };

  if (ampSourceOrigin) {
    headers['AMP-Access-Control-Allow-Source-Origin'] = ampSourceOrigin;
    headers['Access-Control-Expose-Headers'] =
      'AMP-Access-Control-Allow-Source-Origin';
  }

  const results = CHARACTERS.filter((key) =>
    key.name.toUpperCase().includes(query.q?.toUpperCase())
  );

  const body = JSON.stringify({
    items: results,
  });

  return {
    statusCode: 200,
    headers,
    body,
  };
};

module.exports = {handler};
