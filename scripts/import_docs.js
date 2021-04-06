#!/usr/bin/env node

const github = require('octonode');
const fs = require('fs');
const path = require('path');
const request = require('request');

const clientSecret = process.argv[2] || process.env.AMP_DOC_SECRET;
const clientId = process.argv[3] || process.env.AMP_DOC_ID;
const clientToken = process.env.AMP_DOC_TOKEN;
const localPath = process.env.AMP_DOC_LOCAL_PATH;

const importData = require('./import_docs.json');
const subfolderLookupTable = require('./component_categories.json');

// Matches tags used for SSR
const NUNJUCKS_PATTERN = /\[(?:%|=|#)|(?:%|=|#)\]/g;

// Matches a block of frontmatter delimited by ---
const FRONTMATTER_PATTERN = /^---\r?\n.*\r?\n---\r?\n/ms;

const JINJA2_RAW_BLOCK = /\{%\s*raw\s*%\}(?:(?!\{%\s*endraw\s*%\})[\s\S])*\{%\s*endraw\s*%\}/;

// This expression matches source code blocks. fenced blocks are converted to this syntax
const SOURCECODE_BLOCK = /\[\s*sourcecode[^\]]*\][\s\S]*?\[\s*\/\s*sourcecode\s*\]/;

// we search for ALL code blocks, and at the same time for raw blocks
// to ensure we do not match something that belongs to different code blocks
// or we add raw tags to existing raw blocks
const MARKDOWN_BLOCK_PATTERN = new RegExp(
  JINJA2_RAW_BLOCK.source +
    '|' +
    SOURCECODE_BLOCK.source +
    '|' +
    /`[^`]*`/.source,
  'g'
);

// Inside code blocks we search for mustache expressions
// The constant 'server_for_email' and expressions with a dot or a bracket are not considered mustache
// TODO: Avoid the need to distinguish between mustache and jinja2
const MUSTACHE_PATTERN = new RegExp(
  '(' +
    JINJA2_RAW_BLOCK.source +
    '|' +
    /\{\{(?!\s*server_for_email\s*\}\})(?:[\s\S]*?\}\})?/.source +
    ')',
  'g'
);


/**
 * Rewrites code fences to python-markdown syntax.
 * @param  {String} contents
 * @return {String}          The rewritten content
 */
function rewriteCodeBlocks(contents) {
  // Ensure valid quotation marks are used in code blocks
  contents = contents.replace(/[“”„‟]/g, `"`);

// Rewrite code blocks in fence syntax
contents = contents.replace(
/(```)(([A-z-]*)\n)(((?!```)[\s\S])+)(```[\t ]*\n)/gm,
    (match, p1, p2, p3, p4) => {
      return (
        '[sourcecode' +
        (p3 ? ':' + p3 : ':none') +
        ']\n' +
        p4 +
        '[/sourcecode]\n'
      );
    }
  );

  return contents;
}

/**
 * Escapes mustache style tags in code blocks to not interfer with Jinja2
 * @param  {String} contents
 * @return {String}          The rewritten input
 */
function escapeMustacheTags(contents) {
  // the new content breaks the build, and we don't ever actually display it, we just use this site to forward to amp.dev. As a result, return nothing here to get the build functional
  return contents.replace(MARKDOWN_BLOCK_PATTERN, (block) => '');
}

/**
 * Escapes nunjucks tags to not interfer with SSR
 * @param  {String} contents
 * @return {String}          The rewritten input
 */
function escapeNunjucksTags(contents) {
  return contents.replace(NUNJUCKS_PATTERN, (tag) => {
    // TODO(matthiasrohmer): Raw tags for nunjucks do not match.
    // See: github.com/ampproject/amp.dev#2865
    return `{{'[% raw %]'}}${tag}{{'{% endraw %}'}}`;
  });
}


if(!(clientToken || (clientSecret && clientId))) {
  console.error('This script reads the reference docs from GitHub which requires providing either a GitHub personal access token (AMP_DOC_TOKEN) or GitHub application id/secret (AMP_DOC_ID and AMP_DOC_SECRET).  See README.md for more information.');
  process.exit(1);
}

// initialize Github API client
const client = github.client(
  clientToken || {
    id: clientId,
    secret: clientSecret
  });

const ghrepo = client.repo('ampproject/amphtml');
let latestReleaseTag = null;

/*
 *  Downloads a markdown page from a Github repo folder.
 */
function downloadPage(filePath, headingToStrip) {

  return new Promise(resolve => {

    let process = function (err, data) {

      if (err || data && data.content !== undefined && !data.content.length) {

        console.error(`Error importing ${filePath}`);
        throw err || 'Skipping ' + filePath + ', file is empty..';

      }

      let encodedContent = new Buffer(data.content || data, 'base64');
      let decodedContent = encodedContent.toString();

      // we need to concert some of the markdown from Github flavor to Jekyll flavor
      let relativePath = filePath.substr(0, filePath.lastIndexOf('/'));
      let title = decodedContent.match(/^#{1}\s.+<\/a>\s(.+)/m);
      title = title ? title[1].replace(/`/g, '') : null;
      decodedContent = convertMarkdown(decodedContent, relativePath, headingToStrip);

      resolve([ decodedContent, title ]);

    };

    if (localPath) {
      fs.readFile(path.resolve(localPath, filePath), process);
    } else {
      ghrepo.contents(filePath, latestReleaseTag, process);
    }

  });

}

