/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('DocumentParser', () => {
  const DocumentParser = require('./DocumentParser').DocumentParser;
  const CodeSection = require('./CodeSection');

  const HEAD = '<head>';
  const HEAD_END = '</head>';
  const BODY = '<body>';
  const BODY_END = '</body>';
  const TAG = '<h1>hello</h1>';
  const EMPTY_LINE = '';
  const WRAPPED_TAG = `<h1
    class="test">
    hello
    </h1>`;
  const TITLE = '  <title>hello</title>';
  const ANOTHER_TAG = '<h1>world</h1>';
  const NESTED_TAG = `<div>
  <h1>hello</h1>
</div>`.trim();
  const NESTED_SAME_TAG = `<div>
  <div>hello</div>
</div>`.trim();
  const COMMENT = '<!--comment-->';
  const COMMENT_WITH_HEADING = '<!--\n   # heading\n\ncomment-->';
  const HINT = '<!--~hint~-->';
  const LINK = ' <link href="Hello World" />';
  const META = ' <meta href="Hello World" />';
  const BASE = ' <base href="/">';
  const DOCUMENT_METADATA = `<!---
    experiments:
      - amp-accordion
  --->`;
  const DOCUMENT_METADATA_INVALID = `<!---
    experiment: true,
    component: amp-accordion
  }}--->`;

  function newSection(comment, doc, preview, isFirstSection, isLastSection) {
    const section = new CodeSection(comment, doc, preview);
    section.isLastSection = isLastSection;
    section.isFirstSection = isFirstSection;
    section.id = sectionCounter++;
    return section;
  }

  function parse(...args) {
    let lines = [];
    for (let i = 0; i < args.length; i++) {
      lines = lines.concat(args[i].split('\n'));
    }
    const parser = new DocumentParser(lines);
    parser.execute();
    return parser.document;
  }

  let sectionCounter;

  beforeEach(() => {
    sectionCounter = 0;
  });

  it('adds code', () => {
    expect(parse(TAG).sections[0]).toEqual(
      newSection('', TAG + '\n', '', true, true)
    );
  });

  it('adds comments', () => {
    expect(parse(COMMENT, TAG).sections).toEqual([
      newSection('comment\n', TAG + '\n', '', true, true),
    ]);
  });
  it('strips whitespace before headings', () => {
    expect(parse(COMMENT_WITH_HEADING, TAG).sections[0].doc).toEqual(
      '\n# heading\n\ncomment\n'
    );
  });

  it('adds hint', () => {
    const expected = newSection(
      '',
      `<!--START_HINT_0-->\n${TAG}\n<!--END_HINT-->\n`,
      '',
      true,
      true
    );
    expected.hints = ['hint'];

    expect(parse(HINT, TAG).sections).toEqual([expected]);
  });

  it('supports wrapped attributes', () => {
    const sections = parse(COMMENT, WRAPPED_TAG).sections;
    expect(sections[0].code).toEqual(WRAPPED_TAG + '\n');
  });

  describe('example spans', () => {
    it('element after comment', () => {
      expect(parse(COMMENT, TAG, ANOTHER_TAG).sections).toEqual([
        newSection('comment\n', TAG + '\n', '', true, false),
        newSection('', ANOTHER_TAG + '\n', '', false, true),
      ]);
    });

    it('nested elements after comment', () => {
      expect(parse(COMMENT, NESTED_TAG, ANOTHER_TAG).sections).toEqual([
        newSection('comment\n', NESTED_TAG + '\n', '', true, false),
        newSection('', ANOTHER_TAG + '\n', '', false, true),
      ]);
    });

    it('nested elements of same type after comment', () => {
      expect(parse(COMMENT, NESTED_SAME_TAG, ANOTHER_TAG).sections).toEqual([
        newSection('comment\n', NESTED_SAME_TAG + '\n', '', true, false),
        newSection('', ANOTHER_TAG + '\n', '', false, true),
      ]);
    });

    it('ignores empty lines', () => {
      expect(parse(COMMENT, EMPTY_LINE, TAG, ANOTHER_TAG).sections).toEqual([
        newSection(
          'comment\n',
          EMPTY_LINE + '\n' + TAG + '\n',
          '',
          true,
          false
        ),
        newSection('', ANOTHER_TAG + '\n', '', false, true),
      ]);
    });
    it('resets current tag after tag end', () => {
      const doc = parse(HEAD, COMMENT, META, LINK, HEAD_END);
      expect(doc.sections.length).toEqual(3);
    });
  });

  it('adds content in body to preview', () => {
    const section = parse(HEAD, HEAD_END, BODY, TAG, BODY_END).sections[0];
    expect(section.preview).toEqual(TAG + '\n');
  });

  it('closes section before ending the body', () => {
    const sections = parse(HEAD, HEAD_END, BODY, TAG, BODY_END).sections;
    expect(sections.length).toEqual(2);
  });

  it('marks sections in body', () => {
    const sections = parse(
      HEAD,
      HEAD_END,
      BODY,
      COMMENT,
      TAG,
      BODY_END
    ).sections;
    expect(sections[0].inBody).toBe(false);
    expect(sections[1].inBody).toBe(true);
  });

  it('adds head content to document', () => {
    const doc = parse(HEAD, ANOTHER_TAG, HEAD_END, BODY, TAG, BODY_END);
    expect(doc.head).toEqual(ANOTHER_TAG + '\n');
  });

  describe('single line tags', () => {
    it('link', () => {
      const doc = parse(HEAD, COMMENT, LINK, TITLE, HEAD_END);
      expect(doc.sections.length).toEqual(3);
    });
    it('meta', () => {
      const doc = parse(HEAD, COMMENT, META, TITLE, HEAD_END);
      expect(doc.sections.length).toEqual(3);
    });
  });

  describe('ends void tags automatically', () => {
    it('base', () => {
      const doc = parse(HEAD, COMMENT, BASE, TITLE, HEAD_END);
      expect(doc.sections.length).toEqual(3);
    });
  });

  it('adds title to document', () => {
    const doc = parse(HEAD, TITLE, HEAD_END);
    expect(doc.title).toEqual('hello');
  });

  describe('adds metadata to document', () => {
    it('after comment', () => {
      const doc = parse(
        COMMENT,
        DOCUMENT_METADATA,
        HEAD,
        TITLE,
        HEAD_END,
        BODY,
        COMMENT,
        BODY_END
      );
      expect(doc.metadata.experiments).toEqual(['amp-accordion']);
      expect(doc.sections.length).toEqual(3);
    });
    it('invalid metadata', () => {
      expect(() => {
        parse(
          COMMENT,
          DOCUMENT_METADATA_INVALID,
          HEAD,
          TITLE,
          HEAD_END,
          BODY,
          COMMENT,
          BODY_END
        );
      }).toThrowError(/line 5/);
    });
  });

  describe('xml tag parsing', () => {
    let parser;
    beforeEach(() => {
      parser = new DocumentParser('');
    });

    it('start tag', () => {
      expect(parser.extractTag('<div>')).toEqual('div');
      expect(parser.extractTag('  <div>')).toEqual('div');
      expect(parser.extractTag('</div>')).toEqual('');
      expect(parser.extractTag('<div class="test">')).toEqual('div');
      expect(parser.extractTag('<')).toEqual('');
      expect(parser.extractTag('< ')).toEqual('');
      expect(parser.extractTag('div')).toEqual('');
      expect(parser.extractTag('<!--')).toEqual('');
      expect(parser.extractTag('<!---{')).toEqual('');
      expect(parser.extractTag('<!--- -->')).toEqual('');
      expect(parser.extractTag('  <h4>Hello World</h4>')).toEqual('h4');
      expect(parser.extractTag('<amp-ad width="300"')).toEqual('amp-ad');
      expect(parser.extractTag('<input type="text">')).toEqual('input');
    });

    it('end tag', () => {
      expect(parser.extractEndTag('<div>')).toEqual('');
      expect(parser.extractEndTag('  <div>')).toEqual('');
      expect(parser.extractEndTag('</div>')).toEqual('div');
      expect(parser.extractEndTag('   </div>')).toEqual('div');
      expect(parser.extractEndTag('<div class="test">')).toEqual('');
      expect(parser.extractEndTag('  <h4>Hello World</h4>')).toEqual('h4');
    });
  });

  describe('extracts body tag', () => {
    it('no body', () => {
      expect(parse('something').body).toEqual('');
    });
    it('body only', () => {
      expect(parse(BODY).body).toEqual(BODY);
    });
    it('body with attributes', () => {
      const bodyWithAttributes = '<body attr="hello" attr2="world">';
      expect(parse(bodyWithAttributes).body).toEqual(bodyWithAttributes);
    });
    it('incomplete body', () => {
      expect(parse('something').body).toEqual('');
    });
  });

  describe('parses lang', () => {
    it('defaults to en', () => {
      const document = parse('<html>');
      expect(document.lang).toBe('en');
    });
    it('uses lang attr otherwise', () => {
      const document = parse('<html ⚡ lang="de">');
      expect(document.lang).toBe('de');
    });
    it('handles comments before', () => {
      const document = parse('<!-- -->', '<html ⚡ lang="de">');
      expect(document.lang).toBe('de');
    });
  });

  describe('parses stories', () => {
    it('sets isAmpStory to true', () => {
      const document = parse(
        '<body>',
        '<amp-story standalone>',
        '</amp-story>',
        '</body>'
      );
      expect(document.isAmpStory).toBe(true);
    });
    it('sets story id', () => {
      const document = parse(
        '<body>',
        '<amp-story standalone>',
        '<amp-story-page id="story-id">',
        '</amp-story-page>',
        '</amp-story>',
        '</body>'
      );
      expect(document.sections[0].storyPageId).toBe('story-id');
    });
  });

  describe('parses runtime', () => {
    it('amp-story', () => {
      const document = parse(
        '<html ⚡>',
        '<body>',
        '<amp-story standalone>',
        '</amp-story>',
        '</body>'
      );
      expect(document.isAmpStory).toBe(true);
      expect(document.isAmpWeb).toBe(true);
      expect(document.isAmpEmail).toBe(false);
      expect(document.isAmpAds).toBe(false);
    });
    it('amp-mail', () => {
      const document = parse(
        '<html ⚡4email data-css-strict>',
        '<body>',
        '</body>'
      );
      expect(document.isAmpStory).toBe(false);
      expect(document.isAmpWeb).toBe(false);
      expect(document.isAmpEmail).toBe(true);
      expect(document.isAmpAds).toBe(false);
    });
    it('amp-ad', () => {
      const document = parse('<html ⚡4ads>', '<body>', '</body>');
      expect(document.isAmpStory).toBe(false);
      expect(document.isAmpWeb).toBe(false);
      expect(document.isAmpEmail).toBe(false);
      expect(document.isAmpAds).toBe(true);
    });
    it('amp-web', () => {
      const document = parse('<html ⚡>', '<body>', '</body>');
      expect(document.isAmpStory).toBe(false);
      expect(document.isAmpWeb).toBe(true);
      expect(document.isAmpEmail).toBe(false);
      expect(document.isAmpAds).toBe(false);
    });
  });
});
