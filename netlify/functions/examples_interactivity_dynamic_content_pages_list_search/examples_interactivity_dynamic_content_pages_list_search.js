const MAX_PAGE_COUNT = 5;
const ITEMS_PER_PAGE = 4;

const handler = async (ev) => {
  const query = ev.queryStringParameters;
  let page = Number(query.page);
  let body;

  if (page < 1 || !page) {
    page = 1;
  }

  if (page <= MAX_PAGE_COUNT && page > 0) {
    body = JSON.stringify(generatePagedResponse(page));
  } else {
    body = JSON.stringify({error: 'Invalid page'});
  }

  function generatePagedResponse(page) {
    const IMAGES = [
      '/static/samples/img/product1_640x426.jpg',
      '/static/samples/img/product2_640x426.jpg',
      '/static/samples/img/product3_640x426.jpg',
      '/static/samples/img/product4_640x426.jpg',
      '/static/samples/img/product5_640x408.jpg',
      '/static/samples/img/product6_640x424.jpg',
    ];

    const response = {
      currentPage: page,
      pageCount: MAX_PAGE_COUNT,
      products: [],
    };

    for (let i = 0; i < ITEMS_PER_PAGE; i++) {
      const itemIndex = ITEMS_PER_PAGE * (page - 1) + i + 1;
      const productListing = {
        title: `Food ${itemIndex}`,
        image: IMAGES[(itemIndex % IMAGES.length) - 1],
        copy: `Lorem ipsum dolor sit ${itemIndex} amet consequitur sine nice fun`,
      };
      response.products.push(productListing);
    }

    return JSON.stringify({
      items: response,
    });
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Cache-Control': 'public, max-age=0, stale-while-revalidate=0',
      'Content-Type': 'application/json',
    },
    body,
  };
};

module.exports = {handler};
