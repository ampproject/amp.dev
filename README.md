AMPProject.org [![Build Status](https://travis-ci.org/ampproject/docs.svg?branch=production)](https://travis-ci.org/ampproject/docs)
=========================

You're looking at the source code of the official website of the AMP Project. 
Even if you don't plan on contributing, explore how we've built the site for 
a good example of how to build a canonical, responsive standalone AMP site.

How to build the site
---------------------

### Install

1.  Make sure you have [NodeJS](https://nodejs.org) installed.
2.  Install [Grow](http://grow.io):

    ```sh
    $ curl https://install.growsdk.org | bash
    ```
    
3.  Install the npm dependencies for the project:
    ```sh
    $ npm install
    ```

### Get a GitHub token or app id/secret

The docs in the reference section of the AMP Project site are not part of this repository; instead they are read from the [amphtml GitHub repository](https://github.com/ampproject/amphtml) "source of truth."  When building the site these docs are fetched via GitHub.

Due to GitHub quotas this fetching will quickly fail unless additional information is provided in the request.  This can be either a personal access token or an application id/secret.

#### Personal access token

  1. Request a GitHub [personal access token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/).  Since the docs are fetched from a public repository you only need to select the "public_repo" scope when creating the token.  (It's a good practice to limit the token to the scope you need.)
  2. In your shell, export the generated personal access token as `AMP_DOC_TOKEN`

#### Application client id and secret

If you prefer not to use a personal access token, you can also create a GitHub application and use its id and secret.

  1. Register for a [GitHub application](https://github.com/settings/applications/new).
  2. In your shell, export the application client id as `AMP_DOC_ID` and the client secret as `AMP_DOC_SECRET`.

### Build

```sh
$ grow build
```

This will generate a static, complete build of the site into the **build* folder.


### Develop

Note: Be sure to run `grow build` at least once to pull in reference docs before running the following command.

```sh
$ grow run
```

You can now open http://localhost:8080/ and continue working on the source files, then reload the page to see changes appear.

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
