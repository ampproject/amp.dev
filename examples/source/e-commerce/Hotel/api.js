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
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const utils = require('@lib/utils');
const rooms = require(
  utils.project.absolute('/examples/static/samples/json/rooms.json')
);

// eslint-disable-next-line new-cap
const examples = express.Router();

const MAX_AGE = 60 * 60 * 24; // 1 day in s

examples.get('/rooms', (request, response) => {
  setMaxAge(response, MAX_AGE);

  const arriving = new Date(request.query.start);
  const leaving = new Date(request.query.end);

  // for initial request
  let result = rooms;

  if (arriving && leaving) {
    result = rooms.filter((room) => {
      return !(
        arriving <= new Date(room.booked.to) &&
        leaving >= new Date(room.booked.from)
      );
    });
  }

  response.json(result);
});

module.exports = examples;
