const AMP_FAVORITE_COUNT_COOKIE = 'amp-favorite-with-count';
const EXPIRATION_DATE = 365 * 24 * 60 * 60 * 1000; // 365 days in ms
const Cookie = require('cookie');

function readFavoriteFromCookie(cookieStr, name) {
  const cookies = Cookie.parse(cookieStr);
  const favorite = cookies[name];

  if (!favorite) {
    return false;
  }

  return favorite;
}

function writeFavoriteWithCount(value) {
  let count;
  if (value) {
    count = 124;
  } else {
    count = 123;
  }
  return {
    value,
    count,
  };
}

function writeFavoriteCookie(name, value) {
  return Cookie.serialize(name, {value}, {maxAge: EXPIRATION_DATE});
}

const handler = async (ev) => {
  const cookieStr = ev.headers.cookie || '';
  console.log(ev.headers);

  let favorite = readFavoriteFromCookie(cookieStr, AMP_FAVORITE_COUNT_COOKIE);
  let headers = {
    'Access-Control-Allow-Origin': ev.headers?.origin || '',
    'Cache-Control': 'public, max-age=0, stale-while-revalidate=0',
    'Content-Type': 'application/json',
  };

  if (ev.httpMethod === 'POST') {
    favorite = !favorite;
    headers = {
      ...headers,
      'Set-Cookie': `${writeFavoriteCookie(
        AMP_FAVORITE_COUNT_COOKIE,
        favorite
      )}`,
    };
  }

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(writeFavoriteWithCount(favorite)),
  };
};

module.exports = {handler};
