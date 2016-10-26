#!/usr/bin/env node

// dependencies
var fs = require('fs');
var newYaml;

function addAds() {

  // Read in amp-ad file, and the ad vendors
  var ampAd = fs.readFileSync('../content/docs/reference/components/amp-ad.md', { encoding: 'utf8' });
  var supportPortion = (ampAd.split('## Supported ad networks')[1]).split('##')[0].trim();
  var vendorNames = supportPortion.split('\n');

  vendorNames = vendorNames.map(a => {
    var match = a.match(/\[([^\]]+)\]\(([^\)]+)\)/);
    var title = match[1];
    var link = match[2];
    return 'title: ' + title + '\n          link: ' + link;
  });

  newYaml += `
    - title@: Ads
      section_items:
        - `;

  newYaml += vendorNames.join('\n        - ');

}

function addAnalytics() {

  // Read in amp-ad file, and the ad vendors
  var ampAnalytics = fs.readFileSync('../content/docs/reference/components/amp-analytics.md', { encoding: 'utf8' });
  var supportPortion = (ampAnalytics.split('## Analytics vendors')[1]).split('\n## ')[0];
  var individualVendors = supportPortion.split('\n###');
  individualVendors.shift();

  individualVendors = individualVendors.map(function (a) {
    var title = a.match(/^.*/)[0].trim();
    var link = a.match(/\[[^\]]+\]\((http[^\)]+)\)/);

    return 'title: ' + title + '\n          link: ' + (link ? link[1] : '');
  });

  newYaml += `
    - title@: Analytics
      section_items:
        - `;

  newYaml += individualVendors.join('\n        - ');

}

function addContentPlatforms() {
  newYaml += `
    - title@: Content Platforms
      section_items:
        - title: Google
          link:
        - title: Hatena
          link:
        - title: LinkedIn
          link:
        - title: Medium
          link:
        - title: Nuzzel
          link:
        - title: Pinterest
          link:
        - title: Reddit
          link:
        - title: Twitter
          link:`;
}

function addCMS() {
  newYaml += `
    - title@: CMS
      section_items:
        - title: Drupal
          link:
        - title: Hatena
          link:
        - title: Marfeel
          link:
        - title: Squarespace
          link:
        - title: WordPress
          link:`;
}

function addVideo() {
  newYaml += `
    - title@: Audio/Video
      section_items:
        - title: AOL O2
          link:
        - title: Beachfront Reach
          link:
        - title: Brid.tv
          link:
        - title: Brightcove
          link:
        - title: Dailymotion
          link:
        - title: Gfycat
          link:
        - title: JW Player
          link:
        - title: Kaltura
          link:
        - title: Soundcloud
          link:
        - title: Springboard
          link:
        - title: Vimeo
          link:
        - title: Vine
          link:
        - title: YouTube
          link:`;
}

// Put them into the right location in the YAML
newYaml = `page_title: "Participants"

tech_companies:
  section_title@: Technology Companies using AMP
  sections:`;

addAds();
addAnalytics();
addContentPlatforms();
addCMS();
addVideo();

// Save back to disk
fs.writeFileSync('../content/includes/who.yaml', newYaml);


