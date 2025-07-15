# amp.dev

![Staging](https://github.com//ampproject/amp.dev/workflows/Release%3A%20Staging/badge.svg)
![Production](https://github.com//ampproject/amp.dev/workflows/Release%3A%20Production/badge.svg)

The official homepage of the AMP Project.

## Contributing

We welcome contributions to amp.dev.

- **Bug reports and feature requests:** something missing or not working on [amp.dev](https://amp.dev)? Please file an issue [here](https://github.com/ampproject/docs/issues/new).
- **Documentation & Guides:** see [this guide](./contributing/documentation.md) for more information on how to contribute documentation to amp.dev.
- **Code samples & demos:** see [this guide](./contributing/samples.md) for more information on how to contribute sample code to amp.dev.

**Note:** fixing spelling mistakes and other small changes are often easiest by directly editing the file on Github.

<img width="669" alt="Inline editing on Github" src="https://user-images.githubusercontent.com/380472/59018008-2d8f5580-8845-11e9-8160-e2890e2c7944.png">

## Setup

**Note:** Setting up amp.dev requires a working Python 3 environment on your machine which might not be easy to get going. You can skip this by using the [Docker-based setup](#setup-with-docker).

### Requirements

**Note:** For those intending to conduct development on this repository beyond fixing typos, Linux and macOS are the only currently supported operating systems. Windows is not supported at this time.

1. Install the LTS version of [Node.js](https://nodejs.org). An easy way to do so is by using [nvm](https://github.com/nvm-sh/nvm).

   ```sh
   $ nvm install --lts
   ```

1. If it has not already been done, install Python 3 and ensure pip is properly set up by adding the _pip user base binary directory_ to `$PATH`.

   **macOS**

   1. Install [Homebrew](https://brew.sh/).
   1. Run the following command to ensure everything is up to date. Xcode version 10.3 or the most recent stable version is required.
      ```sh
      $ brew doctor
      ```
   1. Run the following command to install Python. Version 3.7 is required at latest.
      ```sh
      $ brew install python libyaml
      ```
   1. Run the following command to add the _pip user base binary directory_ to `$PATH`.
      ```sh
      $ echo "export PATH=\"$(python -m site --user-base)/bin\":\$PATH" >> ~/.bash_profile
      ```
   1. Run the following command for the changes to take effect.
      ```sh
      $ source ~/.bash_profile
      ```

   **Linux** (Debian-based)

   **Note**: If using Linux, refer to the section of pip's official documentation titled [Ensure you can run pip from the command line](https://packaging.python.org/tutorials/installing-packages/#ensure-you-can-run-pip-from-the-command-line) for pip installation troubleshooting.

   1. Run the following command to add the _pip user base binary directory_ to `$PATH`.
      ```sh
      $ echo "export PATH=\"$(python -m site --user-base)/bin\":\$PATH" >> ~/.bashrc
      ```
   1. Run the following command for the changes to take effect.
      ```sh
      $ source ~/.bashrc
      ```
   1. Run the following command to use a faster YAML parser.
      ```sh
      $ sudo apt install -y python-yaml libyaml-dev
      ```

1. Install [Grow](http://grow.io), the static site generator used to build amp.dev. Do so by using `pip` instead of its installer. Using `pip` will enable importing from the `grow` package in Python later on.

**Note**: Be sure to use the `pip` command associated with Python 3 as Grow 1 depends on Python 3.

**Mac**

```sh
  LDFLAGS="-L$(brew --prefix)/lib" CFLAGS="-I$(brew --prefix)/include" pip3 install --global-option="--with-libyaml" --force pyyaml
  pip3 install --user grow
```

**Linux**

```sh
 $ pip3 install --global-option="--with-libyaml" --force pyyaml
 $ pip3 install --user grow
```

### Fork & clone the repository

To get started with contributing to amp.dev, you first need to [fork the repository](https://help.github.com/en/articles/fork-a-repo). Once you've done that you can clone the repository:

```sh
$ git clone https://github.com/YOUR-USERNAME/amp.dev
```

... and then install the dependencies via NPM:

```sh
$ cd amp.dev
$ npm install
```

## Develop

If it's your first time working on amp.dev, it is recommended to bootstrap your local environment. To do so, make sure you have set up a valid [GitHub access token](https://github.com/settings/tokens) in an environment variable named `AMP_DOC_TOKEN` like so:

```sh
$ export AMP_DOC_TOKEN="c59f6..."
```

This command enables the import from GitHub to run flawlessly. The actual import occurs by running the following command, which will also build the Playground and Boilerplate Generator once.

```sh
$ npm run bootstrap
```

**Tip**: Due to bad network conditions or GitHub's API rate-limiting there might be errors during import. Try running the above command with the `-- --queue-imports` flag to prevent them.

You can then start developing in your local environment with the command below. The task will take care of building and copying all files, watching them for changes, and rebuilding them when needed. Beware that changes to the [Express](https://expressjs.com/) backend require the Gulp task to be restarted.

```sh
$ npm run develop
```

This command prints a lot to the shell and will most likely end on `Server ready. Press ctrl-c to quit.`. Seeing this line means everything went fine so far unless otherwise stated in the logs; the site should be available at [http://localhost:8080/](http://localhost:8080/). The service running on port `8081` is only Grow rendering the pages.

You can contribute your changes back to the main repository by [creating a pull request](https://help.github.com/en/articles/about-pull-requests).

## Setup with Docker

We provide a Dockerfile for development based on one of the official Python-images. When using this you can skip setting up Python and a local installation of Grow on your machine. Though make sure you completed all other installation steps, like cloning the repository, installing all Node.js dependencies and exporting a valid GitHub token as outlined in [Fork & clone the repository](#fork--clone-the-repository) and [Develop](#develop). When those steps are completed instead of running the project with `npm run develop` you can build a Docker image with the followiung command, run from within the Docker container:


```sh
$ npx gulp developImageBuild
```

After the image has been successfully built start a container with the following command:

```sh
$ npx gulp developContainer
```

This command also mounts the pages directory, meaning all changes you are doing to any of the markdown files in `pages/content` are reflected to the container and can be reviewed without rebuilding the image.

## Maintenance

### Documents

Made changes to a lot of Grow documents at once and not quite sure if all references are still valid? You can run `npm run lint:grow` to pick up broken ones.

### Run a test build

To run a local test build that does all the minifying and vends the static pages instead of
proxying them through to Grow you can run:

```sh
$ npm run build:local
$ npm run start:local
```

**Tip**: For more rapid local testing, it may be preferable to only build a subset of specified locales. Run the following command with `--locales` being a comma seperated list of locale abbreviations you want to build, e.g. `en,fr` or even just `en`.

```sh
npm run build:local -- --locales <list of locales>
```

## Build

**Caution**: starting a build will automatically clean all locations of possible remainings from previous builds. Make sure you don't have anything there that you want to keep - additionally check your working copy for eventual unintended local changes.

```sh
npm run build:local -- --locales <list of locales>
```

To perform a build run the following command with `--env` being one of the following valid environments: `development`, `local`, `staging` or `production`:

```sh
$ npx gulp build --env <environment>
```

## Deployment

The amp.dev site uses GitHub Actions for automated deployments to both staging and production environments.

### Deployment Environments

- **Staging**: [staging-amp-dev.netlify.app](https://staging-amp-dev.netlify.app/)
- **Production**: [amp.dev](https://amp.dev/)

### How to Deploy

Deployments are triggered through GitHub Actions workflows:

1. **Staging Deployment**: 
   - Triggered automatically on pushes to the `main` branch
   - Automatically builds and deploys to the staging environment
   - View workflow status with the "Staging" badge at the top of this README

2. **Production Deployment**:
   - **Manual deployment only** - no automatic triggers
   - Must be manually triggered through GitHub Actions
   - View workflow status with the "Production" badge at the top of this README

### Manual Deployment

To manually trigger a deployment (required for production):

1. Navigate to the [deploy workflow](https://github.com/ampproject/amp.dev/actions/workflows/deploy.yaml) in the GitHub actions tab.
2. Click "Run workflow" and choose the branch you want to deploy
3. Confirm the deployment

**Note**: Ensure your changes have been properly tested in the staging environment before deploying to production.

---

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
