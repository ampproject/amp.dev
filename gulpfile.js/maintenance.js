const path = require('path');

const search = require('recursive-search');
const gulp = require('gulp');
const through = require('through2');

const {project} = require('@lib/utils');

async function pruneStaleResources(done) {
  const resources = [
    ...search.recursiveSearchSync(/.j2/, project.paths.FRONTEND_TEMPLATES),
    ...search.recursiveSearchSync(/.css/, project.paths.CSS),
    ...search.recursiveSearchSync(/.svg/, project.paths.ICONS),
    ...search.recursiveSearchSync(
      /.png|.jpg|.webp|.svg/,
      project.absolute('pages/static')
    ),
  ];
  const usedResources = [];

  await new Promise((resolve, reject) => {
    const stream = gulp
      .src([
        `${project.paths.PAGES_SRC}/../**/*.{md,html,j2,yaml}`,
        `${project.paths.FRONTEND_TEMPLATES}/**/*.j2`,
      ])
      .pipe(
        through.obj(function (file, encoding, callback) {
          const fileContents = file.contents.toString();

          for (const resource of resources) {
            if (usedResources.includes(usedResources)) {
              continue;
            }

            const resourceFileName = path.basename(resource);
            if (fileContents.includes(resourceFileName)) {
              usedResources.push(resource);
            }
          }

          this.push(file);
          callback();
        })
      )
      .pipe(gulp.dest('test'));

    stream.on('error', reject);
    stream.on('end', resolve);
  });

  const unusedResources = resources.filter((resource) => {
    return !usedResources.includes(resource);
  });

  console.log('Unused resources', unusedResources.length);
  done();
}

exports.pruneStaleResources = pruneStaleResources;
