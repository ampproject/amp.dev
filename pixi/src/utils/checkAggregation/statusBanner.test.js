import getStatusId from './statusBanner.js';
import {fixedRecommendations} from './recommendations';

const pendingPromise = new Promise(() => {});

const passedLinterPromise = Promise.resolve({
  isLoaded: true,
  isAmp: true,
  isValid: true,
  usesHttps: true,
  isOriginUrl: true,
});

const passedMobileFriendlinessPromise = Promise.resolve({
  mobileFriendly: true,
});

const passedSafeBrowsingPromise = Promise.resolve({
  safeBrowsing: true,
});

describe('getStatusId', () => {
  it('returns invalid-url', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.resolve({
        isLoaded: false,
      }),
      pendingPromise
    );
    expect(statusId).toBe('invalid-url');
  });

  it('returns no-amp', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: false,
        isOriginUrl: true,
      }),
      pendingPromise
    );
    expect(statusId).toBe('no-amp');
  });

  it('returns amp-cache-url', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isOriginUrl: false,
      }),
      pendingPromise
    );
    expect(statusId).toBe('amp-cache-url');
  });

  it('returns invalid-amp', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isOriginUrl: true,
        isValid: false,
      }),
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('invalid-amp');
  });

  it('returns cache-failed-no-info based on field data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-no-info');
  });

  it('returns cache-failed-no-info based on lab data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          labData: {
            isAllFast: true,
          },
          source: 'labData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-no-info');
  });

  it('returns cache-failed-with-info based on field data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-with-info');
  });

  it('returns cache-failed-with-info based on lab data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          labData: {
            isAllFast: true,
          },
          source: 'labData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-with-info');
  });

  it('returns origin-failed-no-info for field data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('origin-failed-no-info');
  });

  it('returns origin-failed-no-info for lab data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          labData: {
            isAllFast: false,
          },
          source: 'labData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('origin-failed-no-info');
  });

  it('returns origin-failed-with-info for field data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('origin-failed-with-info');
  });

  it('returns origin-failed-with-info for lab data', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          labData: {
            isAllFast: false,
          },
          source: 'labData',
        },
        pageExperienceCached: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('origin-failed-with-info');
  });

  it('returns failed-no-info due to CWV', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-no-info due to safe browsing', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      Promise.resolve({}),
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-no-info due to mobile friendly', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      Promise.resolve({})
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-no-info due to linter', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          labData: {
            isAllFast: true,
          },
          source: 'labData',
        },
      }),
      passedSafeBrowsingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isOriginUrl: true,
        isValid: true,
        usesHttps: false,
      }),
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-with-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: false,
          },
          labData: {
            isAllFast: true,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('failed-with-info');
  });

  it('returns all-passed', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('all-passed');
  });

  it('returns passed-with-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {
          fieldData: {
            isAllFast: true,
          },
          labData: {
            isAllFast: false,
          },
          source: 'fieldData',
        },
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('passed-with-info');
  });

  it('returns generic-error for linter error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.reject(new Error('error')),
      pendingPromise
    );
    expect(statusId).toBe('generic-error');
  });

  it('returns cwv-error for page experience error', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({error: new Error('error')}),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cwv-error');
  });

  it('returns api-error for safe browsing error', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {},
      }),
      Promise.resolve({error: new Error('error')}),
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for mobile friendliness error', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {},
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      Promise.resolve({error: new Error('error')})
    );
    expect(statusId).toBe('api-error');
  });
});
