module.exports = {
  /** @type {import('cheerio').CheerioOptions} */
  cheerioOptions: {
    // Simply setting an `xml` key here forces Cheerio to use htmlparser2 instead of the more strict parse5.
    // https://cheerio.js.org/docs/advanced/configuring-cheerio#parsing-xml-with-htmlparser2
    xml: {
      // Our tests were written with this setting in mind.
      decodeEntities: false,
      // This indicates that we expect to parse HTML, not XML.
      // https://cheerio.js.org/docs/advanced/configuring-cheerio#using-htmlparser2-for-html
      xmlMode: false,
    },
  },
};
