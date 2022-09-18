const AMP_FAVORITE_COOKIE= 'amp-favorite';
const AMP_FAVORITE_COUNT_COOKIE = 'amp-favorite-with-count';
const EXPIRATION_DATE = 365 * 24 * 60 * 60 * 1000; // 365 days in ms
const Cookie = require('cookie');

function readFavoriteFromCookie(cookieStr, name) {
  const cookies = Cookie.parse(cookieStr);
  const favorite = cookies[AMP_FAVORITE_COOKIE];

  if (!favorite) {
    return false;
  }

  return favorite
}

const handler = async (ev) => {
  const cookieStr = ev.headers.cookie || '';

  let favorite = readFavoriteFromCookie(cookieStr, AMP_FAVORITE_COOKIE);
  let headers = {
    'Cache-Control': 'public, max-age=0, stale-while-revalidate=0',
    'Content-Type': 'application/json',
  };

  if (ev.httpMethod !== 'POST') {
    favorite = !favorite
    headers = {
      ...headers,
      'Set-Cookie': `${favorite}; Max-Age=${EXPIRATION_DATE}`
    }
  }

  return {
    statusCode: 200,
    headers,
    body: `${favorite}`
  };
};

module.exports = {handler};
