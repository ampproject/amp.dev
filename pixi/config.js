module.exports = {
  development: {
    API_ENDPOINT_SAFE_BROWSING:
      'https://safebrowsing.googleapis.com/v4/threatMatches:find',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'http://localhost:8080/page-experience/api/page-experience-dummy',
  },
  production: {
    API_ENDPOINT_SAFE_BROWSING:
      'https://safebrowsing.googleapis.com/v4/threatMatches:find',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
  },
};
