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

const POST_COUNT = 6;
const BLOG_PATH = `https://blog.amp.dev/wp-json/wp/v2/posts?per_page=${POST_COUNT}&_embed`;
const fetch = require('node-fetch');

async function importBlog(value, callback) {
  const response = await fetch(BLOG_PATH);
  const jsonData = await response.json();

  const posts = [];
  for (const post of jsonData) {
    posts.push({
      title: post._embedded['wp:term'][0][0].name,
      image: post._embedded['wp:featuredmedia'][0].media_details
        ? post._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail
            .source_url
        : '',
      headline: post.title.rendered,
      date: post.date,
      url: post.link,
    });
  }

  callback(null, posts);
}

module.exports = {
  importBlog,
};
