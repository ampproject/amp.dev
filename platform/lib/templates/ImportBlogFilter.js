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
const {createWriteStream, mkdirSync} = require('fs');
const {project} = require('@lib/utils');

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
  for (const wpPost of await response.json()) {
    const featuredMedia = wpPost._embedded['wp:featuredmedia'];
    const mediaDetails = featuredMedia && featuredMedia[0].media_details;
    let imageUrl = '';
    if (mediaDetails && !mediaDetails.file.endsWith(DEFAULT_IMG)) {
      // Mount image URLs to the virtual static directory
      const imgPostURL = mediaDetails.sizes.medium_large.source_url;
      const encodedURL = encodeURIComponent(imgPostURL);

      const imgDir = `${project.paths.PAGES_DEST}${REMOTE_STATIC_MOUNT}`;
      imageUrl = `${REMOTE_STATIC_MOUNT}${encodeURIComponent(encodedURL)}`;

      try {
        mkdirSync(imgDir, {recursive: true});

        const writeStream = createWriteStream(`${imgDir}${encodedURL}`);
        const rawImg = await fetch(imgPostURL);

        await new Promise((resolve, reject) => {
          rawImg.body.pipe(writeStream);
          rawImg.body.on('error', reject);
          writeStream.on('finish', resolve);
        });
      } catch (err) {
        log.error(`Fetching/saving image ${imgPostURL} failed:`, err);
        callback(null, []);
        return;
      }
    }

    const post = {
      title: wpPost._embedded['wp:term'][0][0].name,
      headline: wpPost.title.rendered,
      date: new Date(wpPost.date).toLocaleString('en-us', {
        month: 'long',
        year: 'numeric',
        day: 'numeric',
      }),
      url: wpPost.link,
    };
    if (imageUrl) {
      post.image = imageUrl;
    }
    posts.push(post);
  }
  callback(null, posts);
}

module.exports = {
  importBlog,
};
