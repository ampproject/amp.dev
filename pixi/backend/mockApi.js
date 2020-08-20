const express = require('express');

const dummyPageExperienceApiResponse = require('../mocks/pageExperienceCheck/apiResponse.json');
const {
  apiResponsePass: dummySafeBrowsingApiResponse,
} = require('../mocks/safeBrowsing/apiResponse.js');
const dummyMobileFriendlinessApiResponse = require('../mocks/mobileFriendliness/apiResponse.js');

const DEFAULT_TIMEOUT = 1000;

function timeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time || DEFAULT_TIMEOUT);
  });
}

// eslint-disable-next-line new-cap
const mockApi = express.Router();

mockApi.get('/page-experience', async (request, response) => {
  await timeout(request.query.timeout);
  response.json(dummyPageExperienceApiResponse);
});

// The following are called with POST in production, for quicker debugging
// also allow GET requests

mockApi.all('/safe-browsing', async (request, response) => {
  await timeout(request.query.timeout);
  response.json(dummySafeBrowsingApiResponse);
});

mockApi.all('/mobile-friendliness', async (request, response) => {
  await timeout(request.query.timeout);
  response.json(dummyMobileFriendlinessApiResponse.mobileFriendly);
});

module.exports = mockApi;
