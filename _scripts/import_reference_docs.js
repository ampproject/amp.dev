#!/usr/bin/env node

var github = require('octonode');
var fs = require('fs');
var secret = process.argv[2] || process.env.AMP_DOC_SECRET;

if(!secret) {
	console.error("This script requires a github app secret to run.");
	process.exit(1);
}

var client = github.client({
  id: '96393b5b98b18d10aec2',
  secret: secret
});
var ghrepo = client.repo('ampproject/amphtml');

function downloadPage(component, callback, headingToStrip) {

	ghrepo.contents(component.path, function(err, data) {

		var encodedContent = new Buffer(data.content, 'base64')
		var decodedContent = encodedContent.toString();

		// we need to concert some of the markdown from Github flavor to Jekyll flavor
		var relativePath = component.path.substr(0, component.path.lastIndexOf("/"))
		decodedContent = convertMarkdown(decodedContent, relativePath, headingToStrip);

		callback(decodedContent);

	});

}

function savePage(config, callback) {
	var frontMatter = "---\nlayout: page\ntitle: " + config.title + "\norder: " + (config.order || 0) + (config.folder ? "\nfolder: " + config.folder : "") + "\n---\n";
	fs.writeFile(config.destination, frontMatter + config.content, callback);
}

function convertMarkdown(content, relativePath, headingToStrip) {

	// strip out first heading
	content = content.replace(headingToStrip === 1 ? (/^#{1}\s.+/m) : (/^#{3}\s.+/m), '');

	// this regular expression is crazy. Adds a newline before lists so they are parsed
	// as proper lists by Jekyll.
	content = content.replace(/(\n(?![^\S\n]*\*[^\S\n])(?![^\S\n]*\-)[^\n]+\n)([^\S\n]*?(?!\*\*)[\-\*])/gm, '$1\n$2');

	// for comments to be parsed correctly as HTML, we need an extra line break
	content = content.replace('<!---', '\n<!---');

	// replace code
	content = content.replace(/\`\`\`(.+)/g, '{% highlight $1 %}');
	content = content.replace(/(\`\`\`)/g, '{% endhighlight %}');

	// create absolute urls from relative github urls
	content = content.replace(/\[([^\]]+)\]\((?!http)([^\)]+)\)/g, '[$1](https://github.com/ampproject/amphtml/blob/master/' + relativePath + '/$2)');

	// now substitute links going to extensions with relative urls to the downloaded ones
	content = content.replace(/https\:\/\/github.com\/ampproject\/amphtml\/blob\/master\/extensions\/[^\/]+\/([^\.]+)\.md/g, "extended/$1.html");

	return content;
}


ghrepo.contents('builtins', "master", function(err, data) {
	
	if(err) {
		throw err;
	}


	var components = data.filter(function(obj) {
		if(/amp\-.*\.md/.test(obj.name)) {
			return true;
		} else {
			return false;
		}
	});

	var index = 0;
	components.forEach(function(component) {

		var frontMatter = "---\nlayout: page\ntitle: " + component.name.replace('.md', '') + "\norder: " + index + "\n---\n";
		index++;

		downloadPage(component, function(pageContent) {
			savePage({
				destination: '../_reference/' + component.name,
				content: pageContent,
				title: component.name.replace('.md', '')
			}, function (err) {
				if (err) throw err;
				console.log('Successfully imported: ' + component.name + ' (Built-in)');
			});
		});

	});
});


ghrepo.contents('extensions', "master", function(err, data) {

	if(err) {
		throw err;
	}

	// grab README and stick in to extened.md
	var readme;
	for (var i = 0; i < data.length; i++) {
		if(data[i].name === "README.md") {
			readme = data[i];
			break;
		}
	}

	// download the page contents
	downloadPage(readme, function(pageContent) {
		// save it
		savePage({
			destination: '../_reference/extended.md',
			content: pageContent,
			order: 4,
			title: "Extended components",
			folder: 'extended'
		}, function (err) {
			if (err) throw err;
			console.log('Successfully imported: ' + readme.name + ' (Extended overview page)');
		});
	}, 1);

	// grab extended component sub pages
	var components = data.filter(function(obj) {
			return obj.type === 'dir';
	});

	var index = 0;
	components.forEach(function(component) {

		var order = index;

		ghrepo.contents(component.path, "master", function(err, data) {

			// fish out the markdown file from the folder
			var component;
			for (var i = 0; i < data.length; i++) {
				if(data[i].type === 'file' && /\.md$/.test(data[i].name)) {
					component = data[i];
					break;
				}
			}

			// download the page contents
			downloadPage(component, function(pageContent) {
				// save it to the extended folder
				savePage({
					destination: '../_reference/extended/' + component.name,
					content: pageContent,
					order: order,
					title: component.name.replace('.md', '')
				}, function (err) {
					if (err) throw err;
					console.log('Successfully imported: ' + component.name + ' (Extended)');
				});
			});

		});

		index++;
		
	});
});
