# amp.dev

This repository is meant to work towards the relaunch of the official website
of [ampproject.org](https://www.ampproject.org/) until we reach a progress
that makes a merge over to the original repository beneficial.

## Requirements

1.  Install the LTS version of [NodeJS](https://nodejs.org). An easy way to do so is with `nvm`. (Mac and Linux: [here](https://github.com/creationix/nvm), Windows: [here](https://github.com/coreybutler/nvm-windows))
    ```sh
    $ nvm install --lts
    ```

1.  Install [Grow](http://grow.io) the static site generator used to build amp.dev:
    ```sh
    $ curl https://install.grow.io | bash
    ```

1.  Install the stable version of [Yarn](https://yarnpkg.com/). (Mac and Linux: [here](https://yarnpkg.com/en/docs/install#alternatives-stable), Windows: [here](https://yarnpkg.com/lang/en/docs/install/#windows-stable))
    ```sh
    $ curl -o- -L https://yarnpkg.com/install.sh | bash
    ```

1.  Install the dependencies for the project:
    ```sh
    $ cd platform
    $ yarn
    ```

## Develop
To start developing start a pipeline that takes care of building the frontend, collecting all needed files and start Grow when finished. The pipeline then watches the sources files for changes and rebuilds them if needed.

```sh
$ cd platform
$ npm run develop
```

If you additionally want to import the needed documents pass in the `--import` option to the command and export a valid [GitHub access token](https://github.com/settings/tokens) beforehand like with

```sh
$ export AMP_DOC_TOKEN="c59f6..."
$ npm run develop -- --import
```

To run a local test build that does all the minifying and vends the static pages instead of
proxying them through to Grow you can run

```sh
$ cd platform
$ npm run build:local
$ npm run start:local
```

## Build & Deploy
To build and deploy to the staging environment on [Google App Engine](https://cloud.google.com/appengine/) run the following

```sh
$ cd platform
$ yarn run build:staging
$ yarn run start:staging
```

- - -

 Copyright 2018 The AMP HTML Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
