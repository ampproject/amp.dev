module.exports = {
  development: {
    API_ENDPOINT_LINTER: 'http://localhost:8080/page-experience/api/lint',
    API_ENDPOINT_SAFE_BROWSING:
      'http://localhost:8080/page-experience/mock-api/safe-browsing',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'http://localhost:8080/page-experience/mock-api/page-experience',
    API_ENDPOINT_MOBILE_FRIENDLINESS:
      'http://localhost:8080/page-experience/mock-api/mobile-friendliness',
  },
  production: {
    API_ENDPOINT_LINTER: 'https://amp.dev/page-experience/api/lint',
    API_ENDPOINT_SAFE_BROWSING:
      'https://safebrowsing.googleapis.com/v4/threatMatches:find',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
    API_ENDPOINT_MOBILE_FRIENDLINESS:
      'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run',
  },
};
