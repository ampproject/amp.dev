const handler = async (ev) => {
  const query = ev.queryStringParameters;
  const id = query?.id || '';

  const headers = {
    'Cache-Control': 'public, max-age=0, stale-while-revalidate=0',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
    'Access-Control-Allow-Credentials': true,
  };

  const ampSourceOrigin = query?.['__amp_source_origin'];

  if (ampSourceOrigin) {
    headers['AMP-Access-Control-Allow-Source-Origin'] = ampSourceOrigin;
    headers['Access-Control-Expose-Headers'] =
      'AMP-Access-Control-Allow-Source-Origin';
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      result: `Item with ID ${id} bookmarked.`,
    }),
  };
};

module.exports = {handler};
