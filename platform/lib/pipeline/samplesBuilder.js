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
const once = require('gulp-once');
const abe = require('amp-by-example');
const through = require('through2');
const del = require('del');
const path = require('path');
const crypto = require('crypto');

const MarkdownDocument = require('./markdownDocument.js');
const config = require('../config.js');

// Where to import the samples from
const SAMPLE_SRC = path.join(__dirname, '../../../examples/source/**/*.html');
// The pod path inside
const POD_PATH = 'content/amp-dev/documentation/examples';
// Where to store the samples inside the Grow pod in
const MANUAL_DEST = path.join(__dirname, `../../../pages/${POD_PATH}`);
// What Grow template to use to render the sample's manual
const MANUAL_TEMPLATE = '/views/examples/manual.j2';
// What Grow template to use to render the preview
const PREVIEW_TEMPLATE = '/views/examples/preview.j2';
// Base to define the request path for Grow
const PATH_BASE = '/documentation/examples/';
// Path the all source files are written to, to vend them via express
const SOURCE_DEST = path.join(__dirname, '../../../dist/sampleSources');
// Path to store the cache in
const CACHE_DEST = path.join(__dirname, '../../../.cache/samples.json');

class SamplesBuilder {
  constructor() {
    this._log = new Signale({
      'interactive': true,
      'scope': 'Samples builder',
    });
  }

  async build(watch) {
    // If samples should be rebuild (due to architectural changes for example)
    // then you should be able to clean the sample build destinations
    if (!watch && config.options['clean-samples'] === true) {
      this._log.info('Cleaning sample destinations for rebuild ...');
      del.sync([
        `${MANUAL_DEST}/**/*.html`,
        `${MANUAL_DEST}/**/*.json`,
        `${SOURCE_DEST}`,
        CACHE_DEST,
      ], {
        'force': true,
      });
    }

    if (!watch && config.environment == 'development' && module.parent) {
      this._watch();
    }

    this._log.start('Starting to build samples ...');

    return new Promise((resolve, reject) => {
      let stream = gulp.src(SAMPLE_SRC, {'read': true});

      // Only build samples changed since last run and if it's not a fresh build
      if ((config.options['clean-samples'] && watch) || !config.options['clean-samples']) {
        stream = stream.pipe(once({
          'file': CACHE_DEST,
        }));
      }

      stream = stream.pipe(through.obj(async (sample, encoding, callback) => {
        this._log.await(`Building sample ${sample.relative} ...`);
        await this._parseSample(sample.path).then((parsedSample) => {
          // Build various documents and sources that are needed for Grow
          // to successfully render the example and for the playground
          const files = [
            ...this._createManual(sample, parsedSample),
            ...this._buildRawSources(sample, parsedSample),
          ];

          // Since stream.push doesn't allow to push multiple files at once
          /* eslint-disable guard-for-in */
          for (const file of files) {
            stream.push(file);
          }

          callback();
        }).catch((e) => {
          this._log.error(e);
          callback();
        });
      }));

      stream.pipe(gulp.dest((file) => {
        if (file.isSourceFile) {
          return SOURCE_DEST;
        } else {
          return MANUAL_DEST;
        }
      }));

      stream.on('error', (error) => {
        this._log.fatal('There was an error building the samples', error);
        reject();
      });

      stream.on('end', () => {
        this._log.success(`Built sample manuals to ${MANUAL_DEST} and ${SOURCE_DEST}.`);
        resolve();
      });
    });
  }

