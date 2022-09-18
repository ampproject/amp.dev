const AMP_ACCESS_COOKIE = 'ABE_LOGGED_IN';
const Cookie = require('cookie');
const POWER_USERS = {
  'Jane@gmail.com': true,
};

const handler = async (ev) => {
  const cookies = Cookie.parse(ev.headers.cookie);
  const cookie = cookies[AMP_ACCESS_COOKIE];

  if (!cookie) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loggedIn: false,
        powerUser: false,
        email: '',
        name: '',
      }),
    };
  }

  const email = cookie.email;

  const powerUser = POWER_USERS[email];

  const body = JSON.stringify({
    loggedIn: true,
    powerUser,
    email,
    name: email.split('@')[0],
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
