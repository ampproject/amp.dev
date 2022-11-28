function getDelay(query) {
  let delay = Number(query.delay);
  if (delay < 0 || !delay) {
    delay = 1000;
  }
  return delay;
}

function sleep(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const relatedProducts = require('./related_products.json');

const handler = async (ev) => {
  const query = ev.queryStringParameters;

  await sleep(getDelay(query));

  if (query.error) {
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
    body: JSON.stringify(relatedProducts),
  };
};

module.exports = {handler};