  /**
   * Parse a sample source file into a JSON using the parser from the
   * ampbyexample.com package and while doing so updates some fields
   * @return {Promise}
   */
  async _parseSample(samplePath) {
    return await abe.parseSample(samplePath).then((parsedSample) => {
      // parsedSample.filePath is absolute but needs to be relative in order
      // to use it to build a URL to GitHub
      parsedSample.filePath = parsedSample.filePath.replace(path.join(__dirname, '../../../'), '');

      // Rewrite some markdown to be consumable by Grow
      for (const index in parsedSample.document.sections) {
        // Replace GitHub sourcecode syntax by python-markdown
        let markdown = parsedSample.document.sections[index].doc_;
        markdown = MarkdownDocument.rewriteCodeBlocks(markdown);

        // Splice out sourcecode blocks to preserve whitespace
        const codeBlocks = {};
        const CODE_BLOCK_PATTERN = /\[sourcecode.*?\[\/sourcecode]/gms;
        markdown.replace(CODE_BLOCK_PATTERN, (match) => {
          // Hash and save the code block for later restore
          let hash = crypto.createHash('md5');
          hash.update(match);
          hash = hash.digest('utf-8');

          codeBlocks[hash] = match;
          return hash;
        });

        // Replace empty lines with leading space with just a new line
        markdown = markdown.replace(/^\s+/gm, '\n');

        // Replace new lines with following space by just a new line
        markdown = markdown.replace(/\n +/gm, '\n');

        // Restore codeblocks
        for (const hash in Object.keys(codeBlocks)) {
          markdown = markdown.replace(hash, codeBlocks[hash]);
        }

        parsedSample.document.sections[index].doc_ = markdown;
      }

      return parsedSample;
    });
  }

  /**
   * Creates a markdown document referencing the JSON that is going to be
   * created by _createDataSource
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {Vinyl}
   */
  _createManual(sample, parsedSample) {
    // Create the actual page that is rendered by Grow and add needed
    // frontmatter that is required ...
    const manual = sample.clone();
    manual.contents = Buffer.from([
      '---',
      '$$injectAmpDependencies: false',
      '$title: ' + parsedSample.document.title,
      '$view: ' + MANUAL_TEMPLATE,
      '$path: ' + PATH_BASE + manual.relative,
      'example: !g.json /' + POD_PATH + '/' + manual.relative.replace('.html', '.json'),
      // ... and some additional information that is used by the example teaser
      ...this._getTeaserData(parsedSample),
      '---',
    ].join('\n'));
    manual.extname = '.html';

    // ... and the parsed sample as data source to render the manual
    const data = sample.clone();
    data.contents = Buffer.from([
      JSON.stringify(parsedSample),
    ].join('\n'));
    data.extname = '.json';

    return [manual, data];
  }

  _getTeaserData(parsedSample) {
    const teaserData = [];
    teaserData.push('formats:');
    if (parsedSample.document.isAmpWeb) {
      teaserData.push('  - websites');
    }
    if (parsedSample.document.isAmpStory) {
      teaserData.push('  - stories');
    }
    if (parsedSample.document.isAmpAds) {
      teaserData.push('  - ads');
    }
    if (parsedSample.document.isAmpEmail) {
      teaserData.push('  - email');
    }

    teaserData.push('used_components:');
    teaserData.push(...this._getUsedComponents(parsedSample));

    return teaserData;
  }

  _getUsedComponents(parsedSample) {
    // Dirty RegEx to quickly parse component names from head
    const COMPONENT_PATTERN = /custom-element="amp-.*?"/g;
    const matches = parsedSample.document.head.match(COMPONENT_PATTERN) || [];

    const usedComponents = [];
    /* eslint-disable guard-for-in */
    for (let match of matches) {
      // Strip custom-element= from match, while doing so directly
      // pad the components to render them as YAML list
      match = match.replace('custom-element="', '  - ');
      match = match.replace('"', '');

      usedComponents.push(match);
    }

    return usedComponents;
  }

  /**
   * Creates various HTML documents that are then served statically for
   * use in playground and its embeds
   * @param  {Vinyl} sample The sample from the gulp stream
   * @param  {Object} parsedSample The sample parsed by abe.com
   * @return {Array} An array of Vinyl files to write
   */
  _buildRawSources(sample, parsedSample) {
    const sources = [];

    // Keep the full sample for the big playground
    const fullSource = sample.clone();
    fullSource.isSourceFile = true;

    sources.push(fullSource);

    const TITLE_PLACEHOLDER = '<!-- samplesBuilder: title-->';
    const SECTION_PLACEHOLDER = '<!-- samplesBuilder: section-->';
    // Then create a document structure that can be used to write a full document
    // for each of the individual sections
    const barebone = [
      '<!doctype html>\n<html ⚡>\n<head>',
      parsedSample.document.head,
      `<title>${parsedSample.document.title} / ${TITLE_PLACEHOLDER}</title>`,
      '<style amp-custom>',
      parsedSample.document.styles,
      '</style>\n<meta name="robots" content="noindex, nofollow">\n</head>',
      parsedSample.document.body,
      parsedSample.document.elementsAfterBody,
      `${SECTION_PLACEHOLDER}</body>\n</html>`,
    ].join('\n');

    for (const section of parsedSample.document.sections) {
      // Check if the section qualifies to show standalone
      if (section.preview.replace(/\s/g, '') == '' || !section.inBody) {
        continue;
      }

      let contents = barebone.replace(SECTION_PLACEHOLDER, section.preview);
      contents = contents.replace(TITLE_PLACEHOLDER, section.id);

      const sectionSource = sample.clone();
      sectionSource.isSourceFile = true;
      sectionSource.contents = Buffer.from(contents);
      sectionSource.extname = `-${section.id}.html`;

      sources.push(sectionSource);
    }

    return sources;
  }

  /**
   * Creates a html document that holds the initial sample source
   * @param  {Vinyl} sample The sample from the gulp stream
   * @param  {Object} parsedSample The sample parsed by abe.com
   * @return {Vinyl}
   */
  _createPreviewDoc(sample, parsedSample) {
    sample = sample.clone();
    sample.contents = Buffer.from([
      '---',
      '$title: ' + parsedSample.document.title,
      '$view: ' + PREVIEW_TEMPLATE,
      '$path: ' + PATH_BASE + sample.relative.replace('.html', '/preview.html'),
      'example: !g.json /' + POD_PATH + '/' + sample.relative.replace('.html', '.json'),
      '$hidden: true',
      '---',
    ].join('\n'));
    sample.extname = '-preview.html';

    return sample;
  }

  _watch() {
    this._log.watch('Watching samples for changes ...');
    gulp.watch(SAMPLE_SRC, this.build.bind(this, true));
  }
}

if (!module.parent) {
  (async () => {
    const samplesBuilder = new SamplesBuilder();
    samplesBuilder.build();
  })();
}

module.exports = {
  'samplesBuilder': new SamplesBuilder(),
  'SOURCE_DEST': SOURCE_DEST,
};
