jest.mock('node-fetch');
const fetch = require('node-fetch');
const {Response} = jest.requireActual('node-fetch');
const LimitedRemoteFetch = require('./rateLimitedFetch.js');
const RemoteFetchError = require('./fetchError');

const remoteFetch = new LimitedRemoteFetch({});

test('Fetch a html document without error', async () => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response('<html></html>', {
        status: 200,
        headers: {
          'content-type': 'text/html',
        },
      })
    )
  );
  expect(await remoteFetch.fetchHtmlDocument('http://www.test')).toEqual(
    '<html></html>'
  );
});

test('Fetch error response status', () => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response('{}', {
        status: 404,
        headers: {
          'content-type': 'text/html',
        },
      })
    )
  );
  const result = remoteFetch.fetchHtmlDocument('http://www.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.NO_SUCCESS_RESPONSE);
    expect(e.message).toEqual(
      'Request to http://www.test could not complete successfully (status 404).'
    );
  });
});

test('Fetch error unsupported content type', () => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response('{}', {
        status: 200,
        headers: {
          'content-type': 'application/json',
        },
      })
    )
  );
  const result = remoteFetch.fetchHtmlDocument('http://www.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.UNSUPPORTED_CONTENT_TYPE);
    expect(e.message).toEqual('http://www.test is no HTML document.');
  });
});

test('Fetch error no content type header', () => {
  fetch.mockReturnValue(
    Promise.resolve(
      new Response('{}', {
        status: 200,
        headers: {
          'content-type': null,
        },
      })
    )
  );
  const result = remoteFetch.fetchHtmlDocument('http://www.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.UNSUPPORTED_CONTENT_TYPE);
    expect(e.message).toEqual('http://www.test is no HTML document.');
  });
});

test('Fetch error empty url', () => {
  const result = remoteFetch.fetchHtmlDocument('');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.INVALID_URL);
    expect(e.message).toEqual('No URL provided.');
  });
});

test('Fetch error invalid url', () => {
  const result = remoteFetch.fetchHtmlDocument('mailto:me@mail.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.INVALID_URL);
    expect(e.message).toEqual('mailto:me@mail.test is not a valid URL.');
  });
});

test('Fetch error rate limit', async () => {
  for (let i = 1; i <= 10; i++) {
    fetch.mockReturnValueOnce(
      Promise.resolve(
        new Response('<html></html>', {
          status: 200,
          headers: {
            'content-type': 'text/html',
          },
        })
      )
    );
    await remoteFetch.fetchHtmlDocument(`http://www.limit/page-${i}/`);
  }
  expect.assertions(2);
  const result = remoteFetch.fetchHtmlDocument('http://www.limit/page-11}/');
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.TOO_MANY_REQUESTS);
    expect(e.message).toEqual(
      'www.limit has been requested too many times. Please wait a few seconds and then try again.'
    );
  });
});

test('Fetch error invalid host', () => {
  fetch.mockImplementation(() => {
    const error = new Error('Host not found');
    error.errno = 'ENOTFOUND';
    throw error;
  });
  const result = remoteFetch.fetchHtmlDocument('http://www.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.INVALID_URL);
    expect(e.message).toEqual('Host www.test not found.');
  });
});

test('Fetch error other', () => {
  fetch.mockImplementation(() => {
    throw new Error('error');
  });
  const result = remoteFetch.fetchHtmlDocument('http://www.test');
  expect.assertions(2);
  return result.catch((e) => {
    expect(e.errorId).toEqual(RemoteFetchError.OTHER);
    expect(e.message).toEqual(
      'An error occurred while trying to get http://www.test.'
    );
  });
});
