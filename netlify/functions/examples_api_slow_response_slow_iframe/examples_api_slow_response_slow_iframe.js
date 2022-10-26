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

  await sleep(getDelay(query));

  if (query.error) {
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/javascript',
    },
    body: `This iframe was delayed ${getDelay(
      query
    )} milliseconds. Hard-refresh the page (Ctrl/Cmd+Shift+R) if you didn't see the spinner.`,
  };
};

module.exports = {handler};
