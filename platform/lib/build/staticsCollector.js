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

/* eslint-disable no-invalid-this */
'use strict';

require('module-alias/register');

const {Signale} = require('signale');
const gulp = require('gulp');
const through = require('through2');
const fileType = require('file-type');
const archiver = require('archiver');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const config = require('@lib/config');
const utils = require('@lib/utils');

/* Source paths of files that should be collected */
const STATICS_SRC = [
  utils.project.absolute('pages/static/**/*'),
  // utils.project.absolute('examples/static/**/*'),
];
/* Path where all collected static files should be written to */
const STATIC_DEST = utils.project.absolute('platform/static');
/* Path of the file containing all available renditions */
const STATICS_INVENTORY = utils.project.absolute('platform/static.json');
/* All image types that should get renditions */
const IMAGE_TYPES = ['image/png', 'image/jpeg'];
/* The zip mime type to compare against */
const ZIP_TYPE = 'application/zip';
/* Defines sizes in which to create image renditions */
const SRCSET_SIZES = [1920, 1366, 768];

class StaticsCollector {

  constructor() {
    this._log = new Signale({
      'interactive': false,
      'scope': 'Statics Collector',
    });

    // Object to keep track of all collected static files and especially
    // created renditions to be able to match them when routing
    this._inventory = {
      'images': {},
      'archives': {},
    };
  }

  /**
   * Returns a Gulp stream with all static files that should be handled
   * @return {Stream}
   */
  start() {
    // Ugly but needed to keep scope for .pipe
    const scope = this;
    const stream = gulp.src(STATICS_SRC)
        .pipe(through.obj(async function(file, encoding, callback) {
          // Determine file type to pass file to correct handler
          const type = !file.stat.isDirectory() ? fileType(file.contents) : null;

          // Check if the file should actually be part of zip file
          if (type !== ZIP_TYPE && file.path.includes('.zip')) {
            scope._zip(file, callback);
            return;
          }
          // Otherwise determine file type to fish out images and create
          // appropriate renditions for them, therefore skip folders
          if (type && IMAGE_TYPES.includes(type.mime)) {
            const renditions = await scope._image(file);
            for (const rendition of renditions) {
              this.push(rendition);
            }

            callback();
            return;
          }

          // Just forward everything that hasn't been catched by one
          // from above
          this.push(file);
          callback();
        }))
        .pipe(gulp.dest(STATIC_DEST));

    stream.on('end', this._onEnd.bind(this));
    return stream;
  }

  /**
   * Finds the parent path from a vinyl ending with .zip and puts
   * all deeper levels into a ZIP file that is written to STATIC_DEST
   * @param  {Vinyl} file     The vinyl file from the gulp stream
   * @param  {Stream} stream   The initial stream
   * @param  {Function} callback Callback to call after ZIP
   * @return {undefined}
   */
  _zip(file, callback) {
    const basePath = file.path.slice(0, file.path.indexOf('.zip')) + '.zip';
    const relativePath = file.relative.slice(0, file.relative.indexOf('.zip')) + '.zip';
    const archive = this._inventory.archives[relativePath] || archiver('zip', {
      'zlib': {'level': 9}
    });

    // Only append real files, directories will be created automatically
    const filePath = file.relative.replace(relativePath, '');
    if (!file.stat.isDirectory() && filePath) {
      archive.append(file.contents, {'name': filePath});
    }

    this._inventory.archives[relativePath] = archive;
    callback();
  }

  async _image(file, callback) {
    this._log.await(`Creating renditions and WEBPs for ${file.relative}`);

    let image = sharp(file.contents);
    const metadata = await image.metadata();

    // Init storage for renditions and keep original one as failover
    const renditions = [file];

    // Create size renditions while skipping everything that would scale up
    for (const targetWidth of SRCSET_SIZES) {
      if (targetWidth < metadata.width) {
        image = image.resize(targetWidth);

        const rendition = file.clone();
        rendition.extname = `.${targetWidth}${rendition.extname}`;
        rendition.contents = await image.toBuffer();

        renditions.push(rendition);
      }
    }

    // Create WEBP versions of all images
    const webps = [];
    for (const rendition of renditions) {
      const webp = rendition.clone();
      rendition.extname = `.webp`;
      rendition.contents = await image.webp().toBuffer();

      webps.push(webp);
    }

    return [...renditions, ...webps];
  }

  /**
   * Takes care of finalizing created archives and writing them to disk
   * together with the normalized inventory
   */
  _onEnd() {
    for (const archivePath of Object.keys(this._inventory.archives)) {
      const contents = this._inventory.archives[archivePath];
      contents.finalize();

      this._log.await(`Writing archive ${archivePath} ...`);
      var archive = fs.createWriteStream(path.join(STATIC_DEST, archivePath));
      contents.pipe(archive);
    };
  }
}

if (!module.parent) {
  (async () => {
    const staticsCollector = new StaticsCollector();
    staticsCollector.start();
  })();
}

module.exports = {
  staticsCollector: new StaticsCollector(),
};
