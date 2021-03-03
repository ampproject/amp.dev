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

describe('Document', () => {
  const CANONICAL = '<link rel="canonical" href="https://ampbyexample.com/" >';
  const NON_CANONICAL = '<link href="https://ampbyexample.com/" >';

  const CodeSection = require('./CodeSection');
  const Document = require('./Document');

  let doc;

  beforeEach(() => {
    doc = new Document();
  });

  describe('description', () => {
    it('first section stripped of html tags', () => {
      expect(descriptionOf('hello world')).toBe('hello world');
    });
    it('is first sentence in first section', () => {
      expect(descriptionOf('hello world. next sentence.')).toBe('hello world.');
    });
    it('trims newlines', () => {
      expect(descriptionOf('hello\nworld. next sentence.')).toBe(
        'hello world.'
      );
    });
    it('sentences can span multiple lines', () => {
      expect(descriptionOf('hello\nworld. next sentence')).toBe('hello world.');
    });
    it('sentences can end at line break', () => {
      expect(descriptionOf('hello world.\nnext sentence.')).toBe(
        'hello world.'
      );
    });
    it('sentences can end at line break 2', () => {
      expect(descriptionOf('hello world.\r\nnext sentence.')).toBe(
        'hello world.'
      );
    });
    it('sentences can end at line break 3', () => {
      expect(descriptionOf('hello world.\n\nnext sentence.')).toBe(
        'hello world.'
      );
    });
    it('sentences cannot contain links', () => {
      expect(
        descriptionOf(
          'The <a href="https://example.com/amp-access.md">amp-access</a> component. Next sentence.'
        )
      ).toBe('The amp-access component.');
    });
    it('ignores headlines', () => {
      expect(descriptionOf('## Headline\nhello world\n')).toBe('hello world');
    });
    it('unescapes html', () => {
      expect(descriptionOf("don't")).toBe("don't");
    });
    it('empty if there are no sections', () => {
      expect(doc.description()).toBe('');
    });
    it('uses first section with docs', () => {
      const sectionWithoutDoc = new CodeSection();
      doc.addSection(sectionWithoutDoc);
      const sectionWithDoc = new CodeSection();
      sectionWithDoc.appendDoc('<!-- hello world -->');
      doc.addSection(sectionWithDoc);
      expect(doc.description()).toBe('hello world');
    });
    it('uses first section with paragraphs', () => {
      const sectionWithoutParagraph = new CodeSection();
      sectionWithoutParagraph.appendDoc('<!-- ## Headlline -->');
      doc.addSection(sectionWithoutParagraph);
      const sectionWithDoc = new CodeSection();
      sectionWithDoc.appendDoc('<!-- hello world -->');
      doc.addSection(sectionWithDoc);
      expect(doc.description()).toBe('hello world');
    });
  });

  describe('formats', () => {
    it('is determined automatically ', () => {
      doc.isAmpEmail = true;
      expect(doc.formats()).toEqual(['email']);
    });
    it('is extracted from metadata', () => {
      doc.isAmpEmail = true;
      doc.metadata.formats = ['websites', 'email'];
      expect(doc.formats()).toEqual(['websites', 'email']);
    });
  });

  describe('hasCanonical is', () => {
    it('true if head contains canonical link ', () => {
      doc.appendHead(CANONICAL);
      expect(doc.hasCanonical()).toEqual(true);
    });
    it("false if head doesn't include canonical link", () => {
      doc.appendHead(NON_CANONICAL);
      expect(doc.hasCanonical()).toEqual(false);
    });
  });

  describe('importsComponent is', () => {
    it('true if head imports component ', () => {
      doc.appendHead(
        '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
      );
      expect(doc.importsComponent('amp-analytics')).toEqual(true);
    });
    it("false if head doesn't include canonical link", () => {
      doc.appendHead(
        '<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
      );
      expect(doc.importsComponent('amp-accesss')).toEqual(false);
    });
  });

  describe('marks first section', () => {
    it('true', () => {
      const onlySection = new CodeSection();
      doc.addSection(onlySection);
      expect(onlySection.isFirstSection).toEqual(true);
    });
    it('false', () => {
      const firstSection = new CodeSection();
      const secondSection = new CodeSection();
      doc.addSection(firstSection);
      doc.addSection(secondSection);
      expect(secondSection.isFirstSection).toEqual(false);
    });
  });

  describe('marks last section', () => {
    it('true', () => {
      const onlySection = new CodeSection();
      doc.addSection(onlySection);
      expect(onlySection.isLastSection).toEqual(true);
    });
    it('false', () => {
      const firstSection = new CodeSection();
      const secondSection = new CodeSection();
      doc.addSection(firstSection);
      doc.addSection(secondSection);
      expect(firstSection.isLastSection).toEqual(false);
      expect(secondSection.isLastSection).toEqual(true);
    });
  });

  describe('parses outline', () => {});

  function descriptionOf(text) {
    const section = new CodeSection();
    section.appendDoc(`<!--\n${text}\n-->`);
    doc.addSection(section);
    return doc.description();
  }
});
