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
const del = require('del');
const path = require('path');
const through = require('through2');
// const git = require('@lib/utils/git');
const {execSync} = require('child_process');
const project = require('@lib/utils/project');

// Where to save the documents to
const TEMP_DEST_PATH = project.absolute('temp/');
const DEST_BASE_PATH = project.absolute('pages/shared/data/');
const GUIDES_SRC = project.absolute('pages/content/amp-dev/documentation/guides-and-tutorials/');

class RecentGuides {
  import() {
    const guides = [];

    let stream = gulp.src([
      'pages/content/amp-dev/documentation/guides-and-tutorials/**/*.{md,html}',
      '!pages/content/amp-dev/documentation/guides-and-tutorials/**/*@*.{md,html}',
    ]);
    stream = stream.pipe(through.obj((file, encoding, callback) => {
      if (!file.isDirectory() && !file.isNull()) {
        const filePath = GUIDES_SRC + file.relative;
        const fileDate = execSync(`git log -1 --pretty=format:%ci ${filePath}`).toString().trim();

        // Build array of guides objects
        guides.push({
          'path': filePath,
          'date': fileDate,
        });

        // Sort guides by date in desc order
        guides.sort((a, b) => (a.date > b.date) ? -1 : 1);
      };

      stream.push(file);
      callback();
    })).pipe(gulp.dest(TEMP_DEST_PATH));

    return new Promise((resolve) => {
      stream.on('end', resolve);
    }).then(() => {
      console.log('Copied all guides. Refreshing guides list.');
      fs.writeFileSync(path.join(DEST_BASE_PATH, 'recent-guides.json'), JSON.stringify(guides));
      console.log('Refreshed guides list. Total guides count:', guides.length);

      // Delete temp folder
      (async () => {
        const deleted = await del(['temp']);
        console.log('Deleted files and directories:\n', deleted.join('\n'));
      })();
    });
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new RecentGuides();

  importer.import();
}

module.exports = RecentGuides;
