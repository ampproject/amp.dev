const {CHARACTERS} = require('../autosuggest.js');

const handler = async (ev) => {
  const query = ev.rawQuery.replace(/=/g, '');

  const results = CHARACTERS.filter((key) =>
    key.name.toUpperCase().includes(query.toUpperCase())
  );

  const body = JSON.stringify({
    items: results,
  });

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  };
};

module.exports = {handler};
