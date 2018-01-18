#!/usr/bin/env node
if (process.version.replace('v', '')[0] / 1 < 4) {
  console.error(`This script requires Node v4 or greater. (Current: ${process.version})`);
  process.exit(1);
}

// dependencies
var fs = require('fs');
var moment = require('moment');
var FeedParser = require('feedparser');
var request = require('request');
var path = require('path');

// config
var blogSectionCount = 5;
var authorGravatarHashes = {
  'Paul Bakaus': '9a2d68554d8d1655a3fb3e2a50aee909'
};

/*
Uses Feedparser to fetch an XML feed at options.url. Accumulates
the XML items that are returned, running options.parseFunction
on each one as it is received.

@returns a Promise that resolves with the collection of items.
*/
function fetchFeedAsync(options) {
  var req = request(options.url);
  var feedparser = new FeedParser();
  var items = [];

  return new Promise(function(resolve, reject) {
    req.on('response', function (res) {
      var stream = this;
      if (res.statusCode != 200) {
        return reject('error', new Error('Bad status code'));
      }
      stream.pipe(feedparser);
    });

    feedparser.on('readable', function () {
      var rawItem;
      while (rawItem = this.read()) {
        items.push(options.parseFunction(rawItem));
      }
    });

    feedparser.on('end', function() {
      console.log(`Finished fetching ${options.url}`);
      resolve(items);
    });
  });
}

function getDependencies(content) {

  var dependencies = content
    // remove all sourcecode blocks to not match false positives
    .replace(/\[sourcecode:?[^\]]*\](((?!\[\/sourcecode\])[\s\S])+)\[\/sourcecode\]/gm, '\n')
    // remove inline code
    .replace(/`[^`]+`/g, '')
    // find all used amp tags in the page
    .match(/<amp-((?!img[\/\s>])[^>\s]+)[^>]*>/g);

  if (dependencies) {
    return Array.from(new Set(dependencies.map(item => item.match(/<amp-((?!img[\/\s>])[^>\s]+)[^>]*>/)[1])));
  }

  return null;
}

function writeBlogPage(item, directory, parent) {

  return new Promise(function (resolve, reject) {

    request(item.origin, function (error, response, body) {

      // collect possible inline styles
      var inlineStyles = body.match(/\/\* Inline styles \*\/([^\<]+)/);
      inlineStyles = inlineStyles ? inlineStyles[1].trim() : false;

      // strip wrapping HTML from body copy
      body = body.split('<div class="amp-wp-article-content">')[1].split('</article>')[0];

      // remove extra footer
      body = body.replace(/<footer[^>]+>[\s\S]+<\/footer>/, '');

      // collect dependencies
      var dependencies = getDependencies(body);
      dependencies = dependencies ? '\n' + '  - ' + dependencies.join('\n  - ') : '';

      // expand with front matter
      body = `---
class: post-blog post-detail
type: Blog
$title: "${ item.title }"
id: ${ item.id }
author: ${ item.author }
role: ${ item.role }
origin: "${ item.origin }"
excerpt: "${ item.excerpt }"
avatar: ${ item.avatar }
date_data: ${ moment(item.date).format() }
$date: ${ moment(item.date).format('MMMM D, YYYY') }
$parent: ${parent}
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share${dependencies}
inlineCSS: ${inlineStyles}
---

<div class="amp-wp-article-content">
${ body }
</div>

