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

const Templates = require('@lib/templates/');

// eslint-disable-next-line new-cap
const runtimeLog = express.Router();
const logFormatter = new LogFormatter();

runtimeLog.get('/', async (request, response) => {
  const message = {
    version: request.query.v,
    id: request.query.id,
    params: request.query.s,
  };
  const messageTemplate = await Templates.get('message.html');
  try {
    const html = logFormatter.formatHtml(message);
    response.send(messageTemplate.render({
      title: 'Log',
      text: html,
    }));
  } catch (error) {
    response.status(400).send('Invalid request');
  }
});


module.exports = runtimeLog;

