const mobileFriendly = {
  testStatus: {
    status: 'COMPLETE',
  },
  mobileFriendliness: 'MOBILE_FRIENDLY',
};

const mobileFriendlyWithIssues = {
  testStatus: {
    status: 'COMPLETE',
  },
  mobileFriendliness: 'MOBILE_FRIENDLY',
  resourceIssues: [
    {
      blockedResource: {
        url: 'http://www.example.com/resource1.jpg',
      },
    },
    {
      blockedResource: {
        url: 'http://www.example.com/resource2.jpg',
      },
    },
  ],
};

const notMobileFriendly = {
  testStatus: {
    status: 'COMPLETE',
  },
  mobileFriendliness: 'NOT_MOBILE_FRIENDLY',
};

const unspecifiedStatus = {
  testStatus: {
    status: 'TEST_STATUS_UNSPECIFIED',
  },
};

const internalError = {
  testStatus: {
    status: 'INTERNAL_ERROR',
  },
};

const pageUnreachable = {
  testStatus: {
    status: 'PAGE_UNREACHABLE',
  },
};

module.exports = {
  mobileFriendly,
  mobileFriendlyWithIssues,
  notMobileFriendly,
  unspecifiedStatus,
  internalError,
  pageUnreachable,
};
