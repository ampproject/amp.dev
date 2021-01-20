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
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer();
const LRU = require('lru-cache');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());
const config = {
  maxAge: 1000 * 60 * 5, // 5 minutes
};
const commentsCache = new LRU(config);

class Comment {
  constructor(text, user, date = new Date().getTime()) {
    this.text = text;
    this.user = user;
    this.date = new Date(date);
  }
}

const USER = 'Mark';
const defaultComments = [
  new Comment(
    'This is the first comment',
    'Alice',
    new Date('2006-01-02 15:04')
  ),
  new Comment(
    'This is the second comment',
    'Bob',
    new Date('2006-01-02 15:34')
  ),
];

examples.get('/comments', handleComments);
examples.post('/comments/new', upload.none(), handleCommentsNew);

function handleComments(request, response) {
  response.json(loadComments(request));
}

function handleCommentsNew(request, response) {
  const cookie = request.cookies['amp-access'];
  if (!cookie) {
    response.sendStatus(400);
  }
  const comments = loadComments(request);
  const text = request.body ? request.body.text : '';
  if (text !== '') {
    const comment = new Comment(text, USER);
    comments.push(comment);
    commentsCache.set(cookie, comments);
  }
  response.json(comments);
}

function loadComments(request) {
  const cookie = request.cookies['amp-access'];
  if (!cookie) {
    return defaultComments;
  }
  const comments = commentsCache.get(cookie);
  if (comments) {
    return comments.map((comment) => {
      return new Comment(comment.text, comment.user, comment.date);
    });
  }
  return defaultComments;
}

module.exports = examples;
