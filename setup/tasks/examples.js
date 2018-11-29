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
    stream = stream.pipe(through.obj(function(html, encoding, callback) {
      console.log('Transforming example:', html.relative);
      loadExample(html.path).then((example) => {
        // Write data for documentation page to Grow pod
        let json = html.clone();
        json.contents = Buffer.from(JSON.stringify(example));
        json.extname = '.json';
        stream.push(json);

        // ... write markdown file referencing the JSON data source
        let markdown = html.clone();
        // TODO(matthiasrohmer): Move frontmatter creation to own method
        markdown.contents = Buffer.from([
          '---',
          '$title: ' + example.document.title,
          '$view: ' + settings.examples.grow.views.documentation,
          '$path: ' + settings.examples.grow.basePath + html.relative,
          'example: !g.json ' + settings.examples.dest + '/' + json.relative,
          '---'
        ].join('\n'));
        markdown.extname = '.md';
        stream.push(markdown);

        // ... write the document for previewing the example
        let preview = html.clone();
        preview.contents = Buffer.from([
          '---',
          '$title: ' + example.document.title + ' (Preview)',
          '$view: ' + settings.examples.grow.views.preview,
          '$path: ' + settings.examples.grow.basePath
                    + html.relative.replace('.html', '-preview.html'),
          'example: ' + settings.examples.grow.basePath
                      + html.relative.replace('.html', '-source.html'),
          '---'
        ].join('\n'));
        preview.extname = '-preview.md';
        stream.push(preview);

        // Signal to stream that processing for current file is finished
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
