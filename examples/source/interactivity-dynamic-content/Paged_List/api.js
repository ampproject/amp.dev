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

// eslint-disable-next-line new-cap
const examples = express.Router();
const MAX_PAGE_COUNT = 5;
const ITEMS_PER_PAGE = 4;

examples.get('/search', (request, response) => {
  let page = Number(request.query.page);
  if (page < 1 || !page) {
    page = 1;
  }

  if (page <= MAX_PAGE_COUNT && page > 0) {
    response.json(generatePagedResponse(page));
  } else {
    response.json({
      error: 'Invalid page',
    });
  }
});

function generatePagedResponse(page) {
  const IMAGES = [
    '/static/samples/img/product1_640x426.jpg',
    '/static/samples/img/product2_640x426.jpg',
    '/static/samples/img/product3_640x426.jpg',
    '/static/samples/img/product4_640x426.jpg',
    '/static/samples/img/product5_640x408.jpg',
    '/static/samples/img/product6_640x424.jpg',
  ];

  const response = {
    currentPage: page,
    pageCount: MAX_PAGE_COUNT,
    products: [],
  };

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const itemIndex = ITEMS_PER_PAGE * (page - 1) + i + 1;
    const productListing = {
      title: `Food ${itemIndex}`,
      image: IMAGES[(itemIndex % IMAGES.length) - 1],
      copy: `Lorem ipsum dolor sit ${itemIndex} amet consequitur sine nice fun`,
    };
    response.products.push(productListing);
  }

  return {
    items: response,
  };
}

module.exports = examples;
