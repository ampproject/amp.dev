import getStatusId from './statusBanner.js';
import {fixedRecommendations} from './recommendations';

const pendingPromise = new Promise(() => {});

const passedLinterPromise = Promise.resolve({
  isLoaded: true,
  isAmp: true,
  isValid: true,
  usesHttps: true,
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
      }),
      pendingPromise
    );
    expect(statusId).toBe('no-amp');
  });

  it('returns invalid-amp', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isValid: false,
      }),
      pendingPromise
    );
    expect(statusId).toBe('invalid-amp');
  });

  it('returns cache-failed-no-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {isAllFast: true},
        pageExperienceCached: {isAllFast: false},
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-no-info');
  });

  it('returns cache-failed-with-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {isAllFast: true},
        pageExperienceCached: {isAllFast: false},
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('cache-failed-with-info');
  });

  it('returns origin-failed-no-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(fixedRecommendations),
      Promise.resolve({
        pageExperience: {isAllFast: false},
        pageExperienceCached: {isAllFast: true},
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('origin-failed-no-info');
  });

  it('returns origin-failed-with-info', async () => {
    const statusId = await getStatusId(
      Promise.resolve(['one-more', ...fixedRecommendations]),
      Promise.resolve({
        pageExperience: {isAllFast: false},
        pageExperienceCached: {isAllFast: true},
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
        pageExperience: {isAllFast: false},
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
        pageExperience: {isAllFast: true},
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
        pageExperience: {isAllFast: true},
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
        pageExperience: {isAllFast: true},
      }),
      passedSafeBrowsingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
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
        pageExperience: {isAllFast: false},
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
        pageExperience: {isAllFast: true},
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
        pageExperience: {isAllFast: true},
      }),
      passedSafeBrowsingPromise,
      passedLinterPromise,
      passedMobileFriendlinessPromise
    );
    expect(statusId).toBe('passed-with-info');
  });

  it('returns api-error for linter error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.reject(new Error('error')),
      pendingPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for page experience error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      Promise.reject(new Error('error')),
      pendingPromise,
      passedLinterPromise,
      pendingPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for safe browsing error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      Promise.reject(new Error('error')),
      passedLinterPromise,
      pendingPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for mobile friendliness error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      passedLinterPromise,
      Promise.reject(new Error('error'))
    );
    expect(statusId).toBe('api-error');
  });
});
