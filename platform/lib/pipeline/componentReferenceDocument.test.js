const ComponentReferenceDocument = require('./componentReferenceDocument.js');

test('Test intro table deletion', async done => {
  const doc = new ComponentReferenceDocument(
    '/amp-dev/pages/content/amp-dev/documentation/components/reference/amp-test-v0.1.md',

    '# amp-test\n' +
      '\n' +
      '<table>\n' +
      '  <tr>\n' +
      '    <td>Table 1 / Row 1 / Column 1</td>\n' +
      '    <td>Table 1 / Row 1 / Column 2</td>\n' +
      '  </tr>\n' +
      '  <tr>\n' +
      '    <td>Table 1 / Row 2 / Column 1</td>\n' +
      '    <td>Table 1 / Row 2 / Column 2</td>\n' +
      '  </tr>\n' +
      '</table>\n' +
      '\n' +
      '## Section\n' +
      'Teaser text.\n' +
      '\n' +
      '<table>\n' +
      '  <tr>\n' +
      '    <td>Table 2 / Row 1 / Column 1</td>\n' +
      '    <td>Table 2 / Row 1 / Column 2</td>\n' +
      '  </tr>\n' +
      '  <tr>\n' +
      '    <td>Table 2 / Row 2 / Column 1</td>\n' +
      '    <td>Table 2 / Row 2 / Column 2</td>\n' +
      '  </tr>\n' +
      '</table>',

    {
      name: 'amp-test',
      version: '0.1',
      versions: ['0.1'],
      githubPath: 'builtins/amp-test.md',
    }
  );

  expect(doc.contents).toEqual(expect.not.stringContaining('Table 1'));
  expect(doc.contents).toEqual(expect.stringContaining('Table 2'));
  done();
});

test('Test first headline removal', async done => {
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
      githubPath: 'builtins/amp-test.md',
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
