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

test('Test anchor generation', async (done) => {
  const doc = new MarkdownDocument('/tmp/test.md',
      '# TestOne\n' +
'# test two two two two two\n' +
'# test[{}](three)\n' +
'# test four\n' +
'# test four\n' +
'# test four\n' +
'# test four-1\n' +
'# test-five-1\n' +
'# test-five\n' +
'# test-five\n' +
'## übung  6\n' +
'### test_7 \n' +
'# test 8 <a name="test8"></a>');
  doc.addExplicitAnchors();

  expect(doc.contents).toBe(
      '# TestOne <a name="testone"></a>\n' +
'# test two two two two two <a name="test-two-two-two-two-two"></a>\n' +
'# test[{}](three) <a name="testthree"></a>\n' +
'# test four <a name="test-four"></a>\n' +
'# test four <a name="test-four-1"></a>\n' +
'# test four <a name="test-four-2"></a>\n' +
'# test four-1 <a name="test-four-1-1"></a>\n' +
'# test-five-1 <a name="test-five-1"></a>\n' +
'# test-five <a name="test-five"></a>\n' +
'# test-five <a name="test-five-2"></a>\n' +
'## übung  6 <a name="übung--6"></a>\n' +
'### test_7  <a name="test_7"></a>\n' +
'# test 8 <a name="test8"></a>');

  done();
});
