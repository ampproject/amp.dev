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

const {promisify} = require('util');
const {Signale} = require('signale');
const gulp = require('gulp');
const once = require('gulp-once');
const abe = require('../samples/index.js');
const through = require('through2');
const del = require('del');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');
const crypto = require('crypto');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const nunjucks = require('nunjucks');

const MarkdownDocument = require('@lib/pipeline/markdownDocument.js');
const formatTransform = require('@lib/format-transform/');
const utils = require('@lib/utils');
const config = require('@lib/config.js');
const {FORMAT_WEBSITES} = require('../amp/formatHelper.js');

// Where to import the samples from
const SAMPLE_SRC = utils.project.absolute('examples/source');
// The pod path for the documentation pages
const DOCUMENTATION_POD_PATH =
  'content/amp-dev/documentation/examples/documentation';
// Where to store the samples inside the Grow pod in
const DOCUMENTATION_DEST = utils.project.absolute(
  `pages/${DOCUMENTATION_POD_PATH}`
);
// What Grow template to use to render the sample's manual
const DOCUMENTATION_TEMPLATE = '/views/examples/documentation.j2';
// The pod path for the previews
const PREVIEW_POD_PATH = 'content/amp-dev/documentation/examples/previews';
// Where to store the sample preview files with header
const PREVIEW_DEST = utils.project.absolute(`pages/${PREVIEW_POD_PATH}`);
// What template to use to render the preview
const PREVIEW_TEMPLATE = '/views/examples/preview.j2';
// Path to the story embed snippet
const STORY_EMBED_SNIPPET = utils.project.absolute(
  'frontend/js/story-progress.js'
);
// Path to the ads embed template
const ADS_EMBED_TEMPLATE = utils.project.absolute(
  'frontend/templates/views/examples/embed-ads.j2'
);
// Where to store the embeds for Grow
const EMBED_DEST = utils.project.absolute('dist/examples/embeds');
// Base to define the request path for Grow
const ROUTE_BASE = '/documentation/examples';
// Path to store the cache in
const CACHE_DEST = utils.project.absolute('.cache/examples.json');
// Path the all source files are written to, to vend them via express
const SOURCE_DEST = utils.project.absolute('dist/examples/sources');
// The API host used by samples depending on one
const API_HOST = 'https://amp-by-example-api.appspot.com';
// The host used for samples depending on a backend
const BACKEND_HOST = 'https://ampbyexample.com';
// The path where the playground's example sitemap is written
const SITEMAP_DEST = utils.project.absolute(
  'examples/static/samples/samples.json'
);
// The path where the playground's example sitemap is written
const COMPONENT_SAMPLES_DEST = utils.project.absolute(
  'pages/shared/data/componentSamples.json'
);

