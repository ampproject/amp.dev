import getStatusId from './statusBanner.js';

const pendingPromise = new Promise(() => {});

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
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isValid: true,
      }),
      pendingPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for safe browsing error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      Promise.reject(new Error('error')),
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isValid: true,
      }),
      pendingPromise
    );
    expect(statusId).toBe('api-error');
  });

  it('returns api-error for mobile friendliness error', async () => {
    const statusId = await getStatusId(
      pendingPromise,
      pendingPromise,
      pendingPromise,
      Promise.resolve({
        isLoaded: true,
        isAmp: true,
        isValid: true,
      }),
      Promise.reject(new Error('error'))
    );
    expect(statusId).toBe('api-error');
  });
});
