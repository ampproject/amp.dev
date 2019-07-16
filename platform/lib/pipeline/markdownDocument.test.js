const MarkdownDocument = require('./markdownDocument.js');

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

test('Test escape SSR tags', async (done) => {
  const result = MarkdownDocument.escapeSsrTags(
      '[sourcecode:javascript]\n' +
      'eventName:targetId[.methodName[(arg1=value, arg2=value)]]\n' +
      '[/sourcecode]\n' +
      '\n' +
      'Note: Some email clients[[1]](https://openradar.appspot.com/radar?id=6054696888303616) will only render the last MIME part\n'
  );

  expect(result).toBe(
      '[sourcecode:javascript]\n' +
    'eventName:targetId[.methodName[(arg1=value, arg2=value)]﻿]\n' +
    '[/sourcecode]\n' +
    '\n' +
    'Note: Some email clients[﻿[1]﻿](https://openradar.appspot.com/radar?id=6054696888303616) will only render the last MIME part\n'
  );

  done();
});
