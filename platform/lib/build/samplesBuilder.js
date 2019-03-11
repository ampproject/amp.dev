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

const {Signale} = require('signale');
const gulp = require('gulp');
const once = require('gulp-once');
const abe = require('amp-by-example');
const through = require('through2');
const del = require('del');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const crypto = require('crypto');

const MarkdownDocument = require('@lib/pipeline/markdownDocument.js');
const utils = require('@lib/utils');
const config = require('@lib/config.js');
const {handlebars} = require('@lib/common/handlebarsEnvironment.js');

// Where to import the samples from
const SAMPLE_SRC = utils.project.absolute('examples/source');
// The pod path inside
const POD_PATH = 'content/amp-dev/documentation/examples/documentation';
// Where to store the samples inside the Grow pod in
const MANUAL_DEST = utils.project.absolute(`pages/${POD_PATH}`);
// What Grow template to use to render the sample's manual
const MANUAL_TEMPLATE = '/views/examples/documentation.j2';
// What template to use to render the preview
const PREVIEW_TEMPLATES = {
  'websites': utils.project.absolute('frontend/hbs/preview-websites.hbs'),
  'stories': utils.project.absolute('frontend/hbs/preview-stories.hbs'),
  'ads': utils.project.absolute('frontend/hbs/preview-ads.hbs'),
  'email': utils.project.absolute('frontend/hbs/preview-email.hbs'),
};
// Base to define the request path for Grow
const PATH_BASE = '/documentation/examples';
// Path to store the cache in
const CACHE_DEST = utils.project.absolute('.cache/examples.json');
// Path the all source files are written to, to vend them via express
const SOURCE_DEST = utils.project.absolute('dist/examples/sources');
// Where to store the sample preview files with header
const PREVIEW_DEST = utils.project.absolute('dist/examples/previews');
// Where to store the embeds for Grow
const EMBED_DEST = utils.project.absolute('dist/examples/embeds');
// The API host used by samples depending on one
const API_HOST = 'https://amp-by-example-api.appspot.com';
// The host used for samples depending on a backend
const BACKEND_HOST = 'https://ampbyexample.com';


