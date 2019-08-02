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
const formidableMiddleware = require('express-formidable');
const cookieParser = require('cookie-parser');
const sessions = require('client-sessions');

// eslint-disable-next-line new-cap
const examples = express.Router();

examples.use(formidableMiddleware());
examples.use(cookieParser());
examples.use(sessions({
  cookieName: 'session',
  secret: 'ampdev-shopping-cart',
  duration: 24 * 60 * 60 * 1000, // 24 hours
  activeDuration: 1000 * 60 * 5, // 5 minutes
}));

examples.post('/add-to-cart', addToCartHandlerPost);
examples.get('/add-to-cart', addToCartHandlerGet);
examples.get('/cart-items', cartItemsHandler);
examples.post('/delete-cart-item', deleteCartItemHandler);

function addToCartHandlerPost(req, res) {
  const cartItem = {
    id: req.fields.id,
    name: req.fields.name,
    price: req.fields.price,
    color: req.fields.color,
    size: req.fields.size,
    quantity: parseInt(req.fields.quantity),
  };
  const origin = req.get('origin');

  // If comes from the cache
  if (req.headers['amp-same-origin'] !== 'true') {
    // transfrom POST into GET and redirect to /add_to_cart, to complete the request from the origin, with access to the session.
    const queryString = new URLSearchParams({...cartItem, origin}).toString();
    res.header('AMP-Redirect-To', req.protocol + '://' + req.get('host') +
        `/documentation/examples/e-commerce/add_to_cart?${queryString}`);
  } else {
    // Complete the request from the origin
    updateShoppingCartOnSession(req, cartItem);
    res.header('AMP-Redirect-To', req.protocol + '://' + req.get('host') +
        '/documentation/examples/e-commerce/shopping_cart/');
  }

  res.json({});
};

function addToCartHandlerGet(req, res) {
  const cartItem = {
    id: req.fields.id,
    name: req.fields.name,
    price: req.fields.price,
    color: req.fields.color,
    size: req.fields.size,
    quantity: parseInt(req.fields.quantity),
  };

  updateShoppingCartOnSession(req, cartItem);
  res.redirect(req.protocol + '://' + req.get('host') + '/documentation/examples/e-commerce/shopping_cart/');
};

function cartItemsHandler(req, res) {
  let shoppingCart = req.session.shoppingCart;

  // cookie exists, but cart is empty
  if (shoppingCart) {
    shoppingCart = deserialize(shoppingCart);
    console.log('Session exists.');
  } else {
    shoppingCart = createCart();
    req.session.shoppingCart = serializer(shoppingCart);
    console.log('Session doesn\'t exist.');
  }

  // wrap the shopping cart into an 'items' array, so it can be consumed with amp-list.
  const shoppingCartResponse = {items: []};
  shoppingCartResponse.items.push(shoppingCart);

  res.send(shoppingCartResponse);
};

function deleteCartItemHandler(req, res) {
  const id = req.fields.id;
  const size = req.fields.size;

  const shoppingCartResponse = {items: []};

  let shoppingCart = req.session.shoppingCart;

  if (shoppingCart) {
    shoppingCart = deserialize(shoppingCart);
    shoppingCart.removeItem(id, size);
    req.session.shoppingCart = serializer(shoppingCart);
    shoppingCartResponse.items.push(shoppingCart);
  }

  enableCors(req, res);
  res.send(shoppingCartResponse);
};

function updateShoppingCartOnSession(req, cartItem) {
  let shoppingCart = req.session.shoppingCart;

  if (shoppingCart) {
    shoppingCart = deserialize(shoppingCart);
  } else {
    shoppingCart = createCart();
  }

  req.session.shoppingCart = serializer(shoppingCart);
  shoppingCart.addItem(cartItem);
}


function createCartItem(id, name, price, color, size, quantity) {
  const cartProduct = {};
  cartProduct.id = id;
  cartProduct.name = name;
  cartProduct.price = price;
  cartProduct.color = color;
  cartProduct.size = size;
  cartProduct.quantity = parseInt(quantity);

  return cartProduct;
}

function createCart() {
  const shoppingCart = {
    cartItems: [],
    isEmpty: true,
    addItem: function(item) {
      // check if item exists in cart before pushing
      const foundItem = this.cartItems.filter((elem) => {
        return (elem.id == item.id && elem.size == item.size);
      });

      if (foundItem.length > 0) {
        foundItem[0].quantity += item.quantity;
      } else {
        this.cartItems.push(item);
      }

      this.isEmpty = false;
    },
    removeItem: function(id, size) {
      for (let i = 0; i < this.cartItems.length; i++) {
        if (this.cartItems[i].id === id && this.cartItems[i].size === size) {
          // remove item
          this.cartItems.splice(i, 1);

          if (this.cartItems.length == 0) {
            this.isEmpty = true;
          }
        }
      }
    },
  };

  return shoppingCart;
}


// Helper function for serialize-javascript package
function deserialize(serializedJavascript) {
  return eval('(' + serializedJavascript + ')');
}

module.exports = examples;
