module.exports = {
  development: {
    API_ENDPOINT_LINTER:
      'http://localhost:8080/page-experience/api/lint/?url=https://amp.dev/',
    API_ENDPOINT_SAFE_BROWSING:
      'http://localhost:8080/page-experience/api/safe-browsing-dummy',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'http://localhost:8080/page-experience/api/page-experience-dummy',
  },
  production: {
    API_ENDPOINT_LINTER:
      'https://amp.dev/page-experience/api/lint/?url=https://amp.dev/',
    API_ENDPOINT_SAFE_BROWSING:
      'https://safebrowsing.googleapis.com/v4/threatMatches:find',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  },
};
