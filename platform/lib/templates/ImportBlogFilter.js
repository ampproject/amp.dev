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

const {REMOTE_STATIC_MOUNT} = require('@lib/routers/thumbor.js');

const POST_COUNT = 6;
const BLOG_PATH = `https://blog.amp.dev/wp-json/wp/v2/posts?per_page=${POST_COUNT}&_embed`;
const DEFAULT_IMG = 'AMP_Blog_Square.jpg';
const fetch = require('node-fetch');
const log = require('@lib/utils/log')('Import Blog Filter');

async function importBlog(value, callback) {
  let response;
  try {
    response = await fetch(BLOG_PATH);
  } catch (err) {
    log.error('Fetching blog posts failed:', err);
    callback(null, []);
    return;
  }

  if (!response.ok) {
    callback(null, []);
    return;
  }

  const posts = [];
  for (const post of await response.json()) {
    const featuredMedia = post._embedded['wp:featuredmedia'];
    const mediaDetails = featuredMedia && featuredMedia[0].media_details;
    let imageUrl = '';
    if (mediaDetails && !mediaDetails.file.endsWith(DEFAULT_IMG)) {
      // Mount image URLs to the virtual static directory
      imageUrl = `${REMOTE_STATIC_MOUNT}?url=${encodeURIComponent(
        mediaDetails.sizes.medium.source_url
      )}`;
    }

    posts.push({
      title: post._embedded['wp:term'][0][0].name,
      image: imageUrl,
      headline: post.title.rendered,
      date: new Date(post.date).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }),
      url: post.link,
    });
  }

  callback(null, posts);
}

module.exports = {
  importBlog,
};
