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

describe('CodeSection', () => {
  const CodeSection = require('./CodeSection');

  let section;

  beforeEach(() => {
    section = new CodeSection();
  });

  describe('equal to', () => {
    it('to same section', () => {
      const section1 = new CodeSection('a', 'b', 'c');
      const section2 = new CodeSection('a', 'b', 'c');
      expect(section1).toEqual(section2);
    });

    it('to different section', () => {
      const section1 = new CodeSection('a', 'b', 'c');
      const section2 = new CodeSection('c', 'd', 'e');
      expect(section1).not.toEqual(section2);
    });
  });

  describe('appending docs', () => {
    it('adds new docs', () => {
      section.appendDoc('hello');
      section.appendDoc('world');
      expect(section.doc).toEqual('hello\nworld\n');
    });

    it('removes comment tags ', () => {
      section.appendDoc('<!--hello');
      section.appendDoc('world-->');
      expect(section.doc).toEqual('hello\nworld\n');
    });

    it('removes indentation', () => {
      section.appendDoc('<!--');
      section.appendDoc('  hello');
      section.appendDoc('-->');
      expect(section.doc).toEqual('\nhello\n\n');
    });

    it('normalizes indentation', () => {
      section.appendDoc('  <!--');
      section.appendDoc('    hello');
      section.appendDoc('      world');
      section.appendDoc('  -->');
      expect(section.doc).toEqual('\nhello\n  world\n\n');
    });

    it('handles wrong indentation', () => {
      section.appendDoc('  <!--');
      section.appendDoc(' x  hello');
      section.appendDoc('      world');
      section.appendDoc('  -->');
      expect(section.doc).toEqual(' \nx  hello\n     world\n \n');
    });

    it('keeps empty lines', () => {
      section.appendDoc('  <!--');
      section.appendDoc('  hello');
      section.appendDoc('\n');
      section.appendDoc('  world');
      section.appendDoc('  -->');
      expect(section.doc).toEqual('\nhello\n\n\nworld\n\n');
    });
  });
  describe('hide columns if code section', () => {
    /*
    it('is longer than 4 lines', function() {
      section.appendCode("line1");
      expect(section.hideColumns()).toEqual(false);
      section.appendCode("line2");
      expect(section.hideColumns()).toEqual(false);
      section.appendCode("line3");
      expect(section.hideColumns()).toEqual(false);
      section.appendCode("line4");
      expect(section.hideColumns()).toEqual(false);
      section.appendCode("line5");
      expect(section.hideColumns()).toEqual(true);
    });
    */
    it('has no doc', () => {
      section.appendDoc('some doc');
      section.appendCode('line1');
      section.appendCode('line2');
      section.appendCode('line3');
      section.appendCode('line4');
      section.appendCode('line5');
      expect(section.hideColumns()).toEqual(false);
    });
    it('is boilerplate', () => {
      section.appendCode('line1\n   <style amp-boilerplate> more\n code');
      expect(section.hideColumns()).toEqual(true);
    });
  });
  describe('removes uncorrectly escaped templates', () => {
    it('contains an escaped template', () => {
      expect(
        section.cleanUpCode('[[<span class="hljs-attr">.Disabled</span>]]')
      ).toEqual('[[ .Disabled]]');
    });
    it('contains an escaped template and spaces', () => {
      expect(
        section.cleanUpCode(
          '[[    <span class="hljs-attr">.Disabled    </span>]]'
        )
      ).toEqual('[[ .Disabled]]');
    });
    it('does not alter valid escaped templates', () => {
      expect(
        section.cleanUpCode('<span class="hljs-string">"[[.Timestamp]]"</span>')
      ).toEqual('<span class="hljs-string">"[[.Timestamp]]"</span>');
    });
    it('contains an escaped template with range clause', () => {
      expect(
        section.cleanUpCode(
          '[[<span class="hljs-attr">range</span><span class="hljs-attr">.BlogItems</span>]]'
        )
      ).toEqual('[[range .BlogItems]]');
    });
    it('contains an escaped template with if clause', () => {
      expect(
        section.cleanUpCode(
          '[[<span class="hljs-attr">if</span><span class="hljs-attr">.BlogItems</span>]]'
        )
      ).toEqual('[[if .BlogItems]]');
    });
    it('contains an escaped template with if clause and spaces', () => {
      expect(
        section.cleanUpCode(
          '[[   <span class="hljs-attr">if   </span><span class="hljs-attr">.BlogItems</span>   ]]'
        )
      ).toEqual('[[if .BlogItems]]');
    });
    it('contains an escaped template with end clause', () => {
      expect(
        section.cleanUpCode('[[<span class="hljs-attr">end</span>]]')
      ).toEqual('[[end ]]');
    });
  });

  describe('parses outline', () => {
    it('has no headings by default', () => {
      section.appendDoc('Some Doc');
      expect(section.headings).toEqual([]);
    });
    it('ignores # in text', () => {
      section.appendDoc('asdfsafd ### Some Doc');
      expect(section.headings).toEqual([]);
    });
    it('adds single heading', () => {
      section.appendDoc('##Some Doc');
      expect(section.headings).toEqual([
        {
          id: 'some-doc',
          name: 'Some Doc',
        },
      ]);
    });
    it('removes whitespace heading', () => {
      section.appendDoc('##  Some Doc   ');
      expect(section.headings).toEqual([
        {
          id: 'some-doc',
          name: 'Some Doc',
        },
      ]);
    });
    it('adds multiple headings', () => {
      section.appendDoc('##Some Doc');
      section.appendDoc('##Another Doc');
      expect(section.headings).toEqual([
        {
          id: 'some-doc',
          name: 'Some Doc',
        },
        {
          id: 'another-doc',
          name: 'Another Doc',
        },
      ]);
    });
  });

  describe('strips leading whitespace from codesections', () => {
    it('keeps formatting without leading whitespace', () => {
      section.appendCode('<h1>Hello</h1>');
      expect(section.code).toEqual('<h1>Hello</h1>\n');
    });
    it('strips leading whitespace', () => {
      section.appendCode('    <h1>Hello</h1>');
      expect(section.code).toEqual('<h1>Hello</h1>\n');
    });
    it('strips leading whitespace from multiple lines', () => {
      section.appendCode('  <h1>Hello</h1>');
      section.appendCode('    <h1>Hello</h1>');
      section.appendCode('  <h1>Hello</h1>');
      expect(section.code).toEqual(
        '<h1>Hello</h1>\n' + '  <h1>Hello</h1>\n' + '<h1>Hello</h1>\n'
      );
    });
    it('strips only whitespace', () => {
      section.appendCode('  <h1>Hello</h1>');
      section.appendCode('xx<h1>Hello</h1>');
      expect(section.code).toEqual('<h1>Hello</h1>\n' + 'xx<h1>Hello</h1>\n');
    });
  });
  describe('wrapper divs', () => {
    it('strips enclosing div', () => {
      section.appendCode('<div>');
      section.appendCode('<h1>Hello</h1>');
      section.appendCode('</div>');
      expect(section.escapedCode()).not.toContain('div');
    });
    it('strips enclosing div with whitespace', () => {
      section.appendCode('  <div>   ');
      section.appendCode('<h1>Hello</h1>');
      section.appendCode('   </div>   ');
      expect(section.escapedCode()).not.toContain('div');
    });
    it('ignores divs with classes', () => {
      section.appendCode('<div class="test">');
      section.appendCode('Hello');
      section.appendCode('</div>');
      expect(section.escapedCode()).toContain('div');
    });
    it('ignores divs with ids', () => {
      section.appendCode('<div id="test">');
      section.appendCode('Hello');
      section.appendCode('</div>');
      expect(section.escapedCode()).toContain('div');
    });
  });
});
