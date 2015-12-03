AMP Project Documentation
=========================

The official documentation for the AMP Project, including AMP JS,
  AMP HTML and more.

How to build the site
---------------------

First, install Jekyll by running `gem install jekyll` in your shell, then:

### Develop

```sh
$ jekyll serve
```

You can now open http://127.0.0.1:4000/docs/ and continue working on the source files, then reload the page to see changes appear.

### Deploy

```sh
$ jekyll build
```

This will generate a static, complete build of the site into the **_site* folder.

### Import the reference docs

Out of the box, the reference docs are not bundled with the rest of the documentation. To pull them in (automatically from the amphtml github repo), do the following:

```sh
$ cd _scripts/
$ npm install octonode
$ ./import_reference_docs.js {{github client secret }}
```

You'll need to register for a Github application [here](https://github.com/settings/applications/new) to get a client id and secret you can use for authentication. When you're done, open the file `import_reference_docs.js` and modify line 15 to point to your new client id, then pass in the client secret as argument, like shown above (we'll make this a little easier in the future).

Support
-------

If you've found an error or inconsistency, please file an issue:
https://github.com/ampproject/docs/issues

Patches are encouraged, and may be submitted by forking this project and
submitting a pull request through GitHub.

License
-------

Copyright 2015 Google, Inc.

Licensed to the Apache Software Foundation (ASF) under one or more contributor
license agreements.  See the NOTICE file distributed with this work for
additional information regarding copyright ownership.  The ASF licenses this
file to you under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License.  You may obtain a copy of
the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  See the
License for the specific language governing permissions and limitations under
the License.
