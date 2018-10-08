import { spawn } from 'child_process'

import express from 'express'
import requestProxy from 'express-request-proxy';

// TODO(matthiasrohmer): Maybe move configuration to dedicated files
const GROW_HOST = 'http://localhost:8080'
const STATIC_DIRECTORY = '/static'

// TODO(matthiasrohmer): Wrap spawn() calls in promises and only start
// express server if running gulp and grow was successful
// Run pre-processing and watching of files
const gulp = spawn('gulp', [], {'stdio': [process.stdin, process.stdout, process.stderr]});

// Start grow to vend the content
const grow = spawn('grow', ['run'], {'stdio': [process.stdin, process.stdout, process.stderr]});

// Start express server as proxy and orchestrator
const app = express();

// Basically proxy all requests over to `grow run`
app.get('/*', requestProxy({'url': GROW_HOST + '/*'}));

// Except for static files as they are coming from STATIC_DIRECTORY
app.use('/static', express.static('static'));

app.listen(8888);
console.log('Listening on http://localhost:8888 ...');
