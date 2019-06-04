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

set -e

if [ "${TRAVIS_BRANCH}" = "production" ]; then
  echo "Authenticating for production environment ..."
  openssl aes-256-cbc -K $encrypted_b44033ffb787_key -iv $encrypted_b44033ffb787_iv -in .prod.key.json.enc -out .prod.key.json -d
  gcloud auth activate-service-account --key-file=.prod.key.json

  echo "Setting APP_ENV to 'production'"
  export APP_ENV="production"
elif [ "${TRAVIS_BRANCH}" = "future" ] && [ $TRAVIS_PULL_REQUEST == "false" ]; then
  echo "Authenticating for staging environment ..."
  openssl aes-256-cbc -K $encrypted_d4a09416a845_key -iv $encrypted_d4a09416a845_iv -in .staging.key.json.enc -out .staging.key.json -d
  gcloud auth activate-service-account --key-file=.staging.key.json

  echo "Setting APP_ENV to 'staging'"
  export APP_ENV="staging"
else
  echo "Skipping Google Cloud authentication ..."
fi
