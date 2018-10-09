import { spawn } from 'child_process'

import express from 'express'
import requestProxy from 'express-request-proxy';

// TODO(matthiasrohmer): Get configuration from ~setup/settings.js
const GROW_HOST = 'http://localhost:8080'
const STATIC_DIRECTORY = '/static'

// TODO(matthiasrohmer): Wrap spawn() calls in promises and only start
// express server if running gulp and grow was successful
// TODO(matthiasrohmer): Check if there are better commands for production
const gulp = spawn('gulp', ['develop'],
  {'stdio': [process.stdin, process.stdout, process.stderr]});
const grow = spawn('grow',
  ['run', '--no-preprocess'],
  {'stdio': [process.stdin, process.stdout, process.stderr]});
const app = express();

// Special case for example $paths postfixed with /source.html
// TODO(matthiasrohmer): Try to clean this mess up and maybe improve the RegEx
app.get(/\/.*examples.*-source.html/, function(req, res) {
  let examplePath = req.path.replace('-source.html', '.html');
  examplePath = examplePath.replace('/documentation/', '/');

  res.sendFile(__dirname + examplePath);
});

app.use('/static', express.static('static'));

// Basically proxy all other requests over to `grow run`
app.get('/*', requestProxy({'url': GROW_HOST + '/*'}));


app.listen(8888);
console.log('Listening on http://localhost:8888 ...');

app.listen(9999);
console.log('Listening on http://localhost:9999 ...');
