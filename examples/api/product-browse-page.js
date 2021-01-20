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
const utils = require('@lib/utils');

// eslint-disable-next-line new-cap
const examples = express.Router();
const products = require(utils.project.absolute(
  '/examples/static/samples/json/related_products.json'
));
const productNames = products.items.map((item) => {
  return item.name;
});
let hasMorePages = false;

examples.get('/search', handleSearchRequest);
examples.get('/products', handleProductsRequest);
examples.get('/products-autosuggest', handleProductsAutosuggestRequest);
examples.get('/json/more_related_products_page', handleLoadMoreRequest);

function handleSearchRequest(request, response) {
  const searchQuery = request.query.search;
  response.redirect(
    301,
    `${request.protocol}://${request.get('host')}${
      request.baseUrl
    }?SEARCH=${searchQuery}`
  );
}

function handleProductsRequest(request, response) {
  const productQuery = !!request.query.searchProduct
    ? request.query.searchProduct
    : '';
  const colorQuery = !!request.query.searchColor
    ? request.query.searchColor
    : '';

  // find products that match the query
  const responseProducts = findProducts(productQuery, colorQuery);

  // sort products
  const sortQuery = !!request.query.sort ? request.query.sort : '';
  if (sortQuery !== '') {
    let comparator;
    if (sortQuery === 'price-descendent') {
      comparator = (a, b) => Number(b.price) - Number(a.price);
    } else {
      comparator = (a, b) => Number(a.price) - Number(b.price);
    }
    responseProducts.sort(comparator);
  }
  response.json({
    items: responseProducts,
  });
}

function findProducts(name = '', color = 'all') {
  color = color.toLowerCase();
  name = name.toLowerCase();

  return products.items.filter((prod) => {
    return (
      prod.name.toLowerCase().includes(name) &&
      (prod.color.toLowerCase().includes(color) || color === 'all')
    );
  });
}

function handleProductsAutosuggestRequest(request, response) {
  const query = request.query.q;

  // filter array of productnames by query
  const filteredStrs = productNames.filter((desc) => {
    return desc.toLowerCase().includes(query.toLowerCase());
  });

  response.json({
    items: [
      {
        query,
        results: filteredStrs.splice(0, 4),
      },
    ],
  });
}

function handleLoadMoreRequest(request, response) {
  const moreItemsPageIndex = request.query.moreItemsPageIndex;
  const productsFile = require(utils.project.absolute(
    `/examples/static/samples/json/more_related_products_page${moreItemsPageIndex}.json`
  ));

  hasMorePages = Number(moreItemsPageIndex) !== 1;

  response.json({
    items: productsFile.items,
    hasMorePages,
  });
}

module.exports = examples;
