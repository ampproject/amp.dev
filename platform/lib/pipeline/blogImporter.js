/* eslint-disable no-invalid-this */
/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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

require('module-alias/register');

const {Signale} = require('signale');
const path = require('path');
const writeFile = require('write');
const project = require('@lib/utils/project');
const moment = require('moment');
const FeedParser = require('feedparser');
const request = require('request');
const util = require('util');
const LOG = new Signale({'scope': 'Markdown Documents'});

// Where to save the documents to
const DESTINATION_BASE_PATH = project.absolute('pages/shared/data');

class BlogImporter {
  constructor() {
  }

  import() {
    LOG.start('Beginning to import blog entries ...');
    return this._importBlogEntries();
  }

  /*
  Uses Feedparser to fetch an XML feed at options.url. Accumulates
  the XML items that are returned, running options.parseFunction
  on each one as it is received.

  @returns a Promise that resolves with the collection of items.
  */
  fetchFeedAsync(options) {
    const req = request(options.url);
    const feedparser = new FeedParser();
    const items = [];

    return new Promise((resolve, reject) => {
      req.on('response', function(res) {
        const stream = this;
        if (res.statusCode != 200) {
          return reject(new Error('Bad status code'));
        }
        stream.pipe(feedparser);
      });

      feedparser.on('readable', function() {
        let rawItem;
        while (rawItem = this.read()) {
          items.push(options.parseFunction(rawItem));
        }
      });

      feedparser.on('end', () => {
        console.log(`Finished fetching ${options.url}`);
        resolve(items);
      });
    });
  }

  /* Converts the provided RSS blog item into a consistent format. */
  onParseBlogPost(item) {
    return {
      type: 'Blog',
      date: moment(item.date),
      title: item.title.rendered,
      origin: item.link,
      thumbnail: item.jetpack_featured_media_url || '',
    };
  }

  /* Converts the provided RSS video item into a consistent format. */
  onParseVideo(item) {
    return {
      type: 'Video',
      date: moment(item.pubdate),
      origin: item.link,
      thumbnail: item['media:group']['media:thumbnail']['@'].url,
      title: item.title.replace(/\"/g, '\\"'),
    };
  }

  /**
   * Collects all needed documents from across the repository that should
   * be downloaded and put into collections
   * @return {undefined}
   */
  async _importBlogEntries() {
    const promisifiedRequest = util.promisify(request);

    // grab both RSS feeds from YouTube and the blog
    const all = await Promise.all([
      promisifiedRequest({
        url: 'https://blog.amp.dev/wp-json/wp/v2/posts/?embedded=true',
        json: true,
      }).then((response) => {
        return response.body.map((item) => this.onParseBlogPost(item));
      }),
      this.fetchFeedAsync({
        url: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLXTOW_XMsIDTIRIu4Af-bqfGkUhPSE75A',
        parseFunction: this.onParseVideo,
      }),
    ]);

    // grab all RSS entires, sort them by date and cap at 5 items
    const blogEntries = []
        .concat(all[0], all[1])
        .sort((a, b) => {
          return b.date - a.date;
        })
        .slice(0, 5);

    // join all of the content
    const blogEntriesYaml = blogEntries.map((item) =>
      `
- title: "${ item.type}"
  image: "${ item.thumbnail }"
  headline: "${ item.title }"
  date: "${ item.date.format('MMMM D, YYYY') }"
  url: "${ item.origin }"
`
    );

    const filePath = path.join(DESTINATION_BASE_PATH, './blog.yaml');

    // write it to disk
    return writeFile.promise(
        filePath,
        'entries:\n' + blogEntriesYaml.join('')).then(() => {
      LOG.success(`Saved ${filePath.replace(project.paths.ROOT, '~')}`);
    }).catch((e) => {
      LOG.error(`Couldn't save ${filePath.replace(project.paths.ROOT, '~')}`, e);
    });
  }
}

// If not required, run directly
if (!module.parent) {
  const importer = new BlogImporter();

  (async () => {
    await importer.import();
  })();
}

module.exports = BlogImporter;
