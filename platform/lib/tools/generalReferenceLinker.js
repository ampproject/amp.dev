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

const {Signale} = require('signale');
const gulp = require('gulp');
const through = require('through2');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');

// Which documents to check for broken references
/* eslint-disable max-len */
const PAGES_SRC =
  POD_BASE_PATH + 'content/amp-dev/documentation/guides-and-tutorials/**/*.md';
const COMPONENTS_SRC =
  POD_BASE_PATH + 'content/amp-dev/documentation/components';
const TUTORIAL_SRC =
  POD_BASE_PATH + 'content/amp-dev/documentation/guides-and-tutorials';
const EXAMPLE_SRC = POD_BASE_PATH + 'content/amp-dev/documentation/examples';
/* eslint-enable max-len */

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class ComponentReferenceLinker {
  constructor() {
    this._log = new Signale({
      'scope': 'Reference linker',
    });
    this._placeholders = {};
    this._missingReferences = [];
  }

  async start() {
    return new Promise((resolve, reject) => {
      let stream = gulp.src(PAGES_SRC, {'read': true, 'base': './'});
      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          stream.push(this._check(doc));
          callback();
        })
      );

      stream.pipe(gulp.dest('./'));
      stream.on('end', () => {
        // Write missing references in file
        let referenceText =
          'Missing references: ' + this._missingReferences.length;
        for (const reference of this._missingReferences) {
          referenceText = referenceText.concat(
            '\n\n',
            reference.document,
            '\n-> ',
            reference.result,
            '\n-> Type: ',
            reference.link.type,
            ' - Name: ',
            reference.link.name
          );
        }
        fs.writeFile(
          POD_BASE_PATH + 'content/missing.txt',
          referenceText,
          (err) => {
            if (err) throw err;
          }
        );

        this._log.complete('Linked all component references!');
        this._log.complete(
          'Saved ',
          this._missingReferences.length,
          ' missing references in content/missing.txt'
        );
        resolve();
      });
    });
  }

  /**
   * [_check linkText]
   * @param  {Vinyl} doc documentation page
   * @return {[type]}     [linkText]
   */
  _check(doc) {
    let content = doc.contents.toString();
    console.log();
    this._log.await('Inspecting doc:', doc.relative);

    const results = Array.from(
      new Set(content.match(/\[[^\]]*?]\((?!\{)(.*?)\)(?=(\s|\.|\,))/gm))
    );
    for (const result of results) {
      const link = this._linkType(result);
      if (link.type == null) {
        continue;
      }

      switch (link.type) {
        case 'example':
          content = this._handleFile(
            doc.relative,
            content,
            result,
            link,
            EXAMPLE_SRC
          );
          break;
        case 'componentOverview':
          content = this._handleFile(
            doc.relative,
            content,
            result,
            link,
            COMPONENTS_SRC
          );
          break;
        case 'exampleOverview':
          content = this._handleFile(
            doc.relative,
            content,
            result,
            link,
            EXAMPLE_SRC
          );
          break;
        case 'component':
          content = this._handleFile(
            doc.relative,
            content,
            result,
            link,
            COMPONENTS_SRC
          );
          break;
        case 'tutorial':
          content = this._handleFile(
            doc.relative,
            content,
            result,
            link,
            TUTORIAL_SRC
          );
          break;
        default:
          this._log.error('--> Type undifined', result);
      }
    }

    // Replace placeholders
    for (const placeholder of Object.keys(this._placeholders)) {
      while (content.includes(placeholder)) {
        content = content.replace(placeholder, this._placeholders[placeholder]);
      }
    }
    doc.contents = Buffer.from(content);
    return doc;
  }

  _linkType(result) {
    const linkText = this._linkText(result);
    const isValid = (str) => /(\(\/)|(ampbyexample\.com)/.test(str);
    if (!isValid(result)) {
      return {};
    }

    /* eslint-disable max-len */
    const exampleMatch = result.match(
      /ampbyexample\.com\/((?:[^\/]+\/)*)([^\/]+)\/\)/m
    );
    // eslint-disable-next-line no-unused-vars
    const [example, path, exampleName] = exampleMatch || [];
    if (exampleName) {
      return {
        'type': 'example',
        'name': exampleName,
        'text': linkText.text,
        'id': linkText.id,
      };
    }
    const componentOverview = result.match(
      /\[.*?\]\((\/\w+)?\/docs\/reference\/components\.html(#\w+)?\)/gm
    );
    if (componentOverview) {
      return {
        'type': 'componentOverview',
        'name': 'index',
        'text': linkText.text,
        'id': linkText.id,
      };
    }
    const exampleOverview = result.match(
      /\[.*?\]\((\/\w+)?https:\/\/ampbyexample\.com(#\w+)?\)/gm
    );
    if (exampleOverview) {
      return {
        'type': 'exampleOverview',
        'name': 'index',
        'text': linkText.text,
        'id': linkText.id,
      };
    }
    const componentName = result.match(/amp-\w*(-\w*)*/m);
    if (componentName) {
      return {
        'type': 'component',
        'name': componentName[0],
        'text': linkText.text,
        'id': linkText.id,
      };
    }
    const tutorialName = result.match(
      /(?!\](.*?)\/docs\/\w+\/)(\w+-)*\w+(?=\.html)/m
    );
    if (tutorialName) {
      return {
        'type': 'tutorial',
        'name': tutorialName[0],
        'text': linkText.text,
        'id': linkText.id,
      };
    }
    /* eslint-enable max-len */
    return {};
  }

  _linkText(result) {
    const section = result.match(/#\w*(-.*)?(?=\))/gm);
    const sectionId = section !== null ? section[0].replace(/\s/g, '') : '';
    const text = result.match(/\[(.*?)]/gm);
    if (text !== null) {
      return {'text': text, 'id': sectionId};
    }
    return {};
  }

  _handleFile(docPath, content, result, link, src) {
    if (this._fileExistsAtPath(link, src) !== undefined) {
      while (content.includes(result)) {
        const placeholder = this._createPlaceholder(
          result,
          this._getReferencePath(link, path)
        );
        return content.replace(
          result,
          this._createPlaceholder(result, placeholder)
        );
      }
      this._log.start('--> Valid ' + link.type + ' replaced:', result);
    } else {
      this._missingReferences.push({
        'document': docPath,
        'result': result,
        'link': link,
      });
      this._log.error('--> No valid ' + link.type + ' found in:', result);
    }
    return content;
  }

  _hash(str) {
    const hash = crypto.createHash('sha1');
    hash.update(str);
    return hash.digest('base64');
  }

  _createPlaceholder(result, newReference) {
    const placeholder = `<!--${this._hash(result)}-->`;
    if (!this._placeholders[placeholder]) {
      this._placeholders[placeholder] = newReference;
    }
    return placeholder;
  }

  _getFiles(dir, files_) {
    files_ = files_ || [];
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const name = dir + '/' + file;
      if (fs.statSync(name).isDirectory()) {
        this._getFiles(name, files_);
      } else {
        files_.push(name);
      }
    }
    return files_;
  }

  _fileExistsAtPath(link, src) {
    let path = undefined;
    const existingFiles = this._getFiles(src);
    for (const filePath of existingFiles) {
      // eslint-disable-next-line max-len
      if (
        filePath.toLowerCase().includes(`/${link.name}.html`) ||
        filePath.toLowerCase().includes(`/${link.name}.md`)
      ) {
        // eslint-disable-next-line max-len
        path = filePath.replace(
          POD_BASE_PATH + 'content/amp-dev/documentation/',
          ''
        );
      }
    }
    return path;
  }

  _getReferencePath(link, basePath) {
    // eslint-disable-next-line max-len
    return `${link.text}({{g.doc('/content/amp-dev/documentation/${basePath}', locale=doc.locale).url.path}}${link.id})`;
  }
}

// If not required, run directly
if (!module.parent) {
  const referenceLinker = new ComponentReferenceLinker();
  referenceLinker.start();
}

module.exports = ComponentReferenceLinker;
