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
const multer = require('multer');
const upload = multer();
const {setMaxAge} = require('@lib/utils/cacheHelpers');
const LRU = require('lru-cache');

// eslint-disable-next-line new-cap
const examples = express.Router();
const SHOPPING_CART_TOTAL = 9.94;
const config = {
  maxAge: 1000 * 60 * 10, // 10 minutes
};
const discounts = new LRU(config);

examples.get('/shoppingcart', upload.none(), handleShoppingCart);
examples.post('/apply-code', upload.none(), handleApplyCode);

function handleApplyCode(request, response) {
  setMaxAge(response, 0);
  const clientId = request.body ? request.body.clientId : '';
  discounts.set(clientId, 0.2);
  writeShoppingCart(request, response, clientId);
}

function handleShoppingCart(request, response) {
  setMaxAge(response, 0);
  const clientId = request.query ? request.query.clientId : '';
  writeShoppingCart(request, response, clientId);
}

function writeShoppingCart(request, response, clientId) {
  const discount = discounts.get(clientId) || 0;
  const total = (SHOPPING_CART_TOTAL - SHOPPING_CART_TOTAL * discount).toFixed(
    2
  );
  const cart = {
    items: [
      {
        name: 'Item 1',
        price: 1.99,
        quantity: 2,
      },
      {
        name: 'Item 2',
        price: 2.99,
        quantity: 1,
      },
      {
        name: 'Item 3',
        price: 0.99,
        quantity: 3,
      },
    ],
    total,
    discount: toPercentString(discount),
  };

  response.json(cart);
}

function toPercentString(num) {
  return `${num * 100}%`;
}

module.exports = examples;
