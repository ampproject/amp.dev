/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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

const log = require('@lib/utils/log')('Component Reference Linker');
const gulp = require('gulp');
const through = require('through2');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');

// Which documents to check for broken references
// eslint-disable-next-line max-len
const PAGES_SRC =
  POD_BASE_PATH +
  'content/amp-dev/documentation/guides-and-tutorials/develop/interactivity/remote-data.md';
const COMPONENTS_SRC =
  POD_BASE_PATH + 'content/amp-dev/documentation/components/';

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class ComponentReferenceLinker {
  constructor() {
    this._placeholders = {};
    this._codePlaceholders = {};
    this._tablePlaceholders = {};
  }

  async start() {
    log.start(`Inspecting documents in ${PAGES_SRC} ...`);

    return new Promise((resolve, reject) => {
      let stream = gulp.src(PAGES_SRC, {'read': true, 'base': './'});
      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          stream.push(this._link(doc));
          callback();
        })
      );

      stream.pipe(gulp.dest('./'));
      stream.on('end', () => {
        log.complete('Linked all component references!');

        resolve();
      });
    });
  }

  _link(doc) {
    let content = doc.contents.toString();

    // Cut out code Examples to avoid errors in replacement process
    // eslint-disable-next-line max-len
    const codeExamples = content.match(
      /(<(amp-[^\s]+)(?:\s[^>]*)?>([^`]*)?<\/\2>|```html(.*?)*?```|```css(.*?)*?```|Preview:(.*?)*?<\/amp-\w*(-\w*)*\>|<script(.*?)><\/script>|<!--([^<]*)?-->|\[sourcecode:\w*](.*?)*?\[\/sourcecode]|<pre>(.*?)\/pre>)/gms
    );
    if (codeExamples !== null) {
      for (let i = 0; i < codeExamples.length; i++) {
        const codeExample = codeExamples[i];
        content = content.replace(
          codeExample,
          this._createCodePlaceholder(codeExample)
        );
      }
    }

    // Check html tables for amp-component names and replace with html placeholder
    const tableExamples = [
      content.match(
        /\<a href=".*?\/amp-\w*?(-\w*?)*.*?">.*?amp-\w*?(-\w*?)*?.*?<\/a>/gm
      ),
      content.match(/\<code>.*?amp-\w*?(-\w*)*.*?\/code>/gm),
    ];
    for (let i = 0; i < tableExamples.length; i++) {
      const results = Array.from(new Set(tableExamples[i]));
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const component = result.match(/amp-\w*(-\w*)*/g)[0];
        if (this._componentExist(component) === true) {
          while (content.includes(result)) {
            const placeholder = this._createTablePlaceholder(component);
            content = content.replace(result, placeholder);
          }
        }
      }
    }

    // Check document for amp-components and replace with md placeholder
    /* eslint-disable max-len */
    const cases = [
      content.match(
        /\[amp-\w*(-\w*)*\]\(\/docs\/reference\/components\/\w*-\w*(-\w*)*\.html\)/gm
      ),
      content.match(
        /\[`amp-\w*(-\w*)*\`]\(\/docs\/reference\/components\/\w*-\w*(-\w*)*\.html\)/gm
      ),
      content.match(
        /\[`<amp-\w*(-\w*)*\>`]\(\/docs\/reference\/components\/\w*-\w*(-\w*)*\.html(.*)?\)/gm
      ),
      content.match(
        /\[amp-\w*(-\w*)*]\(https:\/\/www.ampproject.org\/docs\/reference\/components\/\w*-\w*(-\w*)*\)/gm
      ),
      content.match(
        /\[\`amp-\w*(-\w*)*\`]\(https:\/\/www.ampproject.org\/docs\/reference\/components\/\w*-\w*(-\w*)*\)/gm
      ),
      content.match(/\[\`amp-\w*(-\w*)*\`]\(https:\/\/github.*\.md\)/gm),
      content.match(/\[amp-\w*(-\w*)*.*]\(.*\)/gm),
      content.match(/\[(.*)?amp-\w*(-\w*)*.*]\(.*\)/gm),
      content.match(/\`<amp-\w*(-\w*)*>`/gm),
      content.match(/\`amp-\w*(-\w*)*`/gm),
      content.match(/amp-\w*(-\w*)*./gm),
    ];
    /* eslint-enable max-len */
    for (let i = 0; i < cases.length; i++) {
      const results = Array.from(new Set(cases[i]));
      log.info({results});

      for (let j = 0; j < results.length; j++) {
        const result = results[j];

        // Continue when component name is found in existing path
        // eslint-disable-next-line max-len
        if (
          result.slice(-1) === '/' ||
          result.slice(-1) === '.' ||
          result.slice(-1) === '>'
        ) {
          continue;
        } else {
          const component = result.match(/amp-\w*(-\w*)*/g)[0];
          const linkDescription = result.match(
            /(?<=\[)(.* )?amp-\w*(-\w*)*( .*)?(?=])/g
          );
          // eslint-disable-next-line max-len
          const description =
            linkDescription !== null
              ? linkDescription[0].replace(component, `\`${component}\``)
              : `\`${component}\``;
          if (this._componentExist(component) === true) {
            while (content.includes(result)) {
              // eslint-disable-next-line max-len
              const placeholder =
                i === cases.length - 1
                  ? this._createPlaceholder(component, description) + ' '
                  : this._createPlaceholder(component, description);
              content = content.replace(result, placeholder);
            }
          }
        }
      }
    }

    // Replace placeholders with component-path
    for (const placeholder of Object.keys(this._placeholders)) {
      while (content.includes(placeholder)) {
        content = content.replace(placeholder, this._placeholders[placeholder]);
      }
    }
    for (const placeholder of Object.keys(this._codePlaceholders)) {
      while (content.includes(codePlaceholder)) {
        content = content.replace(
          placeholder,
          this._codePlaceholders[placeholder]
        );
      }
    }
    for (const placeholder of Object.keys(this._tablePlaceholders)) {
      while (content.includes(placeholder)) {
        content = content.replace(
          placeholder,
          this._tablePlaceholders[placeholder]
        );
      }
    }

    doc.contents = Buffer.from(content);
    return doc;
  }

  _hash(str) {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest('base64');
  }

  _createPlaceholder(component, description) {
    const placeholder = `<!--${this._hash(description)}-->`;
    if (!this._placeholders[placeholder]) {
      this._placeholders[placeholder] = this._componentPath(
        component,
        description
      );
    }
    return placeholder;
  }

  _createCodePlaceholder(codeExample) {
    const codePlaceholder = `<!--${this._hash(codeExample)}-->`;
    if (!this._codePlaceholders[codePlaceholder]) {
      this._codePlaceholders[codePlaceholder] = codeExample;
    }
    return codePlaceholder;
  }

  _createTablePlaceholder(component) {
    const placeholder = `<!--${this._hash(component)}-->`;
    if (!this._tablePlaceholders[placeholder]) {
      this._tablePlaceholders[placeholder] =
        this._tableComponentPath(component);
    }
    return placeholder;
  }

  _componentPath(component) {
    // eslint-disable-next-line
    const path = `({{g.doc('/content/amp-dev/documentation/components/reference/${component}.md', locale=doc.locale).url.path}})`;
    return `[\`${component}\`]${path}`;
  }

  _tableComponentPath(component) {
    // eslint-disable-next-line
    const path = `{{g.doc('/content/amp-dev/documentation/components/reference/${component}.md', locale=doc.locale).url.path}}`;
    return `<a href="${path}"><code>${component}</code></a>`;
  }

  _componentExist(component) {
    const path = COMPONENTS_SRC + '/reference/' + component + '.md';
    if (fs.existsSync(path)) {
      return true;
    }
  }
}

// If not required, run directly
if (!module.parent) {
  const referenceLinker = new ComponentReferenceLinker();
  referenceLinker.start();
}

module.exports = ComponentReferenceLinker;
