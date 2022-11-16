const casual = require('casual');
const baseUrl = '/documentation/examples/api/';

function randomFalsy() {
  const rand = Math.floor(Math.random() * Math.floor(3));
  switch (rand) {
    case 1:
      return null;
    case 2:
      return undefined;
    case 3:
      return '';
    default:
      return false;
  }
}

function getMaxAgeStr(maxAge, cdnMaxAge = '') {
  if (cdnMaxAge) {
    cdnMaxAge = `s-max-age=${cdnMaxAge}, `;
  }
  return ` max-age=${maxAge}, ${cdnMaxAge}stale-while-revalidate=${Math.floor(
    maxAge * 2
  )}`;
}

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  let items = [];
  const numberOfItems = Number(query.items) || 10;

  const pagesLeft = Number.isNaN(Number(query.left)) ? 1 : Number(query.left);
  const latency = Number(query.latency) || 0;
  const width = Number(query.width) || 200;
  const height = Number(query.height) || width;
  const dimensions = width === height ? String(width) : `${width}/${height}`;

  if (pagesLeft == 0) {
    return {
      statusCode: 200,
      headers: {
        'Cache-Control': getMaxAgeStr(60 * 60), // 1h
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [],
      }),
    };
  }

  for (let i = 0; i < numberOfItems; i++) {
    const imageId = Math.floor(Math.random() * Math.floor(50));
    const imageUrl = `https://picsum.photos/id/${imageId}/${dimensions}`;
    const r = {
      id: `item${imageId}`,
      title: casual.title,
      description: casual.description,
      imageUrl,
    };
    items.push(r);
  }

  if ('single' in query) {
    items = items[0];
  }

  const nextUrl =
    baseUrl +
    '/photo-stream?items=' +
    numberOfItems +
    '&left=' +
    JSON.stringify(pagesLeft - 1);

  const next = pagesLeft == 0 ? randomFalsy() : nextUrl;
  const results = next === false ? {items} : {items, next};

  if (latency) {
    await new Promise((resolve) => setTimeout(resolve, latency));
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
    },
    body: JSON.stringify(results),
  };
};

module.exports = {handler};
