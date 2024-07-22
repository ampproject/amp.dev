const googleSearch = require('./googleSearch.js');

const DESCRIPTION_META_TAG = 'twitter:description';
const PAGE_SIZE = googleSearch.PAGE_SIZE;
const LAST_PAGE = googleSearch.MAX_PAGE;
const MAX_HIGHLIGHT_COMPONENTS = 3;
const MAX_HIGHLIGHT_COMPONENT_INDEX = 7;
const COMPONENT_REFERENCE_DOC_PATTERN =
  /^(?:https?:\/\/[^/]+)?(?:\/[^/]+)?\/documentation\/components\/(amp-[^/]+)/;

const DEFAULT_LOCALE = 'en';

/** Will remove/rewrite characters that cause problems when displaying */
function cleanupText(text) {
  // ` is problematic. For example `i will be rendered as ì.
  // It is not clear why, but we can simply convert it.
  text = text.replace(/`/g, "'");
  // sometimes markdown links (that may contain {{g.doc}} calls) are found, so remove them
  text = text.replace(
    /\[([^\]]+)\]\([^\)]*?(?:\{\{[^}]+\}[^\)]*)?(?:\)|$)/g,
    '$1'
  );
  return text;
}

/** do some additional cleanup to ensure the text is printed nicely */
function cleanupTexts(page) {
  page.title = cleanupText(page.title);
  page.description = cleanupText(page.description);
}

function getCseItemMetaTagValue(item, metaTag) {
  // since pagemap has always key:array the metatags dictionary is always the first element in the array
  const pagemap = item.pagemap;
  if (
    pagemap &&
    pagemap.metatags &&
    pagemap.metatags.length > 0 &&
    pagemap.metatags[0][metaTag]
  ) {
    return pagemap.metatags[0][metaTag];
  }
  return null;
}

function enrichComponentPageObject(item, page, locale) {
  const description = getCseItemMetaTagValue(item, DESCRIPTION_META_TAG);
  if (description) {
    page.description = description;
  }

  if (page.title) {
    // cut off "Documentation: " prefix...
    const prefixIndex = page.title.lastIndexOf(':');
    if (prefixIndex > 0 && prefixIndex + 1 < page.title.length) {
      page.title = page.title.substring(prefixIndex + 1).trim();
    }
  }

  addExampleAndPlaygroundLink(page, locale);
}

function createResult(
  totalResults,
  page,
  lastPage,
  components,
  pages,
  query,
  locale
) {
  const result = {
    result: {
      totalResults: totalResults,
      currentPage: page,
      pageCount: lastPage,
      components: components,
      pages: pages,
    },
    initial: false,
  };

  if (page == LAST_PAGE && lastPage > LAST_PAGE) {
    result.result.isTruncated = true;
  }

  const searchBaseUrl = new URL(
    '/search/do?q=' +
      encodeURIComponent(query) +
      '&locale=' +
      encodeURIComponent(locale) +
      '&page=https://amp.dev/'
  ).toString();

  if (page < lastPage && page < LAST_PAGE) {
    result.nextUrl = searchBaseUrl + (page + 1);
  }
  if (page > 1) {
    result.prevUrl = searchBaseUrl + (page - 1);
  }
  return JSON.stringify(result);
}

const handler = async (ev) => {
  const searchQuery = ev.queryStringParameters;

  const locale = searchQuery.locale ? searchQuery.locale : DEFAULT_LOCALE;
  const page = searchQuery.page ? parseInt(searchQuery.page) : 1;
  const query = searchQuery.q ? searchQuery.q.trim() : '';

  // The hidden query ensures we only get english results when the locale is en (default)
  // The blog and playground should be included without the page-locale metatag
  const searchOptions = {
    hiddenQuery:
      `more:pagemap:metatags-page-locale:${locale}` +
      'OR site:blog.amp.dev OR site:playground.amp.dev',
  };

  if (locale != DEFAULT_LOCALE) {
    // For other languages also include en, since the index only contains the translated pages.
    searchOptions.hiddenQuery =
      `more:pagemap:metatags-page-locale:${config.getDefaultLocale()}` +
      `OR ${searchOptions.hiddenQuery}`;
    searchOptions.noLanguageFilter = true;
  }

  if (isNaN(page) || page < 1 || query.length == 0) {
    const error =
      'Invalid search params (q=' +
      request.query.q +
      ', page=' +
      request.query.page +
      ')';
    console.error(error);
    // No error status since an empty query can always happen with our search template
    // and we do not want error messages in the client console

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify({error}),
    };
  }

  let highlightComponents = page == 1;

  let cseResult = undefined;
  try {
    cseResult = await googleSearch.search(query, locale, page, searchOptions);
  } catch (err) {
    // problem was logged before, so simply forward the error
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': ev.headers?.origin || '',
        'Content-Type': 'text/plain',
        'Cache-Control': `no-cache`,
      },
      body: err,
    };
  }

  const totalResults = parseInt(cseResult.searchInformation.totalResults);
  const pageCount = Math.ceil(totalResults / PAGE_SIZE);
  const pages = [];
  const components = [];

  if (totalResults > 0) {
    let componentCount = 0;
    for (let i = 0; i < cseResult.items.length; i++) {
      const item = cseResult.items[i];
      const page = createPageObject(item);

      if (
        highlightComponents &&
        i <= MAX_HIGHLIGHT_COMPONENT_INDEX &&
        COMPONENT_REFERENCE_DOC_PATTERN.test(page.url)
      ) {
        enrichComponentPageObject(item, page, locale);
        components.push(page);
        componentCount++;
        if (componentCount >= MAX_HIGHLIGHT_COMPONENTS) {
          highlightComponents = false;
        }
      } else {
        pages.push(page);
      }

      cleanupTexts(page);
    }
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
    },
    body: createResult(
      totalResults,
      page,
      pageCount,
      components,
      pages,
      query,
      locale
    ),
  };
};

module.exports = {handler};
