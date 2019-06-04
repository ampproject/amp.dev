#!/bin/bash
#
# Copyright 2019 The AMP HTML Authors. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS-IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the license.
#
# Note: this script is not meant to build the project locally. Use the respective
# NPM scripts or gulp tasks instead

set -e

# The production deployment relies on gcloud utils beta components
if [ "${TRAVIS_BRANCH}" = "production" ]; then
  echo "Installing gcloud beta components ..."

  rm -rf $HOME/google-cloud-sdk
  export CLOUDSDK_CORE_DISABLE_PROMPTS=1
  curl https://sdk.cloud.google.com | bash > /dev/null
  source /home/travis/google-cloud-sdk/path.bash.inc
  gcloud version --quiet
  gcloud components update --quiet
  gcloud components install beta --quiet
  gcloud auth activate-service-account --key-file=.prod.key.json
  gcloud config set project amp-dev-230314
fi

echo "Finalizing build ..."
unbuffer gulp buildFinalize

echo "Starting deployment ..."
if [ "${TRAVIS_BRANCH}" = "production" ]; then
  unbuffer gulp deploy
elif [ "${TRAVIS_BRANCH}" = "future" ] && [ $TRAVIS_PULL_REQUEST == "false" ]; then
  echo "Preparing build ..."
  gcloud app deploy --project=amp-dev-staging --quiet
fi
