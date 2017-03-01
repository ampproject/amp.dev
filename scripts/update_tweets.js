#!/usr/bin/env node

// dependencies
var fs = require('fs');
var moment = require('moment');

// config
var yamlPath = '../content/includes/tweets.yaml';
var count = 5;

// import RSS feed from blog with feed parser
var FeedParser = require('feedparser');
var request = require('request');

// setup feed parser
var req = request('https://queryfeed.net/tw?q=%40amphtml');
var feedparser = new FeedParser();
var body = 'tweets:\n';

req.on('response', function (res) {
  var stream = this;
  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
  stream.pipe(feedparser);
});

feedparser.on('end', function() {
  fs.writeFileSync(yamlPath, body);
  console.log("Tweets successfully updated.");
});

feedparser.on('readable', function () {
  var item;
  while (item = this.read()) {

    // write into the body for the homepage excerpt file
  if (--count >= 0) {

    var author = item.title.match(/^\@([^\s]+) (.+)/);
    var tweetId = item.link.substr(20).split('/')[2];

    body += `
  - origin_name: ${ author[2] }
    origin_id: ${ author[1] }
    origin_href: https://twitter.com/${ author[1] }`;

    if (author[1] !== 'AMPhtml') {
      body += `
    retweet_id: AMPhtml
    retweet_href: https://twitter.com/amphtml`;
    }

    var description = item.description
      .replace(/\<img class=\"Emoji[^\>]+alt=\"([^\"]+)\"[^\>]+\>/g, "$1")
      .replace(/\n/g, '');

    body += `
    tweet_id: ${ tweetId }
    date_data: ${ moment(item.date).format() }
    date: ${ moment(item.date).format("MMMM D, YYYY") }
    text: >
      ${ description }
`;
    }



  }
});