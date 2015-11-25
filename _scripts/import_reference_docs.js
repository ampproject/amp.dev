#!/usr/bin/env node

var github = require('octonode');
var fs = require('fs');

var client = github.client({
  id: '96393b5b98b18d10aec2',
  secret: '5f6637224ec2eeff680161c88a93ea84fa8b68fe'
});
var ghrepo = client.repo('ampproject/amphtml');


function convertMarkdown(content) {

	// strip out first heading
	content = content.replace(/^#{3}\s.+/, '');

	// replace code
	content = content.replace(/\`\`\`(.+)/g, '{% highlight $1 %}');
	content = content.replace(/(\`\`\`)/g, '{% endhighlight %}');

	// create absolute urls from relative github urls
	content = content.replace(/\[([^\]]+)\]\((?!http)([^\)]+)\)/g, '[$1](https://github.com/ampproject/amphtml/blob/master/builtins/$2)');

	return content;
}



ghrepo.contents('builtins', "master", function(err, data) {
	
	if(err) {
		console.log(err);
		return;
	}


	var components = data.filter(function(obj) {
		if(/amp\-.*\.md/.test(obj.name)) {
			return true;
		} else {
			return false;
		}
	});

	console.log("Built-in components: \n======================");
	var index = 0;
	components.forEach(function(component) {

		var frontMatter = "---\nlayout: page\ntitle: " + component.name.replace('.md', '') + "\norder: " + index + "\n---\n";
		index++;

		ghrepo.contents(component.path, function(err, data) {

			var encodedContent = new Buffer(data.content, 'base64')
			var decodedContent = encodedContent.toString();

			// we need to concert some of the markdown from Github flavor to Jekyll flavor
			decodedContent = convertMarkdown(decodedContent);

			fs.writeFile('../_reference/' + component.name, frontMatter + decodedContent, function (err) {
			  if (err) throw err;
			  console.log('Suceesfully imported: ' + component.name);
			});

		});

	});
});

/*
ghrepo.contents('extensions', "master", function(err, data) {
	
	var components = data.filter(function(obj) {
		if(obj.type === 'dir') {
			return true;
		} else {
			return false;
		}
	});

	console.log("Extended components: \n======================");
	components.forEach(function(component) {
		console.log(component.name);
	});
});
*/