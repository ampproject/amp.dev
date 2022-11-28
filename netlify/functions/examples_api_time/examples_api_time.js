const handler = async () => {
  const time = new Date().toLocaleTimeString();
  const body = JSON.stringify({time});

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json',
    },
    body,
  };
};

module.exports = {handler};
