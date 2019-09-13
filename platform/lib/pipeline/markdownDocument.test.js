const MarkdownDocument = require('./markdownDocument.js');

test('Test escape nunjucks tags', async (done) => {
  const result = MarkdownDocument.escapeNunjucksTags(
      '<pre>\n' +
      'var href = location.href.replace(/\?[^#]+/, \'\');\n' +
      'history.replaceState(null, null, href);\n' +
      '</pre>\n');

  expect(result).toBe(
      '<pre>\n' +
      'var href = location.href.replace(/\?[^{{\'[% raw %]\'}}#]{{\'{% endraw %}\'}}+/, \'\');\n' +
      'history.replaceState(null, null, href);\n' +
      '</pre>\n');
  done();
});

test('Test escape mustache tags', async (done) => {
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
      'Test raw outside {% raw %}`{{`{% endraw %}\n'+
      'Test raw inside `{% raw %}{{{% endraw %}`');

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


test('Test escape mustache tags', async (done) => {
  const doc = new MarkdownDocument('/tmp/test.md',
      `[text](../link/file#anchor)
      [text](#anchor)
      [sourcecode type="html"]<a href="../source/link.html">text</a>[/sourcecode]
      <a href="#anchor">text</a>
      \`<a href="...">text</a>\`
      <a href="mailto:test@test.test">text</a>
      <a href="link">text</a>
      <a class="link" href = "../rel/link">text</a>`);
  doc.rewriteRelativePaths('http://test.de/test');

  expect(doc.contents).toBe(`[text](http://test.de/test/../link/file#anchor)
      [text](#anchor)
      [sourcecode type="html"]<a href="../source/link.html">text</a>[/sourcecode]
      <a href="#anchor">text</a>
      \`<a href="...">text</a>\`
      <a href="mailto:test@test.test">text</a>
      <a href="http://test.de/test/link">text</a>
      <a class="link" href = "http://test.de/test/../rel/link">text</a>`
  );

  done();
});