/*
 *  Gets AMP component dependencies for a page, so the page runs
 */
function getDependencies(content) {

  var dependencies = content
    // remove all sourcecode blocks to not match false positives
    .replace(/\[sourcecode:?[^\]]*\](((?!\[\/sourcecode\])[\s\S])+)\[\/sourcecode\]/gm, '\n')
    // remove inline code
    .replace(/`[^`]+`/g, '')
    // find all used amp tags in the page
    .match(/<amp-((?!img[/\s>])[^>\s]+)[^>]*>/g);

  return dependencies ? Array.from(new Set(dependencies.map(item => item.match(/<amp-((?!img[/\s>])[^>\s]+)[^>]*>/)[1]))) : null;

}

/**
 * Replaces --- (<hr>) with *** as former one collides with
 * Grow's way of extracting the frontmatter
 * @param  {String} contents
 * @return {String}          The rewritten input
 */
function replaceDelimiters(contents) {
  return contents.replace(/\n---\n/gm, '\n***\n');
}

/*
 *  Saves a markdown page to the file system
 */
function savePage(config, callback) {

  let optionalTOC = config.content.indexOf('[TOC]') > -1 ? 'toc: true\n' : '';
  let optionalCategory = (config.category ? '\n$category: ' +  config.category : '');
  let optionalGroup = (config.group ? '\ngroup: ' + config.group : '');
  let optionalDependencies = getDependencies(config.content);
  optionalDependencies = optionalDependencies ? '\ncomponents:\n' + '  - ' + optionalDependencies.join('\n  - ') + '\n' : '';

  let frontMatter = `---
