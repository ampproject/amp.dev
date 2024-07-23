const componentVersions = require('./component-versions.json');

const {
  BUILT_IN_COMPONENTS,
  IMPORTANT_INCLUDED_ELEMENTS,
} = require('./AmpConstants.js');

let items = null;

const handler = async () => {
  if (!items) {
    const components = Object.keys(componentVersions).concat(
      BUILT_IN_COMPONENTS,
      IMPORTANT_INCLUDED_ELEMENTS
    );
    components.sort();
    items = {
      items: components,
    };
  }

  const body = JSON.stringify(items);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': ev.headers?.origin || '',
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache',
    },
    body,
  };
};

module.exports = {handler};