class SamplesBuilder {
  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Samples builder',
    });

    // Used to cache various properties to save computing time
    this._cache = {};
    this._cache.categories = {};
    // Holds all relevant sample informations after samplew have been parsed
    this._sitemap = {};
    // Used to gather samples categorized by their used components
    this._componentSamples = {};
  }

  /**
   * Executes all async operations that need to be done
   * before the samples builder is operational
   * @return {Promise<void>} Resolves when bootstrapping is done
   */
  async _bootstrap() {
    if (this._bootstrapped) {
      return;
    }

    this._log.info('Bootstrapping ...');
    await Promise.all([
      readFileAsync(STORY_EMBED_SNIPPET).then((template) => {
        this._cache[STORY_EMBED_SNIPPET] = template.toString();
        this._log.success('Loaded story embed template.');
      }),

      readFileAsync(ADS_EMBED_TEMPLATE).then((template) => {
        this._cache[ADS_EMBED_TEMPLATE] = template.toString();
        this._log.success('Loaded ads embed template.');
      }),

      formatTransform
        .getInstance()
        .then((instance) => {
          this._formatTransform = instance;
          this._log.success('Created format transformer instance.');
        })
        .catch((e) => {
          this._log.warn(
            'Could not create format transformer instance. Samples will only be build for their original format.'
          );
        }),

      del(
        [
          `${DOCUMENTATION_DEST}/**/*.html`,
          `${DOCUMENTATION_DEST}/**/*.json`,
          `${PREVIEW_DEST}/**/*.html`,

          SOURCE_DEST,
          EMBED_DEST,

          SITEMAP_DEST,
          COMPONENT_SAMPLES_DEST,
        ],
        {
          'force': true,
        }
      ).then(() => {
        this._log.success('Cleaned destination paths.');
      }),
    ]);

    this._bootstrapped = true;
  }

  /**
   * Builds samples and previews, optionally watching for changes.
   * @param {boolean} watch  Watch for changes
   * @return {Promise<void>} Resolves when build is done
   */
  async build(incrementalBuild = false) {
    await this._bootstrap();

    if (config.isDevMode() && module.parent && !incrementalBuild) {
      this._watch();
    }

    if (!incrementalBuild) {
      this._log.start('Building samples ...');
    }

    return new Promise(async (resolve, reject) => {
      let stream = gulp.src(
        [
          `${SAMPLE_SRC}/*/*.html`,
          `${SAMPLE_SRC}/*/*/*.html`,
          `!**/*embed.html`,
        ],
        {'read': true}
      );

      stream = stream.pipe(once({file: false}));

      const sampleBuilds = [];

      stream = stream.pipe(
        through.obj((sample, encoding, callback) => {
          sampleBuilds.push(this._buildSample(sample, callback, stream));
        })
      );

      await Promise.all(sampleBuilds);

      stream.pipe(
        gulp.dest((file) => {
          file.dirname = `${SAMPLE_SRC}/${this._getCategory(file)}`;
          if (file.isSourceFile) {
            return SOURCE_DEST;
          } else if (file.isPreview) {
            // Remove double name from path to flatten structure for Grow
            file.dirname = `${SAMPLE_SRC}`;
            return PREVIEW_DEST;
          } else if (file.isEmbed) {
            return EMBED_DEST;
          } else {
            // Remove double name from path to flatten structure for Grow
            file.dirname = `${SAMPLE_SRC}`;
            return DOCUMENTATION_DEST;
          }
        })
      );

      stream.on('error', (error) => {
        this._log.fatal('There was an error building the samples', error);
        reject(error);
      });

      stream.on('end', async () => {
        if (!incrementalBuild) {
          // Only write meta files on first build as they rely on all
          // samples going through the pipeline
          await this._writeMetaFiles();
          this._log.complete('Built samples.');
        } else {
          this._log.success('Built changed samples.');
        }

        resolve();
      });
    });
  }

  async _buildSample(sample, callback, stream) {
    try {
      this._log.await(`Building sample ${sample.relative} ...`);
      const {document} = await this._parseSample(sample);

      const isWebSample = document.formats().includes(FORMAT_WEBSITES);
      // Only samples that have been originally written for AMP for websites
      // can be transformed and only if validator.json could be fetched
      const shouldTransform =
        this._formatTransform &&
        isWebSample &&
        !document.metadata.disableTransform &&
        !document.metadata.hideCode &&
        !document.metadata.disablePlayground &&
        !document.metadata.hidePreview;

      const samples = [];
      if (!shouldTransform) {
        samples.push(sample);
      } else {
        for (const format of this._formatTransform.getSupportedFormats()) {
          const transformed = this._transformSample(sample, format);
          if (transformed) {
            samples.push(transformed);
          }
        }
      }
      await Promise.all(
        samples.map(async (sample) => {
          const parsedSample = await this._parseSample(sample);

          // Skip samples that are drafts for all envs except development
          if (
            parsedSample.document.metadata.draft &&
            config.environment !== 'development'
          ) {
            return;
          }

          if (
            !parsedSample.document.metadata.disablePlayground &&
            !parsedSample.document.metadata.draft
          ) {
            this._addToSitemap(sample, parsedSample);
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
        })
      );
    } catch (error) {
      this._log.error(error);
    }

    this._log.success(`Built sample ${sample.relative}!`);
    callback();
  }

  /**
   * Parse a sample source file into a JSON using the parser from the
   * ampbyexample.com package and while doing so updates some fields
   * @param {Vinyl} sample     The file from which the sample is parsed
   * @return {Promise<Object>} The sample parsed by abe.com
   */
  async _parseSample(sample) {
    // maintain reference to real path so this function can be called multiple
    // times on the same sample without mangling the real path if normalized
    sample.realPath = sample.realPath || sample.path;
    const samplePath = sample.realPath;

    // normalize sample path in case it's defined in a directory
    if (sample.path.endsWith('/index.html')) {
      sample.path = path.dirname(sample.path) + '.html';
    }

    const platformHost = config.getHost(config.hosts.platform);
    const websocketHost = config.getHost(config.hosts.websocket);

    const parsedSample = await abe.parseSample(
      samplePath,
      {
        'base_path': `${platformHost}${this._getBaseRoute(sample)}`,
        'canonical': `${platformHost}${this._getDocumentationRoute(sample)}`,
        'preview': `${platformHost}${this._getPreviewRoute(sample)}`,
        'hosts': {
          'platform': platformHost,
          'api': API_HOST,
          'websocket': websocketHost,
          'backend': BACKEND_HOST,
          'preview': config.hosts.preview.base,
        },
      },
      sample.contents.toString()
    );

    // Transformed sample files end with ".<format>", e.g. "amp-list.email".
    if (parsedSample.document.title.match(/\.[a-z]+$/)) {
      parsedSample.isTransformed = true;
      // Strip the ".<format>" suffix to have the same title as the original.
      parsedSample.document.title = parsedSample.document.title.replace(
        /\.[a-z]+$/,
        ''
      );
    }

    // parsedSample.filePath is absolute but needs to be relative in order
    // to use it to build a URL to GitHub
    parsedSample.filePath = parsedSample.filePath.replace(
      path.join(__dirname, '../../../'),
      ''
    );

    // Add the delivery path of the manual for preview rendering
    parsedSample.route = this._getDocumentationRoute(sample);

    // Rewrite some markdown to be consumable by Grow
    for (const section of parsedSample.document.sections) {
      // Unwrap code snippet from wrapping divs and remove trailing whitespace
      section.code = section.codeSnippet();

      // get the markdown with the 'doc' method that does additional whitespace alignment
      let markdown = section.doc;
      // Replace GitHub sourcecode syntax by python-markdown
      markdown = MarkdownDocument.rewriteCodeBlocks(markdown);
      markdown = MarkdownDocument.escapeMustacheTags(markdown);

      // Splice out sourcecode blocks to preserve whitespace
      const codeBlocks = {};
      const CODE_BLOCK_PATTERN = /\[sourcecode.*?\[\/sourcecode]/gms;
      markdown = markdown.replace(CODE_BLOCK_PATTERN, (match) => {
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
      for (const hash of Object.keys(codeBlocks)) {
        markdown = markdown.replace(hash, codeBlocks[hash]);
      }

      section.doc_ = markdown;
    }

    return parsedSample;
  }

  /**
   * Transforms a sample from the web AMP format to the given format.
   * @param {Vinyl} sample  The sample to transform
   * @param {string} format Target format
   * @return {Vinyl}
   */
  _transformSample(sample, format) {
    if (!this._formatTransform.supportsFormat(format)) {
      return null;
    }
    const transformed = sample.clone({contents: false});
    if (format !== FORMAT_WEBSITES) {
      transformed.extname = `.${format}.html`;
    }
    const {
      transformedContent,
      validationResult,
    } = this._formatTransform.transform(transformed.contents, format);
    if (validationResult && validationResult.status !== 'PASS') {
      return null;
    }
    transformed.contents = Buffer.from(transformedContent);
    return transformed;
  }

  /**
   * Adds a sample to the sitemap object for the playground to then render
   * a list of available samples
   * @param {Vinyl} sample        The file from which the sample is parsed
   * @param {Object} parsedSample The parsed sample
   */
  _addToSitemap(sample, parsedSample) {
    for (const format of parsedSample.document.formats()) {
      const formatCategories = this._sitemap[format] || {};

      const category = require(path.join(
        SAMPLE_SRC,
        this._getCategory(sample, true),
        'index.json'
      ));
      const categorySamples = formatCategories[category.publicName] || {
        'name': category.publicName,
        'examples': [],
      };
      categorySamples.examples.push({
        'title': parsedSample.document.title,
        'url':
          `${config.getHost(config.hosts.preview)}` +
          this._getSourceRoute(sample),
      });

      formatCategories[category.publicName] = categorySamples;
      this._sitemap[format] = formatCategories;
    }
  }

  /**
   * Takes what has been saved to this._sitemap and this._componentSamples
   * for use in playground and component documentation
   * @type {Vinyl}
   */
  async _writeMetaFiles() {
    for (const [format, categories] of Object.entries(this._sitemap)) {
      this._sitemap[format] = {
        'title': format,
        'name': format,
        'categories': [],
      };

      for (const [name, category] of Object.entries(categories)) {
        this._sitemap[format].categories.push({
          'name': name,
          'examples': category.examples,
        });
      }
    }

    // Sort component samples to always have the specific component
    // sample at first
    for (const component of Object.keys(this._componentSamples)) {
      this._componentSamples[component] = Object.values(
        this._componentSamples[component]
      );

      this._componentSamples[component].sort((sample1, sample2) => {
        return sample1.title.startsWith(component) ? 1 : 0;
      });
    }

    try {
      await Promise.all([
        writeFileAsync(SITEMAP_DEST, JSON.stringify(this._sitemap), {
          flag: 'w+',
        }).then(() => {
          this._log.success('Wrote sample sitemap.');
        }),

        writeFileAsync(
          COMPONENT_SAMPLES_DEST,
          JSON.stringify(this._componentSamples),
          {
            flag: 'w+',
          }
        ).then(() => {
          this._log.success('Wrote component samples map.');
        }),
      ]);
    } catch (e) {
      this._log.error('Writing samples builder meta files failed', e);
    }
  }

  /**
   * Parses the category from a sample path which is the first level
   * directory name after the base path
   * @param  {Vinyl}   sample    The sample from the gulp stream
   * @param  {Boolean} [ordered] Flag if the ordinal number should be included
   * @return {string}            The category
   */
  _getCategory(sample, ordered = false) {
    // Check if the category has already been computed
    let category = this._cache.categories[sample.realPath];
    if (!category) {
      category = sample.dirname.replace(`${SAMPLE_SRC}/`, '');
      category = category.split('/')[0];

      this._cache.categories[sample.realPath] = category;
    }

    // Check if the category should contain ordinal
    if (!ordered) {
      return category.replace(/^\d+./, '');
    }

    return category;
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for routing and build other URLs
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {string}       The route
   */
  _getBaseRoute(sample) {
    return `${ROUTE_BASE}/${this._getCategory(
      sample
    )}/${sample.stem.toLowerCase()}`;
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for routing and source canonical
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {string}       The route
   */
  _getDocumentationRoute(sample) {
    let base = this._getBaseRoute(sample);
    if (!base.endsWith('/index.html')) {
      base += '/index.html';
    }
    return base;
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for the previews
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {string}       The route
   */
  _getPreviewRoute(sample) {
    return this._getBaseRoute(sample) + '/preview/index.html';
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for the source files
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {string}       The route
   */
  _getSourceRoute(sample) {
    return `${this._getBaseRoute(sample)}`;
  }

  /**
   * Takes the path of the sample vinyl and creates a server relative URL
   * to use for the source files
   * @param  {Vinyl} sample The sample from the gulp stream
   * @return {string}       The route
   */
  _getEmbedRoute(sample) {
    return `${this._getBaseRoute(sample)}/embed`;
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

    // List of metadata properties to transfer from sample header to
    // markdown header.
    const metadataToTransfer = ['author', 'translator', 'contributors'];

    const header = {
      '$$injectAmpDependencies': false,
      '$title': parsedSample.document.title,
      '$view': DOCUMENTATION_TEMPLATE,
      '$category': this._getCategory(sample, true),
      '$path': this._getDocumentationRoute(sample),
      '$localization': {
        'path': `/{locale}${this._getDocumentationRoute(sample)}`,
      },
      'description': parsedSample.document.description(),
      'source': this._getSourceRoute(sample),
    };

    for (const metadataProperty of metadataToTransfer) {
      if (parsedSample.document.metadata[metadataProperty]) {
        header[metadataProperty] =
          parsedSample.document.metadata[metadataProperty];
      }
    }

    // Build actual file needed for Grow to render the documentation
    manual.contents = Buffer.from(
      [
        '---',
        yaml.dump(header, {'lineWidth': 500}),
        // Add example manually as constructors may not be quoted
        `example: !g.json /${DOCUMENTATION_POD_PATH}/${manual.stem}.json`,
        // ... and some additional information that is used by the example teaser
        this._getTeaserData(sample, parsedSample),
        '---',
      ].join('\n')
    );
    manual.extname = '.html';

    // ... and the parsed sample as data source to render the manual
    const data = manual.clone();
    data.contents = Buffer.from(JSON.stringify(parsedSample));
    data.extname = '.json';

    // TODO: remove this when we add support for transformed samples in docs.
    if (parsedSample.isTransformed) {
      return [data];
    }

    return [manual, data];
  }

  /**
   * Builds a YAML string that is added to the manual document to
   * build a nice teaser for the sample
   * @param  {Object} parsedSample
   * @return {string}
   */
  _getTeaserData(sample, parsedSample) {
    const teaserData = {};
    teaserData.formats = parsedSample.document.formats();
    teaserData.used_components = this._getUsedComponents(sample, parsedSample);

    if (parsedSample.document.metadata.teaserImage) {
      teaserData.teaser = {
        'image': {
          'src': parsedSample.document.metadata.teaserImage,
        },
      };
    }

    return yaml.dump(teaserData, {'lineWidth': 500});
  }

  /**
   * Parses all components used in sample and gives them back as an Array
   * @param  {Object} parsedSample
   * @return {Object}
   */
  _getUsedComponents(sample, parsedSample) {
    // Dirty RegEx to quickly parse component names from head
    const COMPONENT_PATTERN = /<script[^>]*?custom-(?<type>[a-z]+)="(?<name>[^"]+)"[^>]*src="[^"]+-(?<version>\d+(\.\d+)*)\.js"[^>]*>\s*<\/script>/g;

    const usedComponents = {};
    parsedSample.document.head.replace(
      COMPONENT_PATTERN,
      (script, type, name, version) => {
        usedComponents[name] = {
          version,
          type,
        };
      }
    );

    // Store the sample by it's used component to show all samples for a specific
    // component on its documentation page
    for (const [name, info] of Object.entries(usedComponents)) {
      if (!this._componentSamples[name]) {
        this._componentSamples[name] = {};
      }

      const title = parsedSample.document.title;
      const formats = parsedSample.document.formats();
      if (!this._componentSamples[name][title]) {
        this._componentSamples[name][title] = {
          title: title,
          url: this._getDocumentationRoute(sample),
          formats: formats,
        };
      } else {
        this._componentSamples[name][title].formats.concat(formats);
      }
    }

    return usedComponents;
  }

  /**
   * Creates various HTML documents that are then served statically for
   * use in playground and its embeds
   * @param  {Vinyl}  sample       The sample from the gulp stream
   * @param  {Object} parsedSample The sample parsed by abe.com
   * @return {Array<Vynyl>}        An array of Vinyl files to write
   */
  _buildRawSources(sample, parsedSample) {
    const sources = [];

    // Keep the full sample for the big playground
    const fullSource = sample.clone();
    fullSource.contents = Buffer.from(parsedSample.source);
    fullSource.basename = fullSource.basename.toLowerCase();
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
      sectionSource.basename = sectionSource.basename.toLowerCase();
      sectionSource.contents = Buffer.from(contents);
      sectionSource.extname = `-${section.id}.html`;

      sources.push(sectionSource);
    }

    return sources;
  }

  /**
   * Renders embedabble preview versions - only valid for AMP story samples
   * that need a JS snippet attached
   * @param  {Vinyl} sample
   * @param  {Object} parsedSample
   * @return {Array<Object>}
   */
  _renderEmbed(sample, parsedSample) {
    // Render embed file for stories enabling to jump to a stories page given
    // via GET parameter, for ads to show in the preview
    if (parsedSample.document.isAmpStory || parsedSample.document.isAmpAds) {
      const embed = sample.clone();
      embed.dirname = `${embed.dirname}/${this._getCategory(sample)}`;
      embed.basename = embed.basename.toLowerCase();
      embed.isEmbed = true;

      if (parsedSample.document.isAmpStory) {
        embed.contents = Buffer.from(
          parsedSample.source.replace(
            '</body>',
            `<script>${this._cache[STORY_EMBED_SNIPPET]}</script></body>`
          )
        );
      }

      if (parsedSample.document.isAmpAds) {
        const adsEmbed = nunjucks.renderString(
          this._cache[ADS_EMBED_TEMPLATE],
          {
            'metadata': parsedSample.document.metadata,
            'canonical':
              `${config.getHost(config.hosts.platform)}` +
              `${this._getDocumentationRoute(sample)}`,
            'source': this._getSourceRoute(sample),
            'title': parsedSample.document.metadata,
          }
        );
        embed.contents = Buffer.from(adsEmbed);
      }

      return [embed];
    }

    return [];
  }

  /**
   * Creates another document in the Grow pod used to show the preview
   * @param  {Vinyl} sample The sample from the gulp stream
   * @param  {Object} parsedSample The sample parsed by abe.com
   * @return {Vinyl}
   */
  _createPreview(sample, parsedSample) {
    // Check if the sample should have a preview at all
    if (
      !(
        parsedSample.document.metadata.preview ||
        parsedSample.document.isAmpStory
      )
    ) {
      return [];
    }

    const preview = sample.clone();

    // Set flag to determine correct output location
    preview.isPreview = true;
    preview.contents = Buffer.from(
      [
        '---',
        yaml.dump(
          {
            '$title': parsedSample.document.title,
            '$view': PREVIEW_TEMPLATE,
            '$category': this._getCategory(sample),
            '$path': this._getPreviewRoute(sample),
            '$localization': {
              'path': `/{locale}${this._getPreviewRoute(sample)}`,
            },
            '$sitemap': {
              'enabled': false,
            },
            'formats': parsedSample.document.formats(),
            'source': this._getSourceRoute(sample),
            'embed': this._getEmbedRoute(sample),
          },
          {'lineWidth': 500}
        ),
        `example: !g.json /${DOCUMENTATION_POD_PATH}/${preview.stem}.json`,
        '---',
      ].join('\n')
    );

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
  samplesBuilder: new SamplesBuilder(),
  SOURCE_DEST: SOURCE_DEST,
};
