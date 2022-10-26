const products = require('./related_products.json');

function findProducts(name = '', color = 'all') {
  color = color.toLowerCase();
  name = name.toLowerCase();

  return products.items.filter((prod) => {
    return (
      prod.name.toLowerCase().includes(name) &&
      (prod.color.toLowerCase().includes(color) || color === 'all')
    );
  });
}

const handler = async (ev) => {
  const query = ev.queryStringParameters;

  const productQuery = !!query.searchProduct ? query.searchProduct : '';
  const colorQuery = !!query.searchColor ? query.searchColor : '';

  // find products that match the query
  const items = findProducts(productQuery, colorQuery);

  // sort products
  const sortQuery = !!query.sort ? query.sort : '';
  if (sortQuery !== '') {
    let comparator;
    if (sortQuery === 'price-descendent') {
      comparator = (a, b) => Number(b.price) - Number(a.price);
    } else {
      comparator = (a, b) => Number(a.price) - Number(b.price);
    }
    items.sort(comparator);
  }

  const body = JSON.stringify({items});

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    },
    body,
  };
};

module.exports = {handler};
