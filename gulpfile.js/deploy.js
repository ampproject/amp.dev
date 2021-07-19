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
const {join} = require('path');
const {sh} = require('@lib/utils/sh.js');
const mri = require('mri');
const {existsSync} = require('fs');
const {ROOT, THUMBOR_ROOT, PIXI_CLOUD_ROOT} =
  require('@lib/utils/project').paths;

const PREFIX = 'amp-dev';
const PACKAGER_PREFIX = PREFIX + '-packager';
const THUMBOR_PREFIX = PREFIX + '-thumbor';

// Parse commandline arguments
const argv = mri(process.argv.slice(2));

const TIMESTAMP = Date.now();

// We tag docker images by the current git commit SHA + TIMESTAMP,
// this makes it easy to identify and reproduce builds.
// Pass a specific tag via commandline using `gulp updateStart --tag ABCDE...`
const TAG = argv.tag || `${require('@lib/utils/git').version()}-${TIMESTAMP}`;

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
    groups: [
      {
        name: `ig-${PREFIX}-europe`,
        zone: 'europe-west2-c',
      },
      {
        name: `ig-${PREFIX}-zone2`,
        zone: 'us-east1-b',
      },
      {
        name: `ig-${PREFIX}-asia`,
        zone: 'asia-northeast1-b',
      },
      {
        name: `ig-${PREFIX}-us-west`,
        zone: 'us-west3-a',
      },
    ],
    template: `it-${PREFIX}-${TAG}`,
    count: 2,
    diskSize: '20GB',
    machine: 'n1-standard-2',
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
  packager: {
    opts: {
      workingDir: join(ROOT, 'packager'),
    },
    prefix: PACKAGER_PREFIX,
    tag: TAG,
    instance: {
      groups: [
        {
          name: `ig-${PACKAGER_PREFIX}`,
          zone: 'us-east1-b',
        },
      ],
      template: `it-${PACKAGER_PREFIX}-${TAG}`,
      count: 1,
      machine: 'n1-standard-1',
    },
    image: {
      name: `gcr.io/${PROJECT_ID}/${PACKAGER_PREFIX}`,
      current: `gcr.io/${PROJECT_ID}/${PACKAGER_PREFIX}:${TAG}`,
    },
  },
  thumbor: {
    opts: {
      workingDir: THUMBOR_ROOT,
    },
    prefix: THUMBOR_PREFIX,
    tag: TAG,
    instance: {
      groups: [
        {
          name: `ig-${THUMBOR_PREFIX}`,
          zone: 'us-east1-b',
        },
      ],
      template: `it-${THUMBOR_PREFIX}-${TAG}`,
      count: 1,
      machine: 'n1-standard-1',
    },
    image: {
      name: `gcr.io/${PROJECT_ID}/${THUMBOR_PREFIX}`,
      current: `gcr.io/${PROJECT_ID}/${THUMBOR_PREFIX}:${TAG}`,
    },
  },
};

/**
 * Verifies the commit SHA1 (config.tag) hasn't already been deployed
 */