`;

      fs.writeFileSync(path.join(directory, `${item.id}.md`), body);

      resolve();
    });

  });

}

/* Converts the provided RSS blog item into a consistent format. */
function onParseBlogPost(item) {
  var authorInBody = item.description.match(/\>Posted by ([^,]+),([^\<]+)/);
  var author = authorInBody ? authorInBody[1] : item.author;
  var role = authorInBody ? authorInBody[2] : '';

  return {
    type: 'Blog',
    id: item.link.substr(0, item.link.length - 1).split('/').pop(),
    date: item.date,
    author: author,
    role: role,
    avatar: authorGravatarHashes[author] ? 'https://www.gravatar.com/avatar/' + authorGravatarHashes[author] : item.enclosures[0].url,
    title: item.title,
    origin: `${item.link}amp/`,
    excerpt: item['rss:description']['#'].split("<img")[0],
    description: item.description,
  };
};


/* Converts the provided RSS video item into a consistent format. */
function onParseVideo(item) {
  var excerpt = item['media:group']['media:description']['#']
    .replace(/\"/g, "\\\"")
    .replace("Watch all Amplify episodes: https://goo.gl/B9CCl4", "")
    .replace("Subscribe to the The AMP Project YouTube channel for updates on new episodes of Amplify: https://goo.gl/g2Y8h7", "")
    .trim();

  return  {
    type: 'Video',
    id: item['yt:videoid']['#'],
    date: item.pubdate,
    author: item.author,
    role: '',
    origin: item.link,
    excerpt: excerpt,
    avatar: '',
    thumbnail: item['media:group']['media:thumbnail']['@'].url,
    title: item.title.replace(/\"/g, "\\\""),
  };
}


/* Sorts the entries by date and saves a YAML `blogs` array to the path specified */
function sortAndSave(blogEntries, yamlPath) {
  blogEntries.sort(function (a, b) {
    return b.date - a.date;
  });

  // cap at 6
  blogEntries = blogEntries.slice(0,6);

  // join all of the content
  blogEntriesYaml = blogEntries.map((item) =>
`
- type: ${ item.type}
  title: "${ item.title }"
  id: ${ item.id }
  author: ${ item.author }
  role: ${ item.role }
  origin: "${ item.origin }"
  excerpt: "${ item.excerpt }"${ item.thumbnail ? `\n  thumbnail: "${ item.thumbnail }"` : '' }
  avatar: ${ item.avatar }
  datedata: ${ moment(item.date).format() }
  date: "${ moment(item.date).format("MMMM D, YYYY") }"
`
  );

  // write it to disk
  fs.writeFileSync(yamlPath, 'blogs:\n' + blogEntriesYaml.join(''));
}

// -----

const fetchLatestContent = Promise.all([
  fetchFeedAsync({
    url: 'https://amphtml.wordpress.com/feed/',
    parseFunction: onParseBlogPost,
  }),
  fetchFeedAsync({
    url: 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLXTOW_XMsIDTIRIu4Af-bqfGkUhPSE75A',
    parseFunction: onParseVideo,
  }),
]).then(function(all) {
  var posts = all[0];
  var videos = all[1];

  // write the posts into their own files
  var promises = [];
  for (var post of posts) {
    promises.push(writeBlogPage(post, '../content/latest/blog/', '/content/latest/list-blog.html'));
  }

  return Promise.all(promises).then(function () {
    // combine posts and videos, sort, and save into list-blog.yml
    sortAndSave([].concat(posts, videos), '../content/includes/list-blog.yaml');
  });

});


const fetchLatestAdsContent = fetchFeedAsync({
  url: 'https://amphtml.wordpress.com/?s=ads&feed=rss2',
  parseFunction: onParseBlogPost,
}).then(function(posts) {
  // prepend the ids with 'ads-' so posts appearing in both sets
  // don't have colliding URLS
  for (var post of posts) {
    post.id = `ads-${post.id}`;
  }

  // write the posts into their own files
  for (var post of posts) {
    writeBlogPage(post, '../content/latest/blog-ads/', '/content/latest/list-blog.html');
  }

  // combine posts  and save into list-blog-ads.yml
  sortAndSave(posts, '../content/includes/list-blog-ads.yaml');
});

Promise.all([
  fetchLatestContent,
  fetchLatestAdsContent,
]).then(function() {
  console.log("Done.");
  process.exit(0);
}).catch(function(err) {
  console.error(err);
  process.exit(1);
});
