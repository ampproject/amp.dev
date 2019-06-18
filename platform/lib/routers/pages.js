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

'use strict';

const express = require('express');
const fs = require('fs');
const path = require('path');
const config = require('@lib/config');
const project = require('@lib/utils/project');
const URL = require('url').URL;
const fetch = require('node-fetch');
const nunjucks = require('nunjucks');

/**
 * Transforms a request URL to match the defined scheme: has trailing slash,
 * doesn't have a HTML file extension
 * @param  {String} originalUrl
 * @return {URL}    The eventually rewritten URL
 */
function ensureUrlScheme(originalUrl) {
  const url = new URL(originalUrl, config.hosts.platform.base);

  // Get rid of former .amp.html file extension for legacy support
  if (url.pathname.endsWith('.amp.html')) {
    url.pathname = url.pathname.slice(0, -9);
  }

  // Get rid of .html file extension
  if (url.pathname.endsWith('.html')) {
    url.pathname = url.pathname.slice(0, -5);
  }

  // Ensure there is a trailing slash
  if (!url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`;
  }

  return url;
}

/**
 * Fetches the requested document's either by requesting the Grow development
 * server (during development) or the pages build destination (all other environments)
 * @param  {String}       pagePath Where the page can potentially be found
 * @return {null|String}  The pages contents if it can be found
 */
async function getPageContents(pagePath) {
  const AVAILABLE_STUBS = ['.html', '/index.html', ''];
  let contents = null;

  // TODO(matthiasrohmer): Implement LRU cache to speed up resolving

  // The page path has been ensured to always have a trailing slash which isn't
  // needed to find a matching page file
  pagePath = pagePath.slice(0, -1);

  for (const stub of AVAILABLE_STUBS) {
    const searchPath = `${pagePath}${stub}`;
    if (config.isDevMode()) {
      contents = await fetchPageFromGrow(searchPath);
    } else {
      contents = await readPageFromDisk(searchPath);
    }

    if (contents) {
      break;
    }
  }

  return contents;
}

/**
 * Fetches a path from the Grow development server
 * @param  {String}       searchPath Path of where the page can potentially be found
 * @return {null|String}  The pages contents if it can be found
 */
async function fetchPageFromGrow(searchPath) {
  const searchUrl = new URL(searchPath, config.hosts.pages.base);
  const response = await fetch(searchUrl.toString());

  if (response.status && response.status !== 404) {
    return response.text();
  }
}

/**
 * Reads a page from disk
 * @param  {String}       searchPath Path of where the page can potentially be found
 * @return {null|String}  The pages contents if it can be found
 */
function readPageFromDisk(searchPath) {
  return new Promise((resolve) => {
    fs.readFile(path.join(project.paths.PAGES_DEST, searchPath), (err, data) => {
      if (err) {
        resolve(null);
        return;
      }

      resolve(data);
    });
  });
}

/**
 * Builds a context object from the ongoing request to render templates
 * @param  {expressjs.Request} req Request to build the context from
 * @return {Object}  The template context
 */
function buildContext(req) {
  const context = {};

  const ALLOWED_FORMATS = ['websites', 'stories', 'ads', 'email'];
  context['format'] = (req.query.format || '').toLowerCase();
  if (!ALLOWED_FORMATS.includes(context.format)) {
    context.format = ALLOWED_FORMATS[0]
  }

  context['category'] = (req.query.category || '').toLowerCase();

  return context;
}

const nunjucksEnvironment = new nunjucks.Environment(null, {
  tags: {
    blockStart: '<!--%',
    blockEnd: '%-->',
    variableStart: '<!--[[',
    variableEnd: ']]-->',
    commentStart: '<!--#',
    commentEnd: '#-->',
  }
});

// eslint-disable-next-line new-cap
const pages = express.Router();

pages.get('/*', async (req, res, next) => {
  const url = ensureUrlScheme(req.originalUrl);
  if (url.pathname !== req.path) {
    res.redirect(url.toString());
    return;
  }

  const page = await getPageContents(url.pathname);
  if (!page) {
    next();
    return;
  }

  try {
    // Compile a template from the retrieved page
    const template = nunjucks.compile(page, nunjucksEnvironment);
    // Render the template with sanitized, relevant GET parameters
    const renderedPage = template.render(buildContext(req));

    res.send(renderedPage);
    return;
  } catch(e) {
    next(e);
  }
});

module.exports = pages;
