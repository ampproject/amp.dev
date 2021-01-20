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

const gulp = require('gulp');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const through = require('through2');
const git = require('@lib/utils/git');
const project = require('@lib/utils/project');
const {Signale} = require('signale');
const log = new Signale({'scope': 'Recent Guides'});

// Paths of guides pages; Relative for yaml file; Absolute for git log function
const PATH_RELATIVE = project.paths.GUIDES_PATH_RELATIVE;
const PATH_ABSOLUTE = path.join(project.paths.GROW_POD, PATH_RELATIVE);

// Where to save the list to
const DEST_FILE = project.paths.RECENT_GUIDES_DEST;

class RecentGuides {
  import() {
    const guides = [];

    // Look for all .md and .html files; skip localized versions
    let stream = gulp.src([
      `${PATH_ABSOLUTE}/**/*.{md,html}`,
      `!${PATH_ABSOLUTE}/**/*@*.{md,html}`,
    ]);

    log.start('Refreshing recent guides list ...');

    stream = stream
      .pipe(
        through.obj(async (file, encoding, callback) => {
          if (!file.isDirectory() && !file.isNull()) {
            // Create file path and get file date with git log function
            const filePath = path.join(PATH_RELATIVE, file.relative);
            const fileDate = await git.committerDate(
              PATH_ABSOLUTE + file.relative
            );

            // Build array of guides objects
            guides.push({
              'path': filePath,
              'date': fileDate,
            });
          }

          stream.push(file);
          callback();
        })
      )
      .pipe(gulp.dest('./'));

    return new Promise((resolve) => {
      stream.on('end', resolve);
    }).then(() => {
      // Sort guides by date in desc order and write them into a yaml file
      guides.sort((a, b) => (a.date > b.date ? -1 : 1));
      fs.writeFileSync(
        DEST_FILE,
        yaml.dump(guides, {
          lineWidth: 'none',
        })
      );
      log.success(
        `Saved recent guides list to ~/${DEST_FILE}. Total guides count: ${guides.length}`
      );
    });
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new RecentGuides();

  importer.import();
}

module.exports = RecentGuides;
