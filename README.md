AMPProject.org [![Build Status](https://travis-ci.org/ampproject/docs.svg?branch=megamerge)](https://travis-ci.org/ampproject/docs)
=========================

You're looking at source code of the official website of the AMP Project. Even
if you don't plan on contributing, explore how we've built the site for a good
example at how to build a canonical, responsive standalone AMP site.

How to build the site
---------------------

Install [Grow](http://grow.io) and npm dependencies:

```sh
$ curl https://install.growsdk.org | bash
$ npm install
```

Get a Github client id and secret:

Out of the box, the reference docs are not bundled with the rest of the documentation. We'll fetch them via Github, and the only thing you have to do is the following:

  1. Register for a Github application [here](https://github.com/settings/applications/new)
  2. Find the client id and secret
  3. In your shell, export the id as `AMP_DOC_ID` and the secret as `AMP_DOC_SECRET`

### Develop

Note: Be sure to run `grow build` at least once to pull in reference docs before running the following command.

```sh
$ grow run
```

You can now open http://localhost:8080/ and continue working on the source files, then reload the page to see changes appear.

### Build

```sh
$ grow build
```

This will generate a static, complete build of the site into the **build* folder.

Support
-------

If you've found an error or inconsistency, please file an issue:
https://github.com/ampproject/docs/issues

Patches are encouraged, and may be submitted by forking this project and
submitting a pull request through GitHub.

License
-------

All image and audio files except in folders "source/img/partners",
"source/img/publishers" and "source/img/quotes" (including *.png, *.jpg, *.svg,
*.mp3, *.wav and *.ogg) are licensed under the CC-BY-NC license. Images in the
excluded folders are not licensed.

All other files are licensed under the Apache 2 license.

- - -

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
