/**
 * @jest-environment jsdom
 */

import PageExperienceCheck from './PageExperienceCheck.js';

describe('Page experience check', () => {
  const PAGE_URL = 'https://amp.dev/'
  const pageExperienceCheck = new PageExperienceCheck();

  test('fails for empty URL', async () => {
    await expect(pageExperienceCheck.run()).rejects.toThrow();
  });

  test('create report data for url', async () => {
    try {
      const pxCheck = await pageExperienceCheck.run(PAGE_URL);
    } catch(e) {
      console.log('error', e);
    }

    expect({}).toBe({
      test: 'jiefj'
    });
  });
});
