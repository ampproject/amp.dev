const {checkPageExperience} = require('./index.js');

class MockResponse {
  json(value) {
    this.jsonResult = value;
  }
}

test.skip('runs amp page experience checks', async () => {
  const req = {
    query: {
      url: 'https://amp.dev',
    },
  };
  const res = new MockResponse();
  await checkPageExperience(req, res);
  // expect(res.jsonResult['isvalid'].status).toBe('PASS');
});
