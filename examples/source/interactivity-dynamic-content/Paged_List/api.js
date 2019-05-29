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

class ProductListing {
  constructor(title, image, copy) {
    this.title = title;
    this.image = image;
    this.copy = copy;
  }
}

class PagedResponse {
  constructor(currentPage, pageCount, products) {
    this.currentPage = currentPage;
    this.pageCount = pageCount;
    this.products = products;
  }
}

class AmpListResponse {
  constructor(items) {
    this.items = items;
  }
}

examples.get('/search', (request, response) => {
  const {query} = request;
  const page = Number(query.page) > 0 ? Number(query.page) : 1;

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

  const response = new PagedResponse(page, MAX_PAGE_COUNT, []);

  for (let i = 0; i < ITEMS_PER_PAGE; i++) {
    const itemIndex = ITEMS_PER_PAGE*(page-1) + i + 1;
    const item = new ProductListing(
        `Food ${itemIndex}`,
        IMAGES[itemIndex % IMAGES.length],
        `Lorem ipsum dolor sit ${itemIndex} amet consequitur sine nice fun`
    );
    response.products.push(item);
  }

  return new AmpListResponse(response);
}

module.exports = examples;
