const ComponentReferenceDocument = require('./componentReferenceDocument.js');

test('Test first headline removal', (done) => {
  const doc = new ComponentReferenceDocument(
    '/amp-dev/pages/content/amp-dev/documentation/components/reference/amp-test-v0.1.md',

    '# amp-test\n' +
      '\n' +
      'Lorem ipsum dolor sit amet.\n' +
      '# Section\n' +
      'Lorem ipsum dolor sit amet.',

    {
      name: 'amp-test',
      version: '0.1',
      versions: ['0.1'],
      githubPath: 'src/builtins/amp-test.md',
    }
  );

  expect(doc.contents).toBe(
    '\n' +
      '\n' +
      'Lorem ipsum dolor sit amet.\n' +
      '# Section\n' +
      'Lorem ipsum dolor sit amet.'
  );

  done();
});
