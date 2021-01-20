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

'use strict';

const express = require('express');
const LogFormatter = require('../runtime-log/HtmlFormatter.js');
const log = require('@lib/utils/log')('Runtime Log');
const robots = require('./robots');

const {Templates} = require('../templates/');

// eslint-disable-next-line new-cap
const runtimeLog = express.Router();
const logFormatter = new LogFormatter();

const regexIsNumber = /\d+/;

runtimeLog.get('/', async (request, response) => {
  const message = {
    version: request.query.v,
    id: request.query.id,
    params: request.query.s || [],
  };
  if (!isValidLogRequest(message)) {
    response.status(400).send('Invalid request');
    return;
  }
  try {
    const messageTemplate = await Templates.get('message.html');
    const html = await logFormatter.apply(message);
    response.send(
      messageTemplate.render({
        title: 'Log',
        text: html,
        requestPath: request.path,
      })
    );
  } catch (error) {
    log.error('Retrieving runtime log failed:', error);
    response.status(404).send('Message not found');
  }
});

runtimeLog.use(robots('allow_all.txt'));

function isValidLogRequest(logRequest) {
  return (
    regexIsNumber.test(logRequest.version) && regexIsNumber.test(logRequest.id)
  );
}

module.exports = runtimeLog;
