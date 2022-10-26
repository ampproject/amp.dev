function jsonReply(ev) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=365000000, immutable',
    },
    body: JSON.stringify(ev.query),
  };
}

const handler = async (ev) => {
  if (ev.httpMethod === 'GET') {
    if (ev.headers['content-type'] != 'application/json') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'text/plain',
        },
        body: 'Requests must set content-type=application/json',
      };
    } else {
      return jsonReply(ev);
    }
  } else if (ev.httpMethod === 'POST') {
    return jsonReply(ev);
  } else {
    return {statusCode: 405, body: 'Method Not Allowed'};
  }
};

module.exports = {handler};
