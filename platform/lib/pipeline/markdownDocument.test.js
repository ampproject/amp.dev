const MarkdownDocument = require('./markdownDocument.js');

test('Test frontmatter extraction', (done) => {
  const doc = new MarkdownDocument(
    '/docs/amp-test-v0.1.md',

    '---\n' +
      '$category: media\n' +
      'formats:\n' +
      '  - websites\n' +
      '  - email\n' +
      '  - ads\n' +
      '  - stories\n' +
      'teaser:\n' +
      '  text: Teaser text.\n' +
      '---\n' +
      '\n' +
      '# amp-test\n'
  );

  expect(doc.formats).toEqual(
    expect.arrayContaining(['websites', 'email', 'ads', 'stories'])
  );
  expect(doc.category).toBe('media');
  expect(doc.teaser.text).toBe('Teaser text.');

  expect(doc.contents.trim()).toBe('# amp-test');

  done();
});

test('Test frontmatter formats normalization', (done) => {
  const doc = new MarkdownDocument(
    '/docs/amp-test-v0.1.md',

    '---\n' +
      '$category: media\n' +
      'formats:\n' +
      '  - websites\n' +
      '  - emails\n' +
      '  - ads\n' +
      '  - stories\n' +
      'teaser:\n' +
      '  text: Teaser text.\n' +
      '---\n' +
      '\n' +
      '# amp-test\n'
  );

  expect(doc.formats).toEqual(
    expect.arrayContaining(['websites', 'email', 'ads', 'stories'])
  );

  done();
});

test('Test teaser text extraction', (done) => {
  const teaserText = MarkdownDocument.extractTeaserText(
    '<!--\n' +
      'Copyright notice\n' +
      '-->\n' +
      '\n' +
      '\n' +
      '# amp-test\n' +
      'Teaser text.\n' +
      '\n' +
      'Lorem ipsum dolor sit amet.\n' +
      '## Section\n' +
      'Lorem ipsum dolor sit amet.'
  );
  expect(teaserText).toBe('Teaser text.');

  done();
});

test('Test escape nunjucks tags', (done) => {
  const result = MarkdownDocument.escapeNunjucksTags(
    '<pre>\n' +
      "var href = location.href.replace(/?[^#]+/, '');\n" +
      'history.replaceState(null, null, href);\n' +
      '</pre>\n'
  );

  expect(result).toBe(
    '<pre>\n' +
      "var href = location.href.replace(/?[^{{'[% raw %]'}}#]{{'{% endraw %}'}}+/, '');\n" +
      'history.replaceState(null, null, href);\n' +
      '</pre>\n'
  );
  done();
});

test('Test escape mustache tags', (done) => {
  const result = MarkdownDocument.escapeMustacheTags(
    'The [`link`]({{notincode}}) test `code`.\n' +
      '```html\n' +
      '<template type="amp-mustache">\n' +
      '  <amp-img alt="{{foo}} {%raw%}{{bar}}{%endraw%} {{baz}}"></amp-img>\n' +
      '</template>' +
      '```\n' +
      'Known jinja2 expression `{{server_for_email}}`.\n' +
      '[sourcecode:css att="value"]\n' +
      '  {{foo}}\n' +
      '[/sourcecode]\n' +
      'Test no raw `{{`\n' +
      'Test raw outside {% raw %}`{{`{% endraw %}\n' +
      'Test raw inside `{% raw %}{{{% endraw %}`'
  );

  expect(result).toBe(
    'The [`link`]({{notincode}}) test `code`.\n' +
      '```html\n' +
      '<template type="amp-mustache">\n' +
      '  <amp-img alt="{% raw %}{{foo}}{% endraw %} ' +
      '{%raw%}{{bar}}{%endraw%} {% raw %}{{baz}}{% endraw %}"></amp-img>\n' +
      '</template>' +
      '```\n' +
      'Known jinja2 expression `{{server_for_email}}`.\n' +
      '[sourcecode:css att="value"]\n' +
      '  {% raw %}{{foo}}{% endraw %}\n' +
      '[/sourcecode]\n' +
      'Test no raw `{% raw %}{{{% endraw %}`\n' +
      'Test raw outside {% raw %}`{{`{% endraw %}\n' +
      'Test raw inside `{% raw %}{{{% endraw %}`'
  );

  done();
});

test('Test escape mustache tags', (done) => {
  const doc = new MarkdownDocument(
    '/tmp/test.md',
    '---\n' +
      'title: Title.\n' +
      'teaser:\n' +
      '  text: Teaser text.\n' +
      '---\n' +
      `[text](../link/file#anchor)
      [text](#anchor)
      [sourcecode type="html"]<a href="../source/link.html">text</a>[/sourcecode]
      <a href="#anchor">text</a>
      \`<a href="...">text</a>\`
      <a href="mailto:test@test.test">text</a>
      <a href="link">text</a>
      <a class="link" href = "../rel/link">text</a>`
  );
  doc.rewriteRelativePaths('http://test.de/test');

  expect(doc.contents).toBe(`[text](http://test.de/test/../link/file#anchor)
      [text](#anchor)
      [sourcecode type="html"]<a href="../source/link.html">text</a>[/sourcecode]
      <a href="#anchor">text</a>
      \`<a href="...">text</a>\`
      <a href="mailto:test@test.test">text</a>
      <a href="http://test.de/test/link">text</a>
      <a class="link" href = "http://test.de/test/../rel/link">text</a>`);

  done();
});

test('Test anchor generation', (done) => {
  const doc = new MarkdownDocument(
    '/tmp/test.md',
    '---\n' +
      'title: Title.\n' +
      'teaser:\n' +
      '  text: Teaser text.\n' +
      '---\n' +
      '# TestOne\n' +
      '# test two\n' +
      'paragraph\n' +
      '## test h2\n' +
      '### test h3\n' +
      '#no headline\n' +
      '# test anchor <a name="existing"></a>\n' +
      '## test anchor\n' +
      '# with [link](#anchor)\n' +
      '# test `<code>` &lt;html&gt;<a>foo</a>'
  );
  doc.addExplicitAnchors();

  expect(doc.contents).toBe(
    '# TestOne <a name="testone"></a>\n' +
      '# test two <a name="test-two"></a>\n' +
      'paragraph\n' +
      '## test h2 <a name="test-h2"></a>\n' +
      '### test h3 <a name="test-h3"></a>\n' +
      '#no headline\n' +
      '# test anchor <a name="existing"></a>\n' +
      '## test anchor <a name="test-anchor-1"></a>\n' +
      '# with [link](#anchor) <a name="with-link"></a>\n' +
      '# test `<code>` &lt;html&gt;<a>foo</a> <a name="test-code-htmlfoo"></a>'
  );

  done();
});
