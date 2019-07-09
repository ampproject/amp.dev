const MarkdownDocument = require('./markdownDocument.js');

test('Test escape mustache tags', () => {
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
});

test('Test add markdown attribute to tables', () => {
  const content = MarkdownDocument.enableMarkdownInHtmlTables(`
  <table><tr><td>table no attribs</td></tr></table>
  <table width="100"><tr><td>table with attribs</td></tr></table>
  <table markdown><tr><td>table with markdown 1</td></tr></table>
  <table markdown="1"><tr><td>table with markdown 2</td></tr></table>
  [sourcecode:html]
  <table><tr><td>table in code</td></tr></table>
  [/sourcecode]
  Inline \`<table>\`
  `);

  expect(content.trim()).toBe(`<table markdown="1"><tr><td>table no attribs</td></tr></table>
  <table markdown="1" width="100"><tr><td>table with attribs</td></tr></table>
  <table markdown><tr><td>table with markdown 1</td></tr></table>
  <table markdown="1"><tr><td>table with markdown 2</td></tr></table>
  [sourcecode:html]
  <table><tr><td>table in code</td></tr></table>
  [/sourcecode]
  Inline \`<table>\``);
});
