#!/usr/bin/env node

// dependencies
var fs = require('fs');
var moment = require('moment');

// config
var yamlPath = '../content/includes/blog_feed.yaml';
var count = 3;

// import yaml file
var yaml = fs.readFileSync(yamlPath, { encoding: 'utf8' });
var header = yaml.split("blog:\n")[0];
var main = "blog:\n";

// import RSS feed from blog with feed parser
var FeedParser = require('feedparser');
var request = require('request');

var req = request('https://amphtml.wordpress.com/feed/'),
    feedparser = new FeedParser();

req.on('response', function (res) {
  var stream = this;
  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
  stream.pipe(feedparser);
});

feedparser.on('end', function() {
  fs.writeFileSync(yamlPath, header + main);
  console.log("Blog posts successfully updated.");
});

feedparser.on('readable', function () {
  var item;
  while (item = this.read()) {
    if (--count >= 0) {
      main += `
  - article:
    title: "${ item.title }"
    href: "${ item.link }amp/"
    date: "${ moment(item.date).format("MMMM D, YYYY") }"
`;
    }
  }
});