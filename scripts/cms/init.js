#!/usr/bin/env node

const fs = require('fs');
const stats = require('./stats');
const components = require('../component_categories.json');
const paths = {
    components: '../../content/reference/components',
    docs: '../../content/docs'
};



function findGuidesMentioningComponent(component = '') {

}

function findTutorialsMentioningComponent(component = '') {

}

for (const component in components) {
    
    let category = components[component];
    
    components[component] = {
        category: category,
        docs: {
            reference: paths.components + '/' +  category + '/' + component + '.md',
            guides: findGuidesMentioningComponent(component),
            tutorials: findTutorialsMentioningComponent(component)
        },
        samples: null,
        templates: null
    }
}

//console.log(components);