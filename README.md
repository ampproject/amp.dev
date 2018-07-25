# amp.dev

This repository is meant to work towards the relaunch of the official website
of [ampproject.org](https://www.ampproject.org/) until we reach a progress
that makes a merge over to the original repository beneficial.

In the meantime we encourage you to keep using the [current repository](https://github.com/ampproject/amphtml) for feedback and updates.

## How to build the site

### Install

1.  Install the LTS version of [NodeJS](https://nodejs.org). An easy way to do so is with `nvm`. (Mac and Linux: [here](https://github.com/creationix/nvm), Windows: [here](https://github.com/coreybutler/nvm-windows))
    ```sh
    $ nvm install --lts
    ```

2.  Install [Grow](http://grow.io):
    ```sh
    $ curl https://install.growsdk.org | bash
    ```

3.  Install the stable version of [Yarn](https://yarnpkg.com/). (Mac and Linux: [here](https://yarnpkg.com/en/docs/install#alternatives-stable), Windows: [here](https://yarnpkg.com/lang/en/docs/install/#windows-stable))
    ```sh
    curl -o- -L https://yarnpkg.com/install.sh | bash
    ```

4.  Install the dependencies for the project:
    ```sh
    $ yarn
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

## Support

If you've found an error or inconsistency, please [file an issue](
https://github.com/ampproject/docs/issues).

Patches are encouraged. See [Contributing](CONTRIBUTING.md) for details.

## Site details

If you're working with the ampproject.org site, see [AMPProject.org files & build process](contributing/ampproject-files-build-process.md) for details on how  the site is built, the purpose of certain files, and other important information.

## License

All image and audio files except in folders "assets/img/partners",
"assets/img/publishers", "assets/img/quotes", and ""assets/img/about" (including *.png, *.jpg, *.svg,
*.mp3, *.wav and *.ogg) are licensed under the CC-BY-NC license. Images in the
excluded folders are not licensed.

All other files are licensed under the [Apache License, Version 2.0](LICENSE).


- - -

Copyright 2018 Google, Inc.

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
