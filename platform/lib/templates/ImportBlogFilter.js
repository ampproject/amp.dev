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
const DEFAULT_IMG = 'AMP_Blog_Square.jpg';
const fetch = require('node-fetch');
const moment = require('moment');

async function importBlog(value, callback) {
  let response = [];
  try {
    response = await fetch(BLOG_PATH).then(res => res.json());
  } catch (err) {
    console.log('Could not fetch blog posts!', err);
    callback(null, []);
    return;
  }

  const posts = [];
  for (const post of response) {
    const mediaDetails = post._embedded['wp:featuredmedia'][0].media_details;
    let imageUrl = '';
    if (mediaDetails && !mediaDetails.file.endsWith(DEFAULT_IMG)) {
      imageUrl = mediaDetails.sizes.medium.source_url;
    }

    posts.push({
      title: post._embedded['wp:term'][0][0].name,
      image: imageUrl,
      headline: post.title.rendered,
      date: moment(post.date).format('MMMM D, YYYY'),
      url: post.link,
    });
  }

  callback(null, posts);
}

module.exports = {
  importBlog,
};
