const apiResponsePassAll = {
  status: 'ok',
  redirected: true,
  url: 'https://amp.dev/',
  isAmp: true,
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
  },
};

const apiResponseFailAll = {
  status: 'ok',
  redirected: true,
  url: 'http://example.com',
  isAmp: true,
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
  },
};

const apiResponseInfoBoilerplate = {
  status: 'ok',
  redirected: true,
  url: 'http://example.com',
  isAmp: true,
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
};

module.exports = {
  apiResponsePassAll,
  apiResponseFailAll,
  apiResponseInfoBoilerplate,
  apiResponseNoAmp,
};
