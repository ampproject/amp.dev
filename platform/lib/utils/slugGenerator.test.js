const SlugGenerator = require('./slugGenerator.js');

test('Test anchor generation', () => {
  const slugGenerator = new SlugGenerator();
  expect(slugGenerator.getSlug('')).toBe('');
  expect(slugGenerator.getSlug('TestOne')).toBe('testone');
  expect(slugGenerator.getSlug('test two two two two two')).toBe('test-two-two-two-two-two');
  expect(slugGenerator.getSlug('test[{}](three)')).toBe('testthree');
  expect(slugGenerator.getSlug('test four')).toBe('test-four');
  expect(slugGenerator.getSlug('test four')).toBe('test-four-1');
  expect(slugGenerator.getSlug('test four')).toBe('test-four-2');
  expect(slugGenerator.getSlug('test four-1')).toBe('test-four-1-1');
  expect(slugGenerator.getSlug('test-five-1')).toBe('test-five-1');
  expect(slugGenerator.getSlug('test-five')).toBe('test-five');
  expect(slugGenerator.getSlug('test-five')).toBe('test-five-2');
  expect(slugGenerator.getSlug('übung  6')).toBe('übung--6');
  expect(slugGenerator.getSlug(' test_7 ')).toBe('test_7');
});
