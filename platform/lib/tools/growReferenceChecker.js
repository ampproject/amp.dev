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

require('module-alias/register');
const log = require('@lib/utils/log')('Reference checker');
const gulp = require('gulp');
const through = require('through2');
const search = require('recursive-search');
const path = require('path');
const fs = require('fs');
const config = require('@lib/config');
const SlugGenerator = require('@lib/utils/slugGenerator');

// Where to look for existing documents
const POD_BASE_PATH = path.join(__dirname, '../../../pages/');
// Which documents to check for broken references
const PAGES_SRC = POD_BASE_PATH + 'content/amp-dev/**/*.{md,html}';
// The location to search for documents in
const PAGES_BASE_PATH = POD_BASE_PATH + 'content/amp-dev';
// The pattern to find links in markdown and html
// It also matches source code blocks to skip these
const REFERENCE_PATTERN = new RegExp(
  // skip sourcecode block in markdown:
  /^```[\s\S]*?```/.source +
    '|' +
    // skip sourcecode tag in markdown
    /\[sourcecode[^\]]*\][\s\S]*?\[\/sourcecode\]/.source +
    '|' +
    // find <a href=""> link tag:
    /<a(?:\s+[^>]*)?\shref\s*=\s*"([^":\{?#]*)(?:\?[^#"]*)?(#[^>"]*)?"/.source +
    '|' +
    // find markdown link block [text](../link):
    /\[[^\]]+\]\(([^:\)\{?#]*)(?:\?[^#\)]*)?(#[^\)]*)?\)/.source +
    '|' +
    // find {{g.doc('link')}} links:
    /g.doc\('(.*?)'/.source,
  'gm'
);
/* eslint-disable max-len */
// Contains manual hints for double filenames etc.
const LOOKUP_TABLE = {
  '/content/amp-dev/documentation/guides-and-tutorials/learn/validate.md':
    '/content/amp-dev/documentation/guides-and-tutorials/learn/validation-workflow/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/learn/how_cached.md':
    '/content/amp-dev/documentation/guides-and-tutorials/learn/amp-caches-and-cors/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/amp_replacements.md':
    '/content/amp-dev/documentation/guides-and-tutorials/develop/media_iframes_3p/index.md',
  '/content/amp-dev/documentation/guides-and-tutorials/integrate/pwa-amp/index.md':
    '/content/amp-dev/documentation/guides-and-tutorials/integrate/amp-in-pwa.md',
  '/content/amp-dev/documentation/guides-and-tutorials/learn/spec/index.md':
    '/content/amp-dev/documentation/guides-and-tutorials/learn/spec/amphtml.md',
};
/* eslint-enable max-len */
// The following paths are skipped when checked for existance
const IGNORED_PATH_PATTERNS =
  /\/content\/amp-dev\/documentation\/components\/reference\/.*?|\/boilerplate|\/content\/amp-dev\/community\/working-groups\/.*?/g;

// The list of imported docs. Here we do not check anchors.
const IMPORTED_DOCS = require(
  __dirname + '/../../config/imports/spec.json'
).map((spec) => '/content/amp-dev/' + spec.to);

/**
 * Walks over documents inside the Grow pod and looks for broken links either
 * in a syntax like `g.doc('...')` or []() and checks if the linked document
 * exists at the pointed path and tries to adjust the path if not
 */
class GrowReferenceChecker {
  constructor() {
    this._anchorsByPage = {};
    // Keeps track of documents that could not be found and therefore need
    // to be fixed manually
    this._unfindableDocuments = [];

    // Stores paths that could have multiple new destinations
    this._multipleMatches = {};

    // Holds the number of links that where corrupt
    this._brokenReferencesCount = 0;

    // Counts the amount of wrong anchors
    this._wrongAnchorCount = 0;
  }

  start() {
    log.start(`Inspecting documents in ${PAGES_SRC} for broken references ...`);

    return new Promise(async (resolve, reject) => {
      await this._readAnchors();

      let stream = gulp.src(PAGES_SRC, {'read': true, 'base': './'});

      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          callback(null, this._check(doc));
        })
      );

      stream = stream.pipe(gulp.dest('./'));

      stream.on('end', async () => {
        await this._addExplicitAnchors();

        if (this._brokenReferencesCount > 0) {
          log.complete('Finished automatic fixing.');
          log.complete(
            `A total of ${this._brokenReferencesCount} links had ` +
              `errors. ${
                this._unfindableDocuments.length +
                Object.keys(this._multipleMatches).length
              } still have.`
          );
        }

        if (
          Object.keys(this._multipleMatches).length == 0 &&
          this._unfindableDocuments.length == 0 &&
          this._wrongAnchorCount == 0
        ) {
          log.success('All references intact!');
          resolve();
          return;
        }

        if (this._unfindableDocuments.length) {
          log.info(
            `Could not automatically fix ${this._unfindableDocuments.length} ` +
              "as there wasn't any document with a matching basename:"
          );
          for (const documentPath of this._unfindableDocuments) {
            log.pending(`- ${documentPath}`);
          }
        }

        log.info('');

        const multipleMatchesCount = Object.keys(this._multipleMatches).length;
        if (multipleMatchesCount !== 0) {
          log.info(
            `Encountered multiple possible matches for ${multipleMatchesCount} ` +
              'documents:'
          );
          for (const documentPath in this._multipleMatches) {
            if (
              Object.prototype.hasOwnProperty.call(
                this._multipleMatches,
                documentPath
              )
            ) {
              log.pending(`${documentPath}`);
              for (const possibleMatch of this._multipleMatches[documentPath]) {
                log.pending(`-- ${possibleMatch.replace(POD_BASE_PATH, '/')}`);
              }
            }
          }
        }

        if (
          this._unfindableDocuments.length > 0 ||
          multipleMatchesCount > 0 ||
          this._wrongAnchorCount > 0
        ) {
          reject(
            new Error(
              `${this._unfindableDocuments.length + multipleMatchesCount} ` +
                `broken links and ${this._wrongAnchorCount} wrong anchors found`
            )
          );
        } else {
          resolve();
        }
      });
    });
  }

  _readAnchors() {
    return new Promise((resolve, reject) => {
      // we skip html files, since they sometimes use imports of other documents
      // where we cannot resolve the anchors
      let stream = gulp.src([PAGES_SRC, `!${POD_BASE_PATH}/**/*.html`], {
        'read': true,
        'base': './',
      });
      stream.on('end', () => {
        resolve();
      });
      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          this._readAnchorsForDoc(doc, callback);
          callback();
        })
      );
    });
  }

  _readAnchorsForDoc(doc) {
    const anchors = {};
    const content = doc.contents.toString();

    const TITLE_PATTERN =
      // eslint-disable-next-line max-len
      /^#+[ \t]*(.*?)(?:<a[ \t]+name="([^">]+)"[^>]*>\s*<\/a>)?((?:.(?!<a[ \t]+name))*?)$|<a\s+name="(.+?)"|<\w[^>]*\sid="(.+?)"/gm;

    const slugGenerator = new SlugGenerator();

    let match;
    while ((match = TITLE_PATTERN.exec(content))) {
      const title = match[1] + match[3];
      const anchor = match[2] || match[4] || match[5];
      if (anchor) {
        anchors[anchor] = {
          isExplicit: true,
          explicitValue: anchor,
        };
      }
      if (title) {
        const implicitAnchor = slugGenerator.generateSlug(title);
        if (anchor != implicitAnchor) {
          anchors[implicitAnchor] = {
            isExplicit: false,
            explicitValue: anchor,
          };
        }
      }
    }
    this._anchorsByPage[this._getPathInPod(doc)] = anchors;
    return doc;
  }

  /**
   * Inspects various reference patterns and tries to find the matching file
   * inside of the Grow pod
   * @param  {Vinyl} doc The document from the pod
   * @return {Vinyl}     The document with updated references
   */
  _check(doc) {
    let content = doc.contents.toString();
    content = content.replace(
      REFERENCE_PATTERN,
      (match, hrefLink, hrefAnchor, markdownLink, markdownAnchor, gDocLink) => {
        let result = match;
        const link = hrefLink || markdownLink || gDocLink;
        const anchor = hrefAnchor || markdownAnchor;
        let resultLink;
        if (link) {
          resultLink = this._verifyReference(link, doc);
          if (resultLink && resultLink != link) {
            result = result.replace(link, resultLink);
          }
        }
        // we will only check the anchor if the target page is found
        if (anchor && !(link && !resultLink)) {
          const newAnchor = this._checkAnchor(anchor, resultLink, doc);
          if (newAnchor != anchor) {
            result = result.replace(anchor, newAnchor);
          }
        }
        return result;
      }
    );

    doc.contents = Buffer.from(content);
    return doc;
  }

  _checkAnchor(anchor, linkedPath, doc) {
    if (!this._isDynamic(anchor)) {
      return anchor;
    }

    const sourcePath = this._getPathInPod(doc);

    const anchorValue = anchor.substring(1);
    const localePaths = new Set();
    if (linkedPath) {
      let targetPath = linkedPath.replace(/@[^.]+/, ''); // remove locale
      targetPath = this._resolveRelativeLink(targetPath, doc);
      if (sourcePath.includes('@')) {
        localePaths.add(
          this._getPathForLocale(
            targetPath,
            sourcePath.substring(
              sourcePath.indexOf('@') + 1,
              sourcePath.lastIndexOf('.')
            )
          )
        );
      } else {
        for (const locale of config.getAvailableLocales()) {
          if (sourcePath == this._getPathForLocale(sourcePath, locale)) {
            const localeWithPath = this._getPathForLocale(targetPath, locale);
            localePaths.add(localeWithPath);
          }
        }
      }
    } else {
      localePaths.add(sourcePath);
    }
    let resultAnchor;
    const errorLocales = [];
    for (const localePath of localePaths) {
      const foundAnchor = this._resolveAnchor(anchorValue, localePath);
      if (!foundAnchor || (resultAnchor && foundAnchor != resultAnchor)) {
        errorLocales.push(localePath);
      } else if (!resultAnchor) {
        resultAnchor = foundAnchor;
      }
    }
    if (errorLocales.length > 0) {
      if (
        IMPORTED_DOCS.includes(sourcePath) ||
        sourcePath.match(IGNORED_PATH_PATTERNS) ||
        sourcePath.includes('@')
      ) {
        log.warn(
          'anchor not found in imported/translated document',
          anchor,
          '\n',
          'found in:',
          doc.path,
          '\n',
          'target:',
          linkedPath ? errorLocales : '<internal>'
        );
      } else {
        log.error(
          'anchor not found',
          anchor,
          '\n',
          'found in:',
          doc.path,
          '\n',
          'target:',
          linkedPath ? errorLocales : '<internal>'
        );
        this._wrongAnchorCount++;
      }
      return anchor;
    }
    return '#' + resultAnchor;
  }

  // Ignore empty and dynamic anchors
  _isDynamic(link) {
    if (!link || link.includes('{{') || link.includes('[=')) {
      return false;
    }
    return true;
  }

  _getPathForLocale(filePath, locale) {
    const pathWithLocale =
      filePath.substring(0, filePath.lastIndexOf('.md')) + '@' + locale + '.md';
    if (this._anchorsByPage.hasOwnProperty(pathWithLocale)) {
      return pathWithLocale;
    } else {
      return filePath;
    }
  }

  _resolveAnchor(anchorValue, targetPath) {
    const anchors = this._anchorsByPage[targetPath];
    if (!anchors) {
      // Target path is not in pod
      return anchorValue;
    }
    let existingAnchor = anchors[anchorValue];
    if (!existingAnchor) {
      // first remove URL encoded characters and HTML entities that can be found in documents
      // as a replacement for special characters that would be removed in a slug anyway.
      anchorValue = anchorValue.replace(/%[0-9A-F]{2}/g, '');
      anchorValue = anchorValue.replace(/&[^/s]+;/g, '');
      anchorValue = SlugGenerator.sluggify(anchorValue);
      existingAnchor = anchors[anchorValue];
    }
    if (existingAnchor) {
      if (existingAnchor.isExplicit) {
        return anchorValue;
      }
      if (existingAnchor.explicitValue) {
        return existingAnchor.explicitValue;
      }
      existingAnchor.isUsed = true;
      return anchorValue;
    }
    return null;
  }

  /**
   * Tries to find a given link inside the pod
   * @param  {String} link The target link
   * @param |{Vinyl} doc The document where the link is found
   * @return {String} The link to the document (adjusted if needed) or null if the target was not found.
   */
  _verifyReference(link, doc) {
    if (!this._isDynamic(link)) {
      return link;
    }

    const documentPath = this._resolveRelativeLink(link, doc);

    let changedPath = this._findReference(documentPath, doc);
    if (changedPath === documentPath) {
      return link;
    }

    this._brokenReferencesCount++;

    if (changedPath) {
      if (changedPath.startsWith('/')) {
        changedPath = path.relative(
          path.dirname(doc.path),
          path.join(POD_BASE_PATH, changedPath)
        );
      }
      return changedPath;
    }

    // check if we find the document elsewhere
    const results = this._searchReference(documentPath);

    // If there is more than one match store all matches for the user to
    // do the manual fixing
    if (results.length > 1) {
      log.error(
        `More than one possible match for ${documentPath}. Needs manual fixing.` +
          ` (In ${doc.path})`
      );
      this._multipleMatches[documentPath] = results;
      return null;
    } else if (results.length == 0) {
      log.error(
        `No matching document found for ${documentPath}. Needs manual fixing.` +
          ` (First found in ${doc.path})`
      );
      this._unfindableDocuments.push(documentPath);
      return null;
    }

    return path.relative(path.dirname(doc.path), results[0]);

    return null;
  }

  /**
   * Will check if the reference can be found under the given path.
   * This method also checks the lookup table and other extensions.
   * @param documentPath
   * @param doc
   * @returns {null|string} The path under which the file was found or null if not found.
   * @private
   */
  _findReference(documentPath, doc) {
    if (documentPath.match(IGNORED_PATH_PATTERNS)) {
      return documentPath;
    }

    if (fs.existsSync(POD_BASE_PATH + documentPath)) {
      return documentPath;
    }

    // Fail early if the path is already known to be broken
    if (this._unfindableDocuments.includes(documentPath)) {
      return null;
    }

    // Check if there is a manual match for the path in the lookup table
    const lookedUpPath = LOOKUP_TABLE[documentPath.replace(POD_BASE_PATH, '/')];
    if (lookedUpPath) {
      return lookedUpPath;
    }

    // If the reference was pointing to an HTML document look if there is
    // a matching markdown document
    if (documentPath.endsWith('.html')) {
      let mdPath = documentPath.replace(/\.html$/, '.md');
      mdPath = this._findReference(mdPath, doc);
      if (mdPath) {
        return mdPath;
      }
    }
    return null;
  }

  /**
   * Will check if the referenced file is found in a different folder
   * @param documentPath
   * @returns {Array} The list of found documents with absolute paths
   * @private
   */
  _searchReference(documentPath) {
    let basename = path.basename(documentPath);

    // search for the same file in other dirs
    let results = search.recursiveSearchSync(
      new RegExp(basename, 'i'),
      PAGES_BASE_PATH
    );

    if (results.length === 0) {
      const ext = path.extname(documentPath);

      // check if we can find the file with the other std extension
      if (ext === '.html' || ext === '.md') {
        basename =
          path.basename(basename, ext) + (ext === '.md' ? '.html' : '.md');
        results = search.recursiveSearchSync(
          new RegExp(basename, 'i'),
          PAGES_BASE_PATH
        );
      }
    }
    return results;
  }

  /**
   * @param link {string}
   * @param doc {Vinyl}
   * @returns {string}
   */
  _resolveRelativeLink(link, doc) {
    if (link.startsWith('/')) {
      return link;
    }
    const sourcePath = this._getPathInPod(doc);
    const result = path.normalize(path.join(path.dirname(sourcePath), link));
    return result;
  }

  /**
   * Will add explicit anchors where the implicit anchor was used somewhere.
   */
  _addExplicitAnchors() {
    return new Promise((resolve, reject) => {
      const pages = [];
      // eslint-disable-next-line guard-for-in
      for (const pagePath in this._anchorsByPage) {
        const anchors = this._anchorsByPage[pagePath];
        for (const anchor in anchors) {
          if (anchors[anchor].isUsed) {
            pages.push(path.join(POD_BASE_PATH, pagePath));
            break;
          }
        }
      }

      if (pages.length == 0) {
        resolve();
        return;
      }

      log.info('Add explicit anchors to:', pages);

      let stream = gulp.src(pages, {'read': true, 'base': './'});
      stream = stream.pipe(
        through.obj((doc, encoding, callback) => {
          this._addExplicitAnchorsForDoc(doc);
          callback(null, doc);
        })
      );
      stream = stream.pipe(gulp.dest('./'));
      stream.on('end', () => {
        resolve();
      });
    });
  }

  _addExplicitAnchorsForDoc(doc) {
    let content = doc.contents.toString();
    const anchors = this._anchorsByPage[this._getPathInPod(doc)];
    const slugGenerator = new SlugGenerator();
    content = content.replace(
      /^(#+)[ \t]*(.*?)(<a[ \t]+name=[^>]*>\s*<\/a>)?((?:.(?!<a[ \t]+name))*?)$/gm,
      (line, hLevel, headlineStart, anchorTag, headlineEnd) => {
        const headline = headlineStart + headlineEnd;
        const slug = slugGenerator.generateSlug(headline);
        const anchor = anchors[slug];
        // The slug generator has to know all the headlines, since we want to generate slugs like github does.
        // So only now do we check if we have an explicit anchor or our implicit anchor is not used.
        if (anchorTag || !anchor || !anchor.isUsed) {
          return line;
        }
        return `${hLevel} ${headline} <a name="${slug}"></a>`;
      }
    );

    doc.contents = Buffer.from(content);
    return doc;
  }

  _getPathInPod(doc) {
    return doc.path.substring(doc.path.indexOf('/content/amp-dev/'));
  }
}

// If not required, run directly
if (!module.parent) {
  (async () => {
    const referenceChecker = new GrowReferenceChecker();
    try {
      await referenceChecker.start();
    } catch (err) {
      log.error(err);
      process.exit(1);
    }
  })();
}

module.exports = new GrowReferenceChecker();