async function verifyTag() {
  const tags = await sh(
    `gcloud container images list-tags ${config.image.name}`,
    {quiet: true}
  );
  console.log('Verifying build tag', config.tag);
  if (tags.includes(config.tag)) {
    throw new Error(
      `The commit ${config.tag} you are trying to build has ` +
        'already been deployed!'
    );
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
 * Starts a local docker image for testing.
 */
function imageRunLocal() {
  return sh(`docker run -d -p 8082:80 ${config.image.current}`);
}

/**
 * Builds and uploads a docker image to Google Cloud Container Registry.
 */
function imageUpload() {
  return sh(
    `gcloud builds submit --tag ${config.image.current} --timeout=50m .`
  );
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
                 --machine-type ${config.instance.machine} \
                 --boot-disk-size ${config.instance.diskSize} \
                 --tags http-server,https-server \
                 --scopes default,datastore`);
}

/**
 * Removes stale instances templates
 */
async function instanceTemplatesClean() {
  // The amount of templates that should be kept sorted by currentness
  const TEMPLATES_KEPT_COUNT = 3;

  let templates = JSON.parse(
    await sh('gcloud compute instance-templates list --format json', {
      quiet: true,
    })
  );

  // Sort templates by creation date to keep templates to rollback to
  templates = templates.sort((template1, template2) => {
    return (
      new Date(template1.creationTimestamp) -
      new Date(template2.creationTimestamp)
    );
  });

  // Filter out packager & thumbor instance templates as they are built manually
  templates = templates.filter((template) => {
    return (
      !template.name.includes(PACKAGER_PREFIX) &&
      !template.name.includes(THUMBOR_PREFIX)
    );
  });

  // Remove templates from list that need to be kept
  templates = templates.slice(0, templates.length - TEMPLATES_KEPT_COUNT);

  const templateNames = templates
    .map((template) => {
      return template.name;
    })
    .join(' ');

  return sh(`gcloud compute instance-templates delete ${templateNames}`);
}

/**
 * Start a rolling update to a new VM instance template. This will ensure
 * that there's always at least 1 active instance running during the update.
 */
async function updateStart() {
  const updates = config.instance.groups.map((group) => {
    return sh(`gcloud beta compute instance-groups managed rolling-action \
                 start-update ${group.name} \
                 --version template=${config.instance.template} \
                 --zone=${group.zone} \
                 --min-ready 4m \
                 --max-surge 1 \
                 --max-unavailable 1`);
  });
  await Promise.all(updates);

  console.log(
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
  const updates = config.instance.groups.map((group) => {
    return sh(`gcloud beta compute instance-groups managed describe ${group.name} \
             --zone=${group.zone}`);
  });

  return Promise.all(updates);
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

/**
 * Create a new VM instance template based on the latest docker image.
 */
function packagerInstanceTemplateCreate() {
  return sh(
    `gcloud compute instance-templates create-with-container \
                                   ${config.packager.instance.template} \
                 --container-image ${config.packager.image.current} \
                 --machine-type ${config.packager.instance.machine}`,
    config.packager.opts
  );
}

/**
 * Builds and uploads the packager docker image to Google Cloud Container Registry.
 */
function packagerImageUpload() {
  if (
    !existsSync('./packager/certs/cert.pem') ||
    !existsSync('./packager/certs/privkey.pem')
  ) {
    throw new Error(
      'You need to include cert.pem AND privkey.pem inside of packager/certs ' +
        'in order submit a new release'
    );
  }
  return sh(
    `gcloud builds submit --tag ${config.packager.image.current} .`,
    config.packager.opts
  );
}

/**
 * Start a rolling update to a new packager VM instance template. This will ensure
 * that there's always at least 1 active instance running during the update.
 */
async function packagerUpdateStart() {
  const updates = config.packager.instance.groups.map((group) => {
    return sh(
      `gcloud beta compute instance-groups managed rolling-action \
                 start-update ${group.name} \
                 --version template=${config.packager.instance.template} \
                 --zone=${group.zone} \
                 --min-ready 1m \
                 --max-surge 1 \
                 --max-unavailable 1`,
      config.packager.opts
    );
  });
  await Promise.all(updates);

  console.log('Rolling update started, this can take a few minutes...');
}

/**
 * Fetch and print the updated packagerId
 */
async function packagerFetchId() {
  const instanceInfo = await sh(`gcloud compute instances list`, {quiet: true});

  const instanceHash = instanceInfo.match(/^.*-packager-([^ ]+)/m);

  if (instanceHash) {
    return console.log(`update the packager host field in production.json to\
      "ig-amp-dev-packager-${instanceHash[1]}.c.amp-dev-230314.internal"
      `);
  }

  return;
}

/* Thumbor */
/**
 * Create a new VM instance template based on the latest docker image.
 */
function thumborInstanceTemplateCreate() {
  return sh(
    `gcloud compute instance-templates create-with-container \
                                   ${config.thumbor.instance.template} \
                 --container-image ${config.thumbor.image.current} \
                 --machine-type ${config.thumbor.instance.machine}`,
    config.thumbor.opts
  );
}

/**
 * Builds and uploads the thumbor docker image to Google Cloud Container Registry.
 */
function thumborImageUpload() {
  return sh(
    `gcloud builds submit --tag ${config.thumbor.image.current} .`,
    config.thumbor.opts
  );
}

/**
 * Start a rolling update to a new thumbor VM instance template. This will ensure
 * that there's always at least 1 active instance running during the update.
 */
async function thumborUpdateStart() {
  const updates = config.thumbor.instance.groups.map((group) => {
    return sh(
      `gcloud beta compute instance-groups managed rolling-action \
                 start-update ${group.name} \
                 --version template=${config.thumbor.instance.template} \
                 --zone=${group.zone} \
                 --min-ready 1m \
                 --max-surge 1 \
                 --max-unavailable 1`,
      config.thumbor.opts
    );
  });
  await Promise.all(updates);

  console.log('Rolling update started, this can take a few minutes...');
}

/**
 * Deploy the pixi puppeteer cloud cuntion
 */
async function pixiDeploy() {
  return sh(
    `gcloud functions deploy checkPageExperience \
              --runtime nodejs10 \
              --trigger-http \
              --allow-unauthenticated \
              --project ${PROJECT_ID}`,
    {
      workingDir: PIXI_CLOUD_ROOT,
    }
  );
}

exports.verifyTag = verifyTag;
exports.gcloudSetup = gcloudSetup;
exports.deploy = series(
  verifyTag,
  imageUpload,
  //  instanceTemplatesClean,
  instanceTemplateCreate,
  updateStart
);
exports.imageBuild = imageBuild;
exports.imageList = imageList;
exports.imageRunLocal = imageRunLocal;
exports.imageUpload = imageUpload;
exports.instanceTemplateCreate = instanceTemplateCreate;
exports.instanceTemplatesClean = instanceTemplatesClean;
exports.packagerDeploy = series(
  packagerImageUpload,
  packagerInstanceTemplateCreate,
  packagerUpdateStart,
  packagerFetchId
);
exports.packagerImageUpload = packagerImageUpload;
exports.packagerInstanceTemplateCreate = packagerInstanceTemplateCreate;
exports.packagerUpdateStart = packagerUpdateStart;

exports.thumborImageUpload = thumborImageUpload;
exports.thumborInstanceTemplateCreate = thumborInstanceTemplateCreate;
exports.thumborUpdateStart = thumborUpdateStart;
exports.thumborDeploy = series(
  thumborImageUpload,
  thumborInstanceTemplateCreate,
  thumborUpdateStart
);
exports.pixiDeploy = pixiDeploy;

exports.updateStop = updateStop;
exports.updateStatus = updateStatus;
exports.updateStart = updateStart;
