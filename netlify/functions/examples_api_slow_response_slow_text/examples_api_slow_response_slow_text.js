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

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  const delay = getDelay(query);
  const timeWord = delay == 1 ? 'second' : 'seconds';

  await sleep(delay * 1000);

  if (query.error) {
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
    body: `This call returned in ${delay} ${timeWord}!`,
  };
};

module.exports = {handler};
