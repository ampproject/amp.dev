/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const {series} = require('gulp');
const {sh} = require('@lib/utils/sh.js');
const mri = require('mri');

const PREFIX = 'amp-dev';

// Parse commandline arguments
const argv = mri(process.argv.slice(2));

// We tag docker images by the current git commit SHA,
// this makes it easy to identify and reproduce builds.
// Pass a specific tag via commandline using `gulp updateStart --tag ABCDE...`
const TAG = argv.tag || require('@lib/build/repo.js').version;

// The Google Cloud project id, pass via commandline
// using `gulp deploy --project my-gcloud-project
const PROJECT_ID = argv.project || 'amp-dev-230314';

// Default Google Cloud region
const DEFAULT_REGION = 'us-east1';

// Default Google Cloud zone
const DEFAULT_ZONE = 'us-east1-c';

const config = {
  prefix: PREFIX,
  tag: TAG,
  instance: {
    group: `ig-${PREFIX}`,
    template: `it-${PREFIX}-${TAG}`,
    count: 2,
  },
  gcloud: {
    project: PROJECT_ID,
    region: DEFAULT_REGION,
    zone: DEFAULT_ZONE,
  },
  image: {
    name: `gcr.io/${PROJECT_ID}/${PREFIX}`,
    current: `gcr.io/${PROJECT_ID}/${PREFIX}:${TAG}`,
  },
};

/**
 * Verifies the commit SHA1 (config.tag) hasn't already been deployed
 */
async function verifyTag() {
  const tags = await sh(`gcloud container images list-tags ${config.image.name}`, {quiet: true});
  console.log('Verifying build tag', config.tag);
  if (tags.includes(config.tag)) {
    throw new Error(`The commit ${config.tag} you are trying to build has ` +
              'already been deployed!');
  }
}

/**
 * Initialize the Google Cloud project.
 * Needs to be only run once.
 */
async function gcloudSetup() {
  await sh('gcloud auth configure-docker');
  await sh(`gcloud config set compute/region ${config.gcloud.region}`);
  await sh(`gcloud config set compute/zone ${config.gcloud.zone}`);
}

/**
 * Builds a local docker image for testing.
 */
function imageBuild() {
  return sh(`docker build --tag ${config.image.current} .`);
}

/**
 * Builds and uploads a docker image to Google Cloud Container Registry.
 */
function imageUpload() {
  return sh(`gcloud builds submit --tag ${config.image.current} .`);
}

/**
 * Lists all existing images in the Google Cloud Container Registry.
 */
function imageList() {
  return sh(`gcloud container images list-tags ${config.image.name}`);
}

/**
 * Create a new VM instance template based on the latest docker image.
 */
function instanceTemplateCreate() {
  return sh(`gcloud compute instance-templates create-with-container ${config.instance.template} \
                 --container-image ${config.image.current} \
                 --tags http-server,https-server`);
}

/**
 * Start a rolling update to a new VM instance template. This will ensure
 * that there's always at least 1 active instance running during the update.
 */
function updateStart() {
  return sh(
      `gcloud beta compute instance-groups managed rolling-action \
                 start-update ${config.instance.group} \
                 --version template=${config.instance.template} \
                 --zone=${config.gcloud.zone} \
                 --min-ready 1m \
                 --max-surge 1 \
                 --max-unavailable 1`,
      'Rolling update started, this can take a few minutes...\n\n' +
      'Run `gulp updateStatus` to check the current status. `isStable => true` once ' +
      'when the upate has been finished.'
  );
}

/**
 * Returns the current status of an active rolling update. Use it to check if
 * all VMs have been updated to the latest version and the update is stable.
 */
function updateStatus() {
  return sh(`gcloud beta compute instance-groups managed describe ${config.instance.group} \
           --zone=${config.gcloud.zone}`);
}

/**
 * Stops a rolling update to a new VM instance template. This will only work
 * while there's a rolling update active initiated by updateStart. This will
 * **not** revert already updated instances. Instead, this command should be
 * followed by another call to updateStart to ensure that all instances use
 * the same instance template.
 */
function updateStop() {
  return sh(`gcloud compute instance-groups managed rolling-action \
    stop-proactive-update ${config.instance.group}`);
}

exports.verifyTag = verifyTag;
exports.gcloudSetup = gcloudSetup;
exports.deploy = series(verifyTag, imageUpload, instanceTemplateCreate, updateStart);
exports.imageList = imageList;
exports.imageUpload = imageUpload;
exports.imageBuild = imageBuild;
exports.updateStop = updateStop;
exports.updateStatus = updateStatus;
exports.updateStart = updateStart;
