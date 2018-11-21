#!/usr/bin/env node
const blc = require('broken-link-checker');
const chalk = require('chalk');
const siteUrl = 'http://localhost:8080/';
const checked = [];

const options = {
  excludedKeywords: [
    /* External URLs that return weird head responses */
    'https://youtube.com/TheAMPProject',
    'https://www.myntra.com/amp/lipstick',
    'https://vk.com/',
    'https://beopinion.com/', // seems down, but not on us..
    'https://beachfrontreach.com/', // bad SSL
    'https://www.drupal.org/project/amp',
    'https://textpattern.com/weblog/401/textpattern-website-redesign/amp',
    'https://www.tumblr.com/about',
    'https://www.linkedin.com/',
    'https://fonts.googleapis.com',
    'https://fast.fonts.net/',
    'https://developer.mozilla.org/id/docs/Web/CSS/@font-face',
    'https://developer.mozilla.org/tr/docs/Web/CSS/%40font-face',
    'https://developer.mozilla.org/id/docs/Web/HTML/Element/img',
    'https://developer.mozilla.org/pt-BR/docs/Web/API/Navigator/sendBeacon',
    /* Development and cache URLs */
    'http://localhost:3000/',
    'http://localhost:3000/*',
    'http://localhost:8000/*',
    'https://cdn.ampproject.org/',
    /* Old AMP Roadshow links obviously don't work anymore.. */
    'https://events.withgoogle.com/amp-roadshow*',
    /* the following are excluded to slightly speed up the link checker, often OK because
     * they're not directly related to this repo.
     */
    'https://github.com/ampproject/amphtml/issues/*',
    'https://github.com/ampproject/amphtml/blob/master/ads/*',
    'http://localhost:8080/latest/blog/*',
    'http://localhost:8080/*/latest/blog/*'
  ]
};

var siteChecker = new blc.SiteChecker(options, {

  link: function(result){

    if(!checked[result.url.resolved]) {
      checked[result.url.resolved] = 1;
    } else {
      return;
    }

    if (result.broken) {
      console.log(
        chalk.gray('├─') +
        chalk.red('BROKEN') +
        chalk.gray('─ ') +
        chalk.yellow( result.url.resolved ) +
        chalk.gray(' ('+ result.brokenReason +', ', result.base.original,')')
      );
    } else if (result.excluded) {
      console.log(result.excludedReason);
    } else {
      /*console.log(
        chalk.gray('├─') +
        chalk.gray('──') +
        chalk.green('OK') +
        chalk.gray('─── ') +
        chalk.yellow( result.url.resolved )
      );*/
    }

  },
  //page: function(error, pageUrl){},
  //site: function(error, siteUrl){},
  end: function(){}

});

siteChecker.enqueue(siteUrl);