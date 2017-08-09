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


function writeBlogPage(item, directory, parent) {
  var body = item.description
    .replace(/\<[A-z]+\>Posted by([^\<]+)\<\/[A-z]+\>/, "")
    // Replace spans that make text bold to <strong> tags
    .replace(/<span style="font-weight:400;">(((?!<\/span>)[\s\S])*)<\/span>/g, "<strong>$1</strong>")
    // Replace spans that add underlines to <u> tags
    .replace(/<span style="text-decoration:underline;">(((?!<\/span>)[\s\S])*)<\/span>/g, "<u>$1</u>")
    // Convert centered p's to <center> tags
    .replace(/<p style="text-align:center;">(((?!<\/p>)[\s\S])*)<\/p>/g, "<center>$1</center>")
    // Replace Wordpress-style images with their AMP equivalents (don't try this at home)
    .replace(
      /<img[^>]+data-orig-size="([\d]+),([\d]+)"[^>]+class="([^"]+)"[^>]+src="([^"]+)"[^>]+srcset="([^"]+)[^>]+sizes="([^"]+)"[^>]+\/>/g,
      "<div class=\"wp-image $3\"><amp-img layout='responsive' width=\"$1\" height=\"$2\" src=\"$4\" srcset=\"$5\" sizes=\"$6\"></amp-img>"
    )
    // Replace Wordpress-style gifs with their AMP equivalents (don't try this at home)
    .replace(
      /<img[^>]+[^>]+class="([^"]+)"[^>]+src="([^"]+)"[^>]+width="([\d]+)"[^>]+height="([\d]+)"[^>]+\/>/g,
      "<div class=\"wp-image $1\"><amp-img layout='fixed' width=\"$3\" height=\"$4\" src=\"$2\"></amp-img>"
    )
    // Replace other style tags we didn't catch and hope for the best..
    .replace(/style="[^"]+"/g, "")
    // Remove the tracking meta at the bottom of the page
    .split('<a rel="nofollow"')[0];

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
$date: ${ moment(item.date).format("MMMM D, YYYY") }
$parent: ${parent}
$path: /latest/blog/{base}/
$localization:
  path: /{locale}/latest/blog/{base}/
components:
  - social-share
---

<div class="amp-wp-article-content">
${ body }
</div>

`;

  fs.writeFileSync(path.join(directory, `${item.id}.md`), body);
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
  for (var post of posts) {
    writeBlogPage(post, '../content/latest/blog/', '/content/latest/list-blog.html');
  }

  // combine posts and videos, sort, and save into list-blog.yml
  sortAndSave([].concat(posts, videos), '../content/includes/list-blog.yaml');
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
