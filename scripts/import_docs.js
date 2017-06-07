#!/usr/bin/env node

var github = require('octonode');
const fs = require('fs');
const path = require('path');
var clientSecret = process.argv[2] || process.env.AMP_DOC_SECRET;
var clientId = process.argv[3] || process.env.AMP_DOC_ID;
var clientToken = process.env.AMP_DOC_TOKEN;
var localPath = process.env.AMP_DOC_LOCAL_PATH;
var importData = require('./import_docs.json');
var subfolderLookupTable = require('./component_categories.json');

if(!(clientToken || (clientSecret && clientId))) {
  console.error("This script reads the reference docs from GitHub which requires providing either a GitHub personal access token (AMP_DOC_TOKEN) or GitHub application id/secret (AMP_DOC_ID and AMP_DOC_SECRET).  See README.md for more information.");
  process.exit(1);
}

var client = github.client(
    clientToken ||
	{
	  id: clientId,
	  secret: clientSecret
	});

var ghrepo = client.repo('ampproject/amphtml');

function downloadPage(filePath, callback, headingToStrip) {

  var process = function (err, data) {

    if (err) {
      throw err;
    }

    if (data && data.content !== undefined && !data.content.length) {
      console.log("Skipping " + filePath + ", file is empty..");
      return;
    }


    var encodedContent = new Buffer(data.content || data, 'base64')
    var decodedContent = encodedContent.toString();

    // we need to concert some of the markdown from Github flavor to Jekyll flavor
    var relativePath = filePath.substr(0, filePath.lastIndexOf("/"));
    var title = decodedContent.match(/^#{1}\s.+\<\/a\>\s(.+)/m);
    title = title ? title[1].replace(/\`/g, '') : null;
    decodedContent = convertMarkdown(decodedContent, relativePath, headingToStrip);

    callback(decodedContent, title);

  };

  if (localPath) {
    fs.readFile(path.resolve(localPath, filePath), process);
  } else {
    ghrepo.contents(filePath, process);
  }

}

function getDependencies(content) {

  var dependencies = content
    // remove all sourcecode blocks to not match false positives
    .replace(/\[sourcecode:?[^\]]*\](((?!\[\/sourcecode\])[\s\S])+)\[\/sourcecode\]/gm, '\n')
    // remove inline code
    .replace(/`[^`]+`/g, '')
    // find all used amp tags in the page
    .match(/<amp-((?!img[\/\s>])[^>\s]+)[^>]*>/g);

  console.log("Dependencies: " + dependencies);
  if (dependencies) {
    return Array.from(new Set(dependencies.map(item => item.match(/<amp-((?!img[\/\s>])[^>\s]+)[^>]*>/)[1])));
  }

  return null;

}

function savePage(config, callback) {

  var optionalTOC = config.content.indexOf('[TOC]') > -1 ? 'toc: true\n' : '';
  var optionalCategory = (config.category ? "\n$category: " +  config.category : '');
  var optionalDependencies = getDependencies(config.content);
  optionalDependencies = optionalDependencies ? '\ncomponents:\n' + '  - ' + optionalDependencies.join('\n  - ') + '\n' : '';

  var frontMatter = `---
$title: "${config.title}"
$order: ${config.order || 0}${optionalCategory}
${optionalTOC}${optionalDependencies}---
`;

  fs.writeFile(config.destination, frontMatter + config.content, callback);

}

function convertMarkdown(content, relativePath, headingToStrip) {

  // strip out first heading
  content = content.replace(headingToStrip === 1 ? (/^#{1}\s.+/m) : (/^#{3}\s.+/m), '');

  // this regular expression is crazy. Adds a newline before lists so they are parsed
  // as proper lists by Jekyll.
  content = content.replace(/(\n(?![^\S\n]*\*[^\S\n])(?![^\S\n]*\-)[^\n]+\n)([^\S\n]*?(?!\*\*)((\-\s)|(\*\s)|(1\.\s)))/gm, '$1\n$2');

  // for comments to be parsed correctly as HTML, we need an extra line break
  content = content.replace('<!---', '\n<!---');

  // replace code blocks
  content = content.replace(/(\`\`\`)(([A-z\-]*)\n)(((?!\`\`\`)[\s\S])+)(\`\`\`\n)/gm, function (match, p1, p2, p3, p4) {
    // work around for mustache-style curly braces to not mess with Grow
    if (p4.indexOf('{{') > -1) {
      p4 = "{% raw %}" + p4 + '{% endraw %}';
    }
    return '[sourcecode' + (p3 ? ':' + p3 : ':none') + ']\n' + p4 + '[/sourcecode]\n';
  });

  // replace mustache-style code elements
  content = content.replace(/\`[^\s{`]*(\{\{[^`]*\}\})[^`]*\`/g, '{% raw %}`$1`{% endraw %}');

  // horizontal rules like --- will break front matter
  content = content.replace(/\n---\n/gm, '\n- - -\n');

  // create absolute urls from relative github urls
  content = content.replace(/\[([^\]]+)\]\((?!http|#)([^\)]+)\)/g, '[$1](https://github.com/ampproject/amphtml/blob/master/' + relativePath + '/$2)');

  // now substitute links going to extensions with relative urls to the downloaded ones
  content = content.replace(/https\:\/\/github.com\/ampproject\/amphtml\/blob\/master\/extensions\/[^\/]+\/([^\.]+)\.md/g, "components/$1.html");

  return content;
}

/*
 * Imports all docs specified in the import_docs.json config file.
 */
importData.forEach((item) => {

  downloadPage(item.from, function(pageContent) {
    savePage({
      destination: '../content/' + item.to,
      content: (item.toc ? '[TOC]\n' : '') + pageContent,
      title: item.title,
      order: item.order,
      category: (item.category ? item.category : '')
    }, function (err) {
      if (err) throw err;
      console.log('Successfully imported: ' + item.title);
    });
  }, 1);

});

// Download built-in AMP component ref docs
ghrepo.contents('builtins', 'master', function(err, data) {

  if(err) {
    throw err;
  }

  var components = data.filter(function (obj) {
    return /amp\-.*\.md/.test(obj.name);
  });

  var index = 0;
  components.forEach(function(component) {

    index++;

    // if we don't know how to categorize this one, warn and skip
    var subfolder = subfolderLookupTable[component.name.replace(/\.md$/, '')];
    if (!subfolder) {
      console.warn("Warning: Don\t know how to categorize " + component.name + ', skipping..');
      return;
    }

    downloadPage(component.path, function(pageContent) {
      savePage({
        destination: '../content/docs/reference/components/' + subfolder + '/' + component.name,
        content: pageContent,
        title: component.name.replace('.md', '') + ' (Built-in)'
      }, function (err) {
        if (err) throw err;
        console.log('Successfully imported: ' + component.name + ' (Built-in)');
      });
    }, 1);

  });
});

// download extension component ref docs
ghrepo.contents('extensions', "master", function(err, data) {

  if(err) {
    throw err;
  }

  // grab extended component sub pages
  var components = data.filter(function(obj) {
    return obj.type === 'dir';
  });

  var index = 0;
  components.forEach(function(component) {

    var order = index;

    ghrepo.contents(component.path, "master", function(err, data) {

      // fish out the markdown file from the folder
      var subComponent;
      for (var i = 0; i < data.length; i++) {
        if(data[i].type === 'file' && data[i].name === component.name + '.md') {
          subComponent = data[i];
          break;
        }
      }

      // if there's nothing in the folder for some reason, skip
      if(!subComponent) {
        return;
      }

      // if we don't know how to categorize this one, warn and skip
      var subfolder = subfolderLookupTable[subComponent.name.replace(/\.md$/, '')];
      if (!subfolder) {
        console.warn("Warning: Don\'t know how to categorize " + subComponent.name + ', skipping..');
        return;
      }

      // download the page contents
      downloadPage(subComponent.path, function(pageContent, title) {
        // save it to the extended folder

        savePage({
          destination: '../content/docs/reference/components/' + subfolder + '/' + subComponent.name,
          content: pageContent,
          order: order,
          parent: '/content/docs/components.md',
          title: title || subComponent.name.replace('.md', '')
        }, function (err) {
          if (err) throw err;
          console.log('Successfully imported: ' + subComponent.name + ' (Extended)');
        });
      }, 1);

    });

    index++;

  });
});
