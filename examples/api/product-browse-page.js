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
const config = require('@lib/config');

// eslint-disable-next-line new-cap
const examples = express.Router();
const products = require(
    utils.project.absolute('/examples/static/samples/json/related_products.json')
);
let hasMorePages = false;

examples.get('/search', handleSearchRequest);
examples.get('/products', handleProductsRequest);
examples.get('/products_autosuggest', handleProductsAutosuggestRequest);
examples.get('/json/more_related_products_page', handleLoadMoreRequest);

function handleSearchRequest(request, response) {
  const searchQuery = request.query.search;
  response.redirect(301, `${config.hosts.platform.base}${request.baseUrl}?SEARCH=${searchQuery}`);
}

function handleProductsRequest(request, response) {
  const productQuery = !!request.query.searchProduct ? request.query.searchProduct : '';
  const colorQuery = !!request.query.searchColor ? request.query.searchColor : '';

  // find products that match the query
  const tempProducts = findProducts([productQuery, colorQuery]);
  // filter products
  const responseProducts = products.items.filter((prod) => {
    for (const temp of tempProducts) {
      if (prod.name === temp.name) return true;
    };
  });

  // sort products
  const sortQuery = !!request.query.sort ? request.query.sort : '';
  if (sortQuery !== '') {
    if (sortQuery === 'price-descendent') {
      responseProducts.sort((a, b) => {
        return Number(b.price) - Number(a.price);
      });
    } else {
      responseProducts.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
    }
  }
  response.json({
    items: responseProducts,
  });
}

function findProducts(queries = []) {
  const productDescs = products.items.map((item) => {
    return {
      name: item.name,
      color: item.color,
    };
  });

  return productDescs.filter((prod) => {
    const haystack = `${prod.name} ${prod.color}`.toLowerCase();
    const matches = [];
    for (const query of queries) {
      if (haystack.includes(query.toLowerCase()) || query === 'all') {
        matches.push(true);
      } else {
        matches.push(false);
      }
    }
    return matches.every((value) => value);
  });
}

function handleProductsAutosuggestRequest(request, response) {
  const query = request.query.q;

  const productDescs = products.items.map((item) => {
    return item.name;
  });

  // filter array of productnames by query
  const filteredStrs = productDescs.filter((desc) => {
    return desc.toLowerCase().includes(query.toLowerCase());
  });

  if (filteredStrs.length > 0) {
    response.json({
      items: [{
        query,
        results: filteredStrs.splice(0, 4),
      }],
    });
  }
}

function handleLoadMoreRequest(request, response) {
  const moreItemsPageIndex = request.query.moreItemsPageIndex;
  const productsFile = require(utils.project.absolute(
      `/examples/static/samples/json/more_related_products_page${moreItemsPageIndex}.json`));

  if (Number(moreItemsPageIndex) === 1) {
    hasMorePages = false;
  } else {
    hasMorePages = true;
  }

  response.json({
    items: productsFile.items,
    hasMorePages,
  });
}

module.exports = examples;
