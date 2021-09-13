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

describe('getStatusId', () => {
  it('returns invalid-url', async () => {
    const statusId = await getStatusId({
      linter: Promise.resolve({
        isLoaded: false,
      }),
    });
    expect(statusId).toBe('invalid-url');
  });

  it('returns no-amp', async () => {
    const statusId = await getStatusId({
      linter: Promise.resolve({
        isLoaded: true,
        isAmp: false,
        isOriginUrl: true,
      }),
    });
    expect(statusId).toBe('no-amp');
  });

  it('returns amp-cache-url', async () => {
    const statusId = await getStatusId({
      linter: Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isOriginUrl: false,
      }),
    });
    expect(statusId).toBe('amp-cache-url');
  });

  it('returns invalid-amp', async () => {
    const statusId = await getStatusId(
      {
        linter: Promise.resolve({
          isLoaded: true,
          isAmp: true,
          isOriginUrl: true,
          isValid: false,
        }),
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('invalid-amp');
  });

  it('returns cache-failed-no-info based on field data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('cache-failed-no-info');
  });

  it('returns cache-failed-no-info based on lab data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('cache-failed-no-info');
  });

  it('returns cache-failed-with-info based on field data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('cache-failed-with-info');
  });

  it('returns cache-failed-with-info based on lab data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('cache-failed-with-info');
  });

  it('returns origin-failed-no-info for field data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('origin-failed-no-info');
  });

  it('returns origin-failed-no-info for lab data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('origin-failed-no-info');
  });

  it('returns origin-failed-with-info for field data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('origin-failed-with-info');
  });

  it('returns origin-failed-with-info for lab data', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('origin-failed-with-info');
  });

  it('returns failed-no-info due to CWV', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-no-info due to mobile friendly', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: Promise.resolve({}),
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-no-info due to linter', async () => {
    const statusId = await getStatusId(
      {
        linter: Promise.resolve({
          isLoaded: true,
          isAmp: true,
          isOriginUrl: true,
          isValid: true,
          usesHttps: false,
        }),
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
          pageExperience: {
            labData: {
              isAllFast: true,
            },
            source: 'labData',
          },
        }),
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('failed-no-info');
  });

  it('returns failed-with-info', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('failed-with-info');
  });

  it('returns all-passed', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('all-passed');
  });

  it('returns passed-with-info', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,
        pageExperience: Promise.resolve({
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
      },
      Promise.resolve(['one-more', ...fixedRecommendations])
    );
    expect(statusId).toBe('passed-with-info');
  });

  it('returns generic-error for linter error', async () => {
    const statusId = await getStatusId(
      {
        linter: Promise.reject(new Error('error')),
        mobileFriendliness: pendingPromise,
        pageExperience: pendingPromise,
      },
      pendingPromise
    );
    expect(statusId).toBe('generic-error');
  });

  it('returns cwv-error for page experience error', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: passedMobileFriendlinessPromise,

        pageExperience: Promise.resolve({error: new Error('error')}),
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('cwv-error');
  });

  it('returns api-error for mobile friendliness error', async () => {
    const statusId = await getStatusId(
      {
        linter: passedLinterPromise,
        mobileFriendliness: Promise.resolve({error: new Error('error')}),
        pageExperience: Promise.resolve({
          pageExperience: {},
        }),
      },
      Promise.resolve(fixedRecommendations)
    );
    expect(statusId).toBe('api-error');
  });
});
