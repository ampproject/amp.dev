import gulp from 'gulp';
import changed from 'gulp-changed';
import { loadExample } from 'amp-by-example';
import through from 'through2';

import settings from '~/setup/settings.js';

/**
 * Compiles and transforms the samples from settings.examples.SRC, while doing
 * so it creates
 *
 * a) A static preview page with a header
 * b) The annotated documentation page
 * c) A raw (transformed) source
 */
export default function examples(done) {
    let stream = gulp.src(settings.examples.src, {'read': true});

    // stream.pipe(changed(settings.examples.dest));
    // TODO(matthiasrohmer): Transform samples and create vinyls for all three types
    stream.pipe(through.obj(function(html, encoding, callback) {
      console.log('Transforming example', html.path, html.relative);
      loadExample(html.path).then((example) => {
        // Write data source JSON to Grow pod
        let json = html.clone();
        json.contents = Buffer.from(JSON.stringify(example));
        json.extname = '.json';

        stream.push(json);

        // And also write Markdown file referencing the JSON data source
        let markdown = html.clone();
        // TODO(matthiasrohmer): Move frontmatter creation to own method
        markdown.contents = Buffer.from([
          '---',
          '$title: ' + example.document.title,
          '$view: ' + settings.examples.grow.view,
          '$path: ' + settings.examples.grow.basePath + html.relative,
          'example:  !g.json ' + settings.examples.dest + '/' + json.relative,
          '---'
        ].join('\n'));
        markdown.extname = '.md';
        stream.push(markdown);

        // Signal to stream that processing is finished
        callback();
      });
    }));

    stream.pipe(gulp.dest(settings.examples.dest));

    done();
}


// const loadExample = require('amp-by-example').loadExample;
//
// loadExample('../amp-by-example/src/10_Introduction/_Hello_World.html').then((doc) => {
//   console.log(JSON.stringify(doc, null, 2));
// });
