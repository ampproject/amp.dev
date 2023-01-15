const {US_CAPITAL_CITIES_RICH} = require('./autosuggest.js');

const handler = async (ev) => {
  const query = ev.queryStringParameters?.q;

  const results = US_CAPITAL_CITIES_RICH.filter(
    (key) =>
      key.city.toUpperCase().includes(query.toUpperCase()) ||
      key.state.toUpperCase().includes(query.toUpperCase())
  );

  const body = JSON.stringify({
    items: results,
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'application/json',
    },
    body,
  };
};

module.exports = {handler};
