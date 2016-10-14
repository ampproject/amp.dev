#!/usr/bin/env node

var github = require('octonode');
const fs = require('fs');
const path = require('path');
var clientSecret = process.argv[2] || process.env.AMP_DOC_SECRET;
var clientId = process.argv[3] || process.env.AMP_DOC_ID;
var localPath = process.env.AMP_DOC_LOCAL_PATH;
var importData = require('./import_docs.json');

if(!clientSecret || !clientId) {
  console.error("This script requires a github id and app secret to run. Export them in your shell as AMP_DOC_ID and AMP_DOC_SECRET.");
  process.exit(1);
}

var client = github.client({
  id: clientId,
  secret: clientSecret
});
var ghrepo = client.repo('ampproject/amphtml');

function downloadPage(filePath, callback, headingToStrip) {

  var process = function (err, data) {

    if (err) {
      throw err;
    }

    var encodedContent = new Buffer(data.content || data, 'base64')
    var decodedContent = encodedContent.toString();

    // we need to concert some of the markdown from Github flavor to Jekyll flavor
    var relativePath = filePath.substr(0, filePath.lastIndexOf("/"))
    decodedContent = convertMarkdown(decodedContent, relativePath, headingToStrip);

    callback(decodedContent);

  };

  if (localPath) {
    fs.readFile(path.resolve(localPath, filePath), process);
  } else {
    ghrepo.contents(filePath, process);
  }

}

function savePage(config, callback) {
  var frontMatter = "---\n$title: " + config.title + "\n$order: " + (config.order || 0) + "\n---\n";
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

  // replace code
  content = content.replace(/(\`\`\`)(([A-z\-]*)\n)(((?!\`\`\`)[\s\S])+)(\`\`\`\n)/gm, function (match, p1, p2, p3, p4) {
    // work around for mustache-style curly braces to not mess with Grow
    if (p4.indexOf('{{') > -1) {
      p4 = "{% raw %}" + p4 + '{% endraw %}';
    }
    return '[sourcecode' + (p3 ? ':' + p3 : '') + ']\n' + p4 + '[/sourcecode]\n';
  });
  content = content.replace(/\`[^`]*(\{\{[^`]*\}\})[^`]*\`/g, '{% raw %}`$1`{% endraw %}');

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
      order: item.order
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

    downloadPage(component.path, function(pageContent) {
      savePage({
        destination: '../content/docs/reference/components/' + component.name,
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

      // download the page contents
      downloadPage(subComponent.path, function(pageContent) {
        // save it to the extended folder
        savePage({
          destination: '../content/docs/reference/components/' + subComponent.name,
          content: pageContent,
          order: order,
          parent: '/content/docs/components.md',
          title: subComponent.name.replace('.md', '')
        }, function (err) {
          if (err) throw err;
          console.log('Successfully imported: ' + subComponent.name + ' (Extended)');
        });
      }, 1);

    });

    index++;

  });
});
