const apiResponsePass = {};
const apiResponseFail = {
  matches: [
    {
      threatType: 'MALWARE',
      platformType: 'WINDOWS',
      threatEntryType: 'URL',
      threat: {
        url: 'http://example.com/',
      },
      threatEntryMetadata: {
        entries: [
          {
            key: 'malware_threat_type',
            value: 'landing',
          },
        ],
      },
      cacheDuration: '300.000s',
    },
    {
      threatType: 'MALWARE',
      platformType: 'WINDOWS',
      threatEntryType: 'URL',
      threat: {
        url: 'http://example.com/',
      },
      threatEntryMetadata: {
        entries: [
          {
            key: 'malware_threat_type',
            value: 'landing',
          },
        ],
      },
      cacheDuration: '300.000s',
    },
  ],
};

module.exports = {
  apiResponsePass,
  apiResponseFail,
};
