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

// To aid in future maintenance, this task closely resembles amphtml's prettify.
// https://github.com/ampproject/amphtml/blob/master/build-system/tasks/prettify.js

/**
 * @fileoverview This file implements the `npx gulp prettify` task, which uses
 * prettier to check (and optionally fix) the formatting in a variety of
 * non-JS files in the repo. (JS files are separately checked by eslint.)
 */
'use strict';

const argv = require('minimist')(process.argv.slice(2));
const fs = require('fs-extra');
const globby = require('globby');
const gulp = require('gulp');
const log = require('fancy-log');
const path = require('path');
const {paths} = require('@lib/utils/project.js');
const prettier = require('gulp-prettier');
const tempy = require('tempy');
const {green, cyan, red, yellow} = require('ansi-colors');
const {onTravis} = require('@lib/utils/travis.js');
const {sync: spawn} = require('cross-spawn');
const {echo} = require('shelljs');

const rootDir = paths.ROOT;
const tempDir = tempy.directory();
const prettierCmd = 'node_modules/.bin/prettier';

// TODO: Adopt prettier for other non-JS files in the repo.

const prettifyGlobs = [
  // '.travis.yml',
  // '**/*.yml',
  // '.eslintrc',
  // '.prettierrc':
  // '.renovaterc.json',
  // '.vscode/settings.json',
  // '**/*.json',
  // '**/*.js',
  '**/*.md',
  '!**/{.github,node_modules,build,dist,dist.3p,dist.tools,boilerplate/templates}/**',
];

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

const shellCmd = process.platform == 'win32' ? 'cmd' : '/bin/sh';
const shellFlag = process.platform == 'win32' ? '/C' : '-c';

/**
 * Spawns the given command in a child process with the given options.
 *
 * @param {string} cmd
 * @param {?Object} options
 * @return {!Object}
 */
function spawnProcess(cmd, options) {
  return spawn(shellCmd, [shellFlag, cmd], options);
}

/**
 * Executes the provided command, returning the process object.
 *
 * @param {string} cmd
 * @param {?Object} options
 * @return {!Object}
 */
function getOutput(cmd, options = {}) {
  const p = spawnProcess(cmd, {
    'cwd': options.cwd || process.cwd(),
    'env': options.env || process.env,
    'stdio': options.stdio || 'pipe',
    'encoding': options.encoding || 'utf-8',
  });
  return p;
}

/**
 * Executes the provided command, returning its stdout.
 *
 * @param {string} cmd
 * @param {?Object} options
 * @return {string}
 */
function getStdout(cmd, options) {
  return getOutput(cmd, options).stdout;
}

/**
 * Logs a message on the same line to indicate progress.
 *
 * @param {string} message
 */
function logOnSameLine(message) {
  if (!onTravis() && process.stdout.isTTY) {
    process.stdout.moveCursor(0, -1);
    process.stdout.cursorTo(0);
    process.stdout.clearLine();
  }
  log(message);
}

/**
 * Returns the merge base of the current branch off of future when running on
 * a local workspace.
 *
 * @return {string}
 */
function gitMergeBaseLocalFuture() {
  return getStdout('git merge-base future HEAD').trim();
}

/**
 * Returns the master baseline commit, regardless of running environment.
 *
 * @return {string}
 */
function gitFutureBaseline() {
  if (onTravis()) {
    return gitTravisFutureBaseline();
  }
  return gitMergeBaseLocalFuture();
}

/**
 * Returns the list of files changed relative to the branch point off of master,
 * one on each line.
 *
 * @return {!Array<string>}
 */
function gitDiffNameOnlyFuture() {
  const futureBaseline = gitFutureBaseline();
  return getStdout(`git diff --name-only ${futureBaseline}`)
    .trim()
    .split('\n');
}

/**
 * Returns the `future` parent of the merge commit (current HEAD) on Travis.
 * Note: This is not the same as origin/future (a moving target), since new
 * commits can be merged while a Travis build is in progress.
 * @see https://travis-ci.community/t/origin-master-moving-forward-between-build-stages/4189/6
 *
 * @return {string}
 */
function gitTravisFutureBaseline() {
  return getStdout('git merge-base origin/future HEAD').trim();
}

/**
 * Gets the list of files changed on the current branch that match the given
 * array of glob patterns.
 *
 * @param {!Array<string>} globs
 * @return {!Array<string>}
 */
function getFilesChanged(globs) {
  const allFiles = globby.sync(globs, {dot: true});
  return gitDiffNameOnlyFuture().filter(changedFile => {
    return fs.existsSync(changedFile) && allFiles.includes(changedFile);
  });
}

/**
 * Logs the list of files that will be checked and returns the list.
 *
 * @param {!Array<string>} files
 * @return {!Array<string>}
 */
function logFiles(files) {
  if (!onTravis()) {
    log(green('INFO: ') + 'Checking the following files:');
    for (const file of files) {
      log(cyan(file));
    }
  }
  return files;
}

