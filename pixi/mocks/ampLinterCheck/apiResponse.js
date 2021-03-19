const apiResponsePassAll = {
  status: 'ok',
  redirected: true,
  url: 'https://amp.dev/',
  isAmp: true,
  isCacheUrl: false,
  components: {
    'amp-install-serviceworker': '0.1',
    'amp-consent': '0.1',
    'amp-geo': '0.1',
  },
  data: {
    isvalid: {
      status: 'PASS',
    },
    runtimeispreloaded: {
      status: 'PASS',
    },
    blockingextensionspreloaded: [
      {
        status: 'PASS',
      },
    ],
    fontsarepreloaded: {
      status: 'PASS',
    },
    fastgooglefontsdisplay: {
      status: 'PASS',
    },
    googlefontpreconnect: {
      status: 'PASS',
    },
    istransformedamp: {
      status: 'PASS',
    },
    boilerplateisremoved: {
      status: 'PASS',
    },
    moduleruntimeused: {
      status: 'PASS',
    },
    heroimageisdefined: {
      status: 'PASS',
    },
    viewportdisablestapdelay: {
      status: 'PASS',
    },
    noiconfontisused: {
      status: 'PASS',
    },
  },
};

const apiResponseFailAll = {
  status: 'ok',
  redirected: true,
  url: 'http://www-test.cdn.ampproject.org/c/s/www.test/',
  isAmp: true,
  isCacheUrl: true,
  components: {
    'amp-experiment': '0.1',
    'amp-access': '0.1',
  },
  data: {
    isvalid: {
      status: 'FAIL',
    },
    runtimeispreloaded: {
      status: 'WARN',
    },
    blockingextensionspreloaded: [
      {
        status: 'WARN',
      },
      {
        status: 'WARN',
      },
    ],
    fontsarepreloaded: {
      status: 'INFO',
    },
    fastgooglefontsdisplay: {
      status: 'WARN',
    },
    googlefontpreconnect: {
      status: 'WARN',
    },
    istransformedamp: {
      status: 'WARN',
    },
    boilerplateisremoved: {
      status: 'WARN',
    },
    moduleruntimeused: {
      status: 'WARN',
    },
    heroimageisdefined: {
      status: 'WARN',
    },
    viewportdisablestapdelay: {
      status: 'WARN',
    },
    noiconfontisused: {
      status: 'WARN',
    },
  },
};

const apiResponseInfoBoilerplate = {
  status: 'ok',
  redirected: true,
  url: 'http://example.com',
  isAmp: true,
  isCacheUrl: false,
  components: {},
  data: {
    boilerplateisremoved: {
      status: 'INFO',
    },
  },
};

const apiResponseNoAmp = {
  status: 'ok',
  redirected: true,
  url: 'http://example.com',
  isAmp: false,
  isCacheUrl: false,
};

const apiResponseError = {
  status: 'error',
  errorId: 'NO_SUCCESS_RESPONSE',
};

module.exports = {
  apiResponsePassAll,
  apiResponseFailAll,
  apiResponseInfoBoilerplate,
  apiResponseNoAmp,
  apiResponseError,
};