$title: "${config.title}"
$order: ${config.order || 0}${optionalCategory}${optionalGroup}
${optionalTOC}${optionalDependencies}---
`;

  fs.writeFile(config.destination, frontMatter + config.content, callback);

}

function convertMarkdown(content, relativePath, headingToStrip) {

  // remove inline format filter, since they don't exist in this old version of the site and break the build
  content = content.replace(/{%\s*if not format=='email'\s*%}([^{]+){%\s*endif\s*%}/g, '$1');
  content = content.replace(/{%\s*if format=='stories'\s*%}[^{]+{%\s*endif\s*%}/g, '');

  content = content.replace(FRONTMATTER_PATTERN, '');

  content = replaceDelimiters(content);

  content = rewriteCodeBlocks(content);

  content = escapeMustacheTags(content);

  content = escapeNunjucksTags(content);

  // strip out first heading
  content = content.replace(headingToStrip === 1 ? (/^#{1}\s.+/m) : (/^#{3}\s.+/m), '');

  // this regular expression is crazy. Adds a newline before lists so they are parsed
  // as proper lists by Jekyll.
  content = content.replace(/(\n(?![^\S\n]*\*[^\S\n])(?![^\S\n]*-)[^\n]+\n)([^\S\n]*?(?!\*\*)((-\s)|(\*\s)|(1\.\s)))/gm, '$1\n$2');

  // for comments to be parsed correctly as HTML, we need an extra line break
  content = content.replace('<!---', '\n<!---');

  // replace code blocks

  // remove front matter (only relevant for this legacy importer)
  content = content.replace(/---[^!]+---/gm, '');

  // horizontal rules like --- will break front matter
  content = content.replace(/\n---\n/gm, '\n- - -\n');

  // create absolute urls from relative github urls
  content = content.replace(/\[([^\]]+)\]\((?!http|#)([^\)]+)\)/g, '[$1](https://github.com/ampproject/amphtml/blob/master/' + relativePath + '/$2)');

  return content;
}


/*
 * Downloads specially defined pages on special paths
 */

async function importSpecialPages() {

  for (let page of importData) {

    const response = await downloadPage(page.from, 1);
    const pageContent = response[0];

    savePage({
      destination: '../content/' + page.to,
      content: (page.toc ? '[TOC]\n' : '') + pageContent,
      title: page.title,
      order: page.order,
      category: (page.category ? page.category : ''),
      group: (page.group ? page.group : '')
    }, err => {
      if (err) throw err;
      console.log('Successfully imported: ' + page.title);
    });

  }

}

/*
 * Download built-in AMP component ref docs
 */
async function downloadBuiltins() {

  const response = await ghrepo.contentsAsync('builtins', latestReleaseTag);
  const data = response[0];
  const components = data.filter(obj => /amp-.*\.md/.test(obj.name));

  for (let component of components) {

    // if we don't know how to categorize this one, warn and skip
    let subfolder = subfolderLookupTable[component.name.replace(/\.md$/, '')];
    if (!subfolder) {
      console.warn('Warning: Don\t know how to categorize ' + component.name + ', skipping..');
      continue;
    }

    let page = await downloadPage(component.path, 1);
    let pageContent = page[0];

    savePage({
      destination: '../content/reference/components/' + subfolder + '/' + component.name,
      content: pageContent,
      title: component.name.replace('.md', '') + ' (Built-in)'
    }, err => {
      if (err) throw err;
      console.log('Successfully imported: ' + component.name + ' (Built-in)');
    });

  }

}

/*
 * download extension component ref docs
 */
async function downloadExtensions() {

  let response = await ghrepo.contentsAsync('extensions', latestReleaseTag);
  const components = response[0].filter(obj => obj.type === 'dir');

  var index = 0;
  for (const component of components) {

    let order = index;
    let response = await ghrepo.contentsAsync(component.path, latestReleaseTag);
    let data = response[0];

    // fish out the markdown file from the folder
    let subComponent;
    for (var i = 0; i < data.length; i++) {
      if(data[i].type === 'file' && data[i].name === component.name + '.md') {
        subComponent = data[i];
        break;
      }
    }

    // if there's nothing in the folder for some reason, skip
    if (!subComponent) {
      console.warn('Warning: Don\'t know what to do with ' + component.name + ', skipping..');
      continue;
    }

    // if we don't know how to categorize this one, warn and skip
    var subfolder = subfolderLookupTable[subComponent.name.replace(/\.md$/, '')];
    if (!subfolder) {
      console.warn('Warning: Don\'t know how to categorize ' + subComponent.name + ', skipping..');
      continue;
    }

    // download the page contents
    let page = await downloadPage(subComponent.path, 1);
    let [ pageContent, title ] = page;
    title = title || subComponent.name.replace('.md', '');

    // save it to the extended folder (runs async, as independent from the Github API..)
    savePage({
      destination: '../content/reference/components/' + subfolder + '/' + subComponent.name,
      content: pageContent,
      order: order,
      parent: '/content/reference/components.md',
      title: title
    }, err => {
      if (err) throw err;
      //console.log('Successfully imported: ' + subComponent.name + ' ("' + title + '")');
    });

    index++;

  }

}

// before we download content, we first have to figure out the latest release tag,
// to make sure our docs always match the latest released AMP version.
client.get('/repos/ampproject/amphtml/releases/latest', {}, function (err, status, body) {

  latestReleaseTag = body.tag_name; // updates global var, used in the other functions
  if (!latestReleaseTag) {
    throw 'Error: Could not retrieve latest release from Github:' + '(body: ' + JSON.stringify(body) + ')';
  }

  importSpecialPages();
  downloadBuiltins();
  downloadExtensions();
});
