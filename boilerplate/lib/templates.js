/**
 * Copyright 2016 Google Inc. All Rights Reserved.
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

const Handlebars = require('handlebars');
const io = require('./io');
const path = require('path');
const hljs = require('highlight.js');
const sass = require('sass');

const FRONTEND_DIR = '../../frontend/scss';
const TEMPLATES_DIR = '../templates';
const NODE_MODULES = '../../node_modules';
const STYLES = path.join(TEMPLATES_DIR, 'styles');

const INCLUDE_PATHS = [FRONTEND_DIR, NODE_MODULES, STYLES].map((dir) =>
  path.join(__dirname, dir)
);

Handlebars.registerHelper('scss', (scssPath) => {
  for (const includePath of INCLUDE_PATHS) {
    const templatePath = path.join(includePath, scssPath);
    if (io.fileExists(templatePath)) {
      const result = sass.renderSync({
        file: templatePath,
        includePaths: INCLUDE_PATHS,
      });
      return new Handlebars.SafeString(
        result.css.toString().replace('@charset "UTF-8";', '')
      );
    }
  }
  throw new Error('File not found ' + scssPath);
});

const PARTIALS_DIR = '../partials/';
const ICONS_DIR = '../../../frontend/icons/';

const REGEX_SECTION_START = /(\s*)\{\{#([^\}]+)\}\}(\s*)/gm;
const REGEX_SECTION_END = /(\s*)\{\{\/([^\}]+)\}\}(\s*)/gm;

function renderTemplate(template, context = {}) {
  return Handlebars.compile(template, {compat: true})(context);
}

function findTemplates(dir) {
  const templates = {};
  const partials = findPartials(path.join(dir, PARTIALS_DIR));
  Handlebars.registerPartial(partials);
  const icons = findPartials(path.join(dir, ICONS_DIR));
  Handlebars.registerPartial(icons);
  io.listFiles(dir).forEach((name) => {
    const templateName = path.basename(name, path.extname(name));
    templates[templateName] = readTemplate(name);
  });
  return templates;
}

function readTemplate(name) {
  let string = io.readFile(name);
  string = renderTemplate(string);
  let ext = path.extname(name).substring(1);
  if (ext === 'js') {
    ext = 'javascript';
  }
  string = hljs.highlight(string, {language: ext}).value;
  if (ext === 'html') {
    string = highlightSections(string);
  }
  return string;
}

function highlightSections(string) {
  string = string.replace(REGEX_SECTION_START, replaceStartTag);
  string = string.replace(REGEX_SECTION_END, replaceEndTag);
  return string;
}

function replaceStartTag(match) {
  const replacement = `${match}<mark class="highlight-block">`;
  return replacement;
}
function replaceEndTag(match) {
  const replacement = `</mark>${match}`;
  return replacement;
}

function findPartials(dir) {
  const partialFiles = io.listFiles(dir, [], true);
  return partialFiles
    .map((f) => {
      const name = f.replace(dir, '');
      const content = io.readFile(f, 'utf-8');
      return [name, content];
    })
    .reduce((obj, prop) => {
      obj[prop[0]] = prop[1];
      return obj;
    }, {});
}
module.exports.find = findTemplates;
module.exports.render = renderTemplate;