class SamplesBuilder {
  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Samples builder',
    });

    // Preload preview templates
    this._templates = {};
    /* eslint-disable guard-for-in */
    for (const format of Object.keys(PREVIEW_TEMPLATES)) {
      this._templates[format] = fs.readFileSync(PREVIEW_TEMPLATES[format], 'utf-8');
    }
  }

  async build(watch) {
    // If samples should be rebuild (due to architectural changes for example)
    // then you should be able to clean the sample build destinations
    if (!watch && config.options['clean-samples'] === true) {
      this._log.info('Cleaning sample destinations for rebuild ...');
      del.sync([
        `${MANUAL_DEST}/**/*.json`,
        `${MANUAL_DEST}/**/*.html`,

        // Also clean old structure
        utils.project.absolute(`/pages/${POD_PATH}/../**/*`),
        '!' + utils.project.absolute(`/pages/${POD_PATH}/../`),
        '!' + utils.project.absolute(`/pages/${POD_PATH}/../_blueprint.yaml`),
        '!' + utils.project.absolute(`/pages/${POD_PATH}/../index.html`),
        '!' + utils.project.absolute(`/pages/${POD_PATH}`),
        '!' + utils.project.absolute(`/pages/${POD_PATH}/_blueprint.yaml`),

        `${SOURCE_DEST}`,
        `${PREVIEW_DEST}`,
        `${EMBED_DEST}`,
        CACHE_DEST,
      ], {
        'force': true
      });
    }

    if (!watch && config.environment == 'development' && module.parent) {
      this._watch();
    }

    this._log.start('Starting to build samples ...');

    return new Promise((resolve, reject) => {
      let stream = gulp.src(`${SAMPLE_SRC}/**/*.html`, {'read': true});

      // Only build samples changed since last run and if it's not a fresh build
      if ((config.options['clean-samples'] && watch) || !config.options['clean-samples']) {
        stream = stream.pipe(once({
          'file': CACHE_DEST,
        }));
      }

      stream = stream.pipe(through.obj(async (sample, encoding, callback) => {
        this._log.await(`Building sample ${sample.relative} ...`);
        await this._parseSample(sample).then((parsedSample) => {
          // Skip samples that are drafts for alle envs except development
          if (parsedSample.document.metadata.draft && config.environment !== 'development') {
            callback();
            return;
          }

          // Build various documents and sources that are needed for Grow
          // to successfully render the example and for the playground
          const files = [
            ...this._createDocumentation(sample, parsedSample),
            ...this._buildRawSources(sample, parsedSample),
            ...this._createPreview(sample, parsedSample),
            ...this._renderEmbed(sample, parsedSample),
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
        file.dirname = `${SAMPLE_SRC}/${this._getCategory(file)}`;
        if (file.isSourceFile) {
          return SOURCE_DEST;
        } else if (file.isPreview) {
          return PREVIEW_DEST;
        } else if (file.isEmbed) {
          return EMBED_DEST;
        } else {
          // Remove double name from path to flatten structure for Grow
          file.dirname = `${SAMPLE_SRC}`;
          return MANUAL_DEST;
        }
      }));

      stream.on('error', (error) => {
        this._log.fatal('There was an error building the samples', error);
        reject(error);
      });

      stream.on('end', () => {
        this._log.success('Built samples.');
        resolve();
      });
    });
  }

  /**
   * Parse a sample source file into a JSON using the parser from the
   * ampbyexample.com package and while doing so updates some fields
   * @return {Promise}
   */
  async _parseSample(sample) {
    let platformHost = config.getHost(config.hosts.platform);
    return await abe.parseSample(sample.path, {
      'canonical': `${platformHost}${this._getDocumentationRoute(sample)}`,
      'hosts': {
        'platform': platformHost,
        'api': API_HOST,
        'backend': BACKEND_HOST,
      }
    }).then((parsedSample) => {
      // parsedSample.filePath is absolute but needs to be relative in order
      // to use it to build a URL to GitHub
      parsedSample.filePath = parsedSample.filePath.replace(path.join(__dirname, '../../../'), '');

      // Add the delivery path of the manual for preview rendering
      parsedSample.route = this._getDocumentationRoute(sample);

      // Rewrite some markdown to be consumable by Grow
      for (const index in parsedSample.document.sections) {
        // Replace GitHub sourcecode syntax by python-markdown
        let markdown = parsedSample.document.sections[index].doc_;
        markdown = MarkdownDocument.rewriteCodeBlocks(markdown);
        markdown = MarkdownDocument.escapeMustacheTags(markdown);

        // Splice out sourcecode blocks to preserve whitespace
        const codeBlocks = {};
        const CODE_BLOCK_PATTERN = /\[sourcecode.*?\[\/sourcecode]/gms;
        markdown.replace(CODE_BLOCK_PATTERN, (match) => {
          // Hash and save the code block for later restore
          let hash = crypto.createHash('sha1');
          hash.update(match);
          hash = hash.digest('base64');

          codeBlocks[hash] = match;
          return hash;
        });

        // Replace empty lines with leading space with just a new line
        markdown = markdown.replace(/^\s+/gm, '\n');

        // Replace new lines with following space or multiple new lines
        // by just a new line
        markdown = markdown.replace(/(\n +|\n{2,})/gm, '\n\n');

        // Restore codeblocks
        /* eslint-disable guard-for-in */
        for (const hash in Object.keys(codeBlocks)) {
          markdown = markdown.replace(hash, codeBlocks[hash]);
        }

        parsedSample.document.sections[index].doc_ = markdown;
      }

      return parsedSample;
    });
  }

  /**
   * Parses the category from a sample path which is the first level
   * directory name after the base path
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {String}       The category
   */
  _getCategory(sample) {
    let category = sample.dirname.replace(`${SAMPLE_SRC}/`, '');
    category = category.split('/')[0];
    return category;
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for routing and source canonical
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {String}       The route
   */
  _getDocumentationRoute(sample) {
    return `${PATH_BASE}/${this._getCategory(sample)}/${sample.stem.toLowerCase()}`;
  }

  /**
   * Creates a markdown document referencing the JSON that is going to be
   * created by _createDataSource
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {Vinyl}
   */
  _createDocumentation(sample, parsedSample) {
    // Create the actual page that is rendered by Grow and add needed
    // frontmatter that is required ...
    const manual = sample.clone();

    // Build actual file needed for Grow to render the documentation
    manual.contents = Buffer.from([
      '---',
      yaml.safeDump({
        '$$injectAmpDependencies': false,
        '$title': parsedSample.document.title,
        '$view': MANUAL_TEMPLATE,
        '$category': this._getCategory(sample) || null,
        '$path': this._getDocumentationRoute(sample),
        '$localization': {
          '$path': `/{locale}${this._getDocumentationRoute(sample)}`
        }
      }, {'lineWidth': 500}),
      // Add example manually as constructors may not be quoted
      `example: !g.json /${POD_PATH}/${manual.stem}.json`,
      // ... and some additional information that is used by the example teaser
      this._getTeaserData(parsedSample),
      '---',
    ].join('\n'));
    manual.extname = '.html';

    // ... and the parsed sample as data source to render the manual
    const data = manual.clone();
    data.contents = Buffer.from(JSON.stringify(parsedSample));
    data.extname = '.json';

    return [manual, data];
  }

  /**
   * Builds a YAML string that is added to the manual document to
   * build a nice teaser for the sample
   * @param  {Object} parsedSample
   * @return {String}
   */
  _getTeaserData(parsedSample) {
    const teaserData = {};
    teaserData.formats = [this._getSampleFormat(parsedSample)];
    teaserData.used_components = this._getUsedComponents(parsedSample);

    if (parsedSample.document.metadata.teaserImage) {
      teaserData.teaser = {'image': {
        'src': parsedSample.document.metadata.teaserImage
      }};
    }

    return yaml.safeDump(teaserData, {'lineWidth': 500});
  }

  /**
   * Used to determine the sample format by string
   * @param  {Object} parsedSample
   * @return {String}
   */
  _getSampleFormat(parsedSample) {
    if (parsedSample.document.isAmpStory) {
      return 'stories';
    }
    if (parsedSample.document.isAmpAds) {
      return 'ads';
    }
    if (parsedSample.document.isAmpEmail) {
      return 'email';
    }

    // Use websites as fallback as isAmpWebsites could be true for all formats
    return 'websites';
  }

  /**
   * Parses all components used in sample and gives them back as an Array
   * @param  {Object} parsedSample
   * @return {Array}
   */
  _getUsedComponents(parsedSample) {
    // Dirty RegEx to quickly parse component names from head
    const COMPONENT_PATTERN = /<script.*?custom-.*?="(?<name>.*?)".*?<\/script>/g;
    const match = COMPONENT_PATTERN.exec(parsedSample.document.head);

    const usedComponents = {};
    parsedSample.document.head.replace(COMPONENT_PATTERN, (script, name) => {
      usedComponents[name] = script.replace(/\"/g, '\"');
    });

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
    fullSource.contents = Buffer.from(parsedSample.source);
    fullSource.dirname = `${fullSource.dirname}/${this._getCategory(sample)}`;
    fullSource.isSourceFile = true;

    sources.push(fullSource);

    // ... and only build snippet sources if they can run standalone
    if (!parsedSample.document.metadata.standaloneSnippets) {
      return sources;
    }

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

      const sectionSource = fullSource.clone();
      sectionSource.isSourceFile = true;
      sectionSource.contents = Buffer.from(contents);
      sectionSource.extname = `-${section.id}.html`;

      sources.push(sectionSource);
    }

    return sources;
  }

  /**
   * Renders embedabble preview versions
   * @param  {Vinyl} sample
   * @param  {Object} parsedSample
   * @return {Array}
   */
  _renderEmbed(sample, parsedSample) {
    // Also render embed file for stories
    if (parsedSample.document.isAmpStory) {
      const template = this._templates[this._getSampleFormat(parsedSample)];

      const embed = sample.clone();
      embed.dirname = `${embed.dirname}/${this._getCategory(sample)}`;
      embed.isEmbed = true;
      embed.contents = Buffer.from(handlebars.render(
          template, Object.assign({'isEmbed': true}, parsedSample)));

      return [embed];
    }

    return [];
  }

  /**
   * Creates a html document that holds the initial sample source
   * @param  {Vinyl} sample The sample from the gulp stream
   * @param  {Object} parsedSample The sample parsed by abe.com
   * @return {Vinyl}
   */
  _createPreview(sample, parsedSample) {
    // Check if the sample should have a preview at all
    if (!parsedSample.document.metadata.hidePreview && !parsedSample.document.metadata.preview) {
      return [];
    }

    // Determine the template needed for that specific sample
    const template = this._templates[this._getSampleFormat(parsedSample)];
    const preview = sample.clone();

    // Set flag to determine correct output location
    preview.isPreview = true;
    preview.contents = Buffer.from(handlebars.render(template, parsedSample));

    return [preview];
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
