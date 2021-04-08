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
const SampleRenderer = require('@examples/lib/SampleRenderer');
const {createRequestContext} = require('@lib/templates/index.js');

// eslint-disable-next-line new-cap
const router = express.Router();

const blogItems = [
  newPost('A green landscape with trees.', 'landscape_green_1280x853.jpg', 1),
  newPost(
    'Mountains reflecting on a lake.',
    'landscape_mountains_1280x657.jpg',
    2
  ),
  newPost(
    'A road leading to a lake with mountains on the back.',
    'landscape_lake_1280x857.jpg',
    3
  ),
  newPost(
    'Forested hills with a grey sky in the background.',
    'landscape_trees_1280x960.jpg',
    4
  ),
  newPost(
    'Scattered houses in a mountain village.',
    'landscape_village_1280x853.jpg',
    5
  ),
  newPost('A deep canyon.', 'landscape_canyon_1280x1700.jpg', 6),
  newPost(
    'A desert with mountains in the background.',
    'landscape_desert_1280x853.jpg',
    7
  ),
  newPost('Colorful houses on a street.', 'landscape_houses_1280x803.jpg', 8),
  newPost('Blue sea surrounding a cave.', 'landscape_sea_1280x848.jpg', 9),
  newPost(
    'A ship sailing the sea at sunset.',
    'landscape_ship_1280x853.jpg',
    10
  ),
];

SampleRenderer.use(router, (request, response, template) => {
  // set max-age to 15 s - the minimum refresh time for an amp-live-list
  setMaxAge(response, 15);

  return template.render(
    createRequestContext(request, {
      // render the current time
      time: new Date().toLocaleTimeString(),
      timestamp: Number(new Date()),
      // send a random list of blog items to make it also work on the cache
      blogItems: blogItems.filter(() =>
        Math.floor(Math.random() * Math.floor(2))
      ),
    })
  );
});

function newPost(text, img, id) {
  return {
    id: id,
    text: text,
    img: '/static/samples/img/' + img,
    timestamp: Number(new Date()),
  };
}

module.exports = router;
