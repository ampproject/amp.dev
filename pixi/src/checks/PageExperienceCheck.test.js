/**
 * @jest-environment jsdom
 */

const { PageExperienceCheck } = require('./PageExperienceCheck.js');

describe('bla', () => {
  beforeEach(() => {
    console.log(PageExperienceCheck);
    const testCheck = new PageExperienceCheck();
  });

  test('testMethod', () => {
    expect('testFunc').toBe('testFunc');
  });
});
