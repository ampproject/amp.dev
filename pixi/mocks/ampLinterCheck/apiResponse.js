const apiResponsePass = {
  status: 'ok',
  redirected: true,
  url: 'https://amp.dev/',
  components: {'amp-analytics': '0.1', 'amp-list': '0.1', 'amp-geo': '0.1'},
  data: {
    blockingextensionspreloaded: [
      {
        info: '',
        message: '',
        status: 'PASS',
        title: 'Render-blocking extensions are preloaded',
        url:
          'https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/#optimize-the-amp-runtime-loading',
      },
    ],
    isvalid: {
      info: '',
      status: 'PASS',
      title: 'Document is valid AMP',
      url: 'https://validator.amp.dev/',
    },
    moduleruntimeused: {
      info: '',
      message: 'The JavaScript module version of the AMP Runtime is not used',
      status: 'WARN',
      title: 'Page is using JavaScript Module version of the AMP Runtime',
      url:
        '"https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/amp-optimizer-guide/"',
    },
  },
};
const apiResponseFail = {
  status: 'ok',
  redirected: true,
  url: 'http://example.com',
  components: {},
  data: {},
};

module.exports = {
  apiResponsePass,
  apiResponseFail,
};
