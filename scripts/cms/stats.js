#!/usr/bin/env node

const fs = require('fs');
const stats = require('./stats');
const components = require('../component_categories.json');
const paths = {
    reference: '../../content/reference',
    components: '../../content/reference/components',
    docs: '../../content/docs'
};

let cache = {
    reference: {},
    components: {},
    docs: {}
};

function findComponentsInFiles(folder, cacheObj) {

    const files = fs.readdirSync(folder);
    for (const file of files) {

        if(file.includes('.')) {

            // skip undesired files
            if(!file.includes('.md')) {
                continue;
            }

            let contents = fs.readFileSync(folder + '/' + file, 'utf8');
            let mentionedComponents = new Set(contents.match(/amp\-(?![^*#=()&」\s\]\[\.<>`'’"/{]+\-0)[^*#=()&」\s\]\[\.<>`'’"/{]+/g));
            mentionedComponents.delete('amp-start');
            mentionedComponents.delete('amp-boilerplate');
            mentionedComponents.delete('amp-custom');

            cacheObj[folder.replace('../../content/', '') + '/' + file] = {
                //contents: contents,
                components: mentionedComponents
            }
        } else {

            // Edge case for the reference folder, where we don't want to recurse further..
            if(file === 'components') {
                continue;
            }

            findComponentsInFiles(folder + '/' + file, cacheObj);
        }
    
    }
}

// moves files that are translations into their respective root objects
function categorizeTranslations(cacheObj) {

    for (const doc in cacheObj) {
        if(doc.includes('@')) {

            const sourceDoc = doc.replace(/@[A-z_]+/, '');
            const lang = doc.match(/@[A-z_]+/)[0].substr(1);
            if(!cacheObj[sourceDoc]) {
                // TODO: Figure out why there's no root file..
                console.log(sourceDoc, doc);
                continue;
            }

            cacheObj[sourceDoc].translations = cacheObj[sourceDoc].translations || {};
            cacheObj[sourceDoc].translations[lang] = cacheObj[doc];
            delete cacheObj[doc];
        }
    }

}

findComponentsInFiles(paths.docs, cache.docs);
findComponentsInFiles(paths.reference, cache.reference);
findComponentsInFiles(paths.components, cache.components);

categorizeTranslations(cache.docs);
categorizeTranslations(cache.reference);
categorizeTranslations(cache.components);


console.log(cache.docs);
module.exports = exports = cache;