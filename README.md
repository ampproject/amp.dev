# amp.dev

[![Build Status](https://travis-ci.org/ampproject/amp.dev.svg?branch=future)](https://travis-ci.org/ampproject/amp.dev)

The official homepage of the AMP Project.

## Contributing

We welcome contributions to amp.dev.

* **Bug reports and feature requests:** something missing or not working on [amp.dev](https://amp.dev)? Please file an issue [here](https://github.com/ampproject/docs/issues/new).
* **Documentation & Guides:** see [this guide](./contributing/documentation.md) for more information on how to contribute documentation to amp.dev.
* **Code samples & demos:** see [this guide](./contributing/samples.md) for more information on how to contribute sample code to amp.dev.

**Note:** fixing spelling mistakes and other small changes are often easiest by directly editing the file on Github.

<img width="669" alt="Inline editing on Github" src="https://user-images.githubusercontent.com/380472/59018008-2d8f5580-8845-11e9-8160-e2890e2c7944.png">

## Setup

### Requirements

**Note:** For those intending to conduct development on this repository beyond fixing typos, Linux and macOS are the only currently supported operating systems. Windows is not supported at this time.

1. Install the LTS version of [Node.js](https://nodejs.org). An easy way to do so is by using [nvm](https://github.com/nvm-sh/nvm).

    ```sh
    $ nvm install --lts
    ```

1. Install [Grow](http://grow.io), the static site generator used to build amp.dev. Do so by using `pip` instead of its installer. Using `pip` will enable importing from the `grow` package in Python later on.

     **Note**: Be sure to use the `pip` command associated with Python 2.7 as Grow depends on Python 2.7.

    ```sh
    $ pip install grow
    ```

     **Note**: If using Linux, refer to the section of pip's official documentation titled [Ensure you can run pip from the command line](https://packaging.python.org/tutorials/installing-packages/#ensure-you-can-run-pip-from-the-command-line) for pip installation troubleshooting.

     **Note**: If using macOS, the simplest steps to install a reliable version of pip are as follow:
      1. Install [Homebrew](https://brew.sh/).
      1. Run `brew doctor` to ensure everything is up to date. Xcode version 10.3 or the most recent stable version is required.
      1. Run `brew install python@2`. Python 2.7 is required.
      1. Pip should now be installed!

1. Install the dependencies for the project:

    ```sh
    $ npm install
    ```

### Develop

If it's your first time working on amp.dev, it is recommended to bootstrap your local environment. To do so, make sure you have set up a valid [GitHub access token](https://github.com/settings/tokens) in an environment variable named `AMP_DOC_TOKEN` like so:

```sh
$ export AMP_DOC_TOKEN="c59f6..."
```

This command enables the import from GitHub to run flawlessly. The actual import occurs by running the following command, which will also build the Playground and Boilerplate Generator once.

```sh
$ gulp bootstrap
```

You can then start developing in your local environment with the command below. The task will take care of building and copying all files, watching them for changes, and rebuilding them when needed. Beware that changes to the [Express](https://expressjs.com/) backend requires the Gulp task to be restarted.

```sh
$ gulp develop
```

This command prints a lot to the shell and will most likely end on `Server ready. Press ctrl-c to quit.`. Seeing this line means everything went fine so far unless otherwise stated in the logs; the site should be available at [http://localhost:8080/](http://localhost:8080/). The service running on port `8081` is only Grow rendering the pages.

### Maintenance

#### Documents
Made changes to a lot of Grow documents at once and not quite sure if all references are still valid? You can run `npm run lint:grow` to pick up broken ones.

#### Samples
Building the samples creates a lot of individual files per sample. In order to still have a quick startup time for development, only changed samples are rebuilt. To freshly build *all* samples you can run `gulp develop --clean-samples`.

### Run a test build
To run a local test build that does all the minifying and vends the static pages instead of
proxying them through to Grow you can run:

```sh
$ gulp build --env local
$ npm run start:local
```

## Build
**Caution**: starting a build will automatically clean all locations of possible remainings from previous builds. Make sure you don't have anything there that you want to keep - additionally check your working copy for eventual unintended local changes.

To perform a build run the following command with `--env` being one of the following valid environments: `development`, `local`, `staging` or `production`:

```sh
$ gulp build --env <environment>
```

This command builds all parts of the project and might take a while. Usually, all builds on [amp-dev-staging.appspot.com](https://amp-dev-staging.appspot.com/) and [amp.dev](https://amp.dev/) are built using [Travis CI](https://travis-ci.org/ampproject/amp.dev). In case you want to reproduce one of those remote builds in your local environment, you can fetch the build artifacts by running:

```sh
$ gulp fetchArtifacts --travis-build <build_number>
```

- - -

 Copyright 2019 The AMP HTML Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