/**
 * Gets a list of files to be checked based on command line args and the given
 * file matching globs. Used by tasks like prettify, check-links, etc.
 *
 * @param {!Array<string>} globs
 * @param {Object=} options
 * @return {!Array<string>}
 */
function getFilesToCheck(globs, options = {}) {
  if (argv.files) {
    return logFiles(globby.sync(argv.files.split(',')));
  }
  if (argv.local_changes) {
    const filesChanged = getFilesChanged(globs);
    if (filesChanged.length == 0) {
      log(green('INFO: ') + 'No files to check in this PR');
      return [];
    }
    return logFiles(filesChanged);
  }
  return globby.sync(globs, options);
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

// Message header print before the list of files with errors.
// See https://github.com/bhargavr/blob/master/index.js#L90
const header =
  'Code style issues found in the following file(s). Forgot to run Prettier?';

/**
 * Checks files for formatting (and optionally fixes them) with Prettier.
 *
 * @return {!Promise}
 */
function prettify() {
  const filesToCheck = getFilesToCheck(prettifyGlobs, {dot: true});
  if (filesToCheck.length == 0) {
    return Promise.resolve();
  }
  return runPrettify(filesToCheck);
}

/**
 * Prints an error message with recommended fixes (in diff form) for a file with
 * formatting errors.
 *
 * @param {string} file
 */
function printErrorWithSuggestedFixes(file) {
  console.log('\n');
  log(`Suggested fixes for ${cyan(file)}:`);

  const fixedFile = `${tempDir}/${file}`;
  fs.ensureDirSync(path.dirname(fixedFile));

  // Spawn Prettier synchronously.
  let result = spawn(`${prettierCmd}`, [`${file}`]);
  echo(result.stdout.toString('utf8')).to(`${fixedFile}`);

  // Spawn Git synchronously.
  result = spawn('git', [
    '-c',
    'color.ui=always',
    'diff',
    '-U0',
    `${file}`,
    `${fixedFile}`,
  ]);
  echo(result.stdout.toString('utf8')).tail({'-n': 5});
}

/**
 * Runs prettier on the given list of files.
 *
 * @param {!Array<string>} filesToCheck
 * @return {!Promise}
 */
function runPrettify(filesToCheck) {
  if (!onTravis()) {
    log(green('Starting checks...'));
  }
  return new Promise((resolve, reject) => {
    const onData = data => {
      if (!onTravis()) {
        logOnSameLine(green('Checked: ') + path.relative(rootDir, data.path));
      }
    };

    const rejectWithReason = reasonText => {
      const reason = new Error(reasonText);
      reason.showStack = false;
      reject(reason);
    };

    const printFixMessages = () => {
      log(
        yellow('NOTE 1:'),
        "If you are using GitHub's web-UI to edit files,",
        'copy the suggested fixes printed above into your PR.'
      );
      log(
        yellow('NOTE 2:'),
        'If you are using the git command-line workflow, run',
        cyan('npx gulp prettify --local_changes --fix'),
        'from your local branch.'
      );
      log(
        yellow('NOTE 3:'),
        'Since this is a destructive operation (that edits your files',
        'in-place), make sure you commit before running the command.'
      );
      log(
        yellow('NOTE 4:'),
        'For more information, read',
        cyan(
          'https://github.com/ampproject/amphtml/blob/master/contributing/getting-started-e2e.md#code-quality-and-style\n'
        )
      );
    };

    const onError = error => {
      if (error.message.startsWith(header)) {
        const filesWithErrors = error.message
          .replace(header, '')
          .trim()
          .split('\n');
        const reason = 'Found formatting errors in one or more files';
        logOnSameLine(red('ERROR: ') + reason);
        filesWithErrors.forEach(file => {
          printErrorWithSuggestedFixes(file);
        });
        printFixMessages();
        rejectWithReason(reason);
      } else {
        const reason = 'Found an unrecoverable error';
        log(red('ERROR: ') + reason + ':');

        log(error.message);
        rejectWithReason(reason);
      }
    };

    const onFinish = () => {
      if (!onTravis()) {
        logOnSameLine('Checked ' + cyan(filesToCheck.length) + ' file(s)');
      }
      resolve();
    };

    if (argv.fix) {
      return gulp
        .src(filesToCheck)
        .pipe(prettier())
        .on('data', onData)
        .on('error', onError)
        .pipe(gulp.dest(file => file.base))
        .on('finish', onFinish);
    } else {
      return gulp
        .src(filesToCheck)
        .pipe(prettier.check())
        .on('data', onData)
        .on('error', onError)
        .on('finish', onFinish);
    }
  });
}

module.exports = {
  prettify,
};

prettify.description =
  'Checks several non-JS files in the repo for formatting using prettier';
prettify.flags = {
  'files': '  Checks only the specified files',
  'local_changes': '  Checks just the files changed in the local branch',
  'fix': '  Fixes formatting errors',
};
