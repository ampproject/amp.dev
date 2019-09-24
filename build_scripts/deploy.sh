#!/bin/bash
#
# Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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
# This script downloads the ampproject/docs build output from a well known GCE
# storage instance and does a firebase deploy.

set -e

GREEN() { echo -e "\033[1;32m$1\033[0m"; }
CYAN() { echo -e "\033[1;36m$1\033[0m"; }

echo $(GREEN "Deploying build output for TRAVIS_BRANCH") $(CYAN "${TRAVIS_BRANCH}")

# Create build dir
if [ "${TRAVIS_BRANCH}" = "legacy-production" ];
  then firebase use production;
elif [ "${TRAVIS_BRANCH}" = "legacy-master" ];
  then firebase use staging;
fi
mkdir build

# Install tools
echo $(GREEN "Installing") $(CYAN "urllib3") $(GREEN "and") $(CYAN "gsutil") $(GREEN "...")
echo -e 'travis_fold:start:install\n'
pip install urllib3[secure] --user
pip install gsutil --user
echo -e 'travis_fold:end:install\n'

# Check that build output exists
echo $(GREEN "Listing build output from parallel jobs...")
echo -e 'travis_fold:start:list_remote_build\n'
if [ "${TRAVIS_BRANCH}" = "legacy-production" ]; then
  gsutil ls gs://ampproject-b5f4c.appspot.com/;
elif [ "${TRAVIS_BRANCH}" = "legacy-master" ]; then
  gsutil ls gs://ampproject-staging.appspot.com/;
fi
echo -e 'travis_fold:end:list_remote_build\n'

# Download build output
echo $(GREEN "Downloading build output from parallel jobs...")
echo -e 'travis_fold:start:download_build\n'
if [ "${TRAVIS_BRANCH}" = "legacy-production" ]; then
  gsutil -m rsync -r gs://ampproject-b5f4c.appspot.com/ ./ ;
elif [ "${TRAVIS_BRANCH}" = "legacy-master" ]; then
  gsutil -m rsync -r gs://ampproject-staging.appspot.com/ ./ ;
fi
echo -e 'travis_fold:end:download_build\n'

# Extract build output
echo $(GREEN "Unzipping build output from parallel jobs...")
echo -e 'travis_fold:start:unzip_build\n'
if [ "${TRAVIS_BRANCH}" = "legacy-production" ]; then
  unzip -o "build_*.zip";
elif [ "${TRAVIS_BRANCH}" = "legacy-master" ]; then
  unzip -o "build_*.zip";
fi
echo -e 'travis_fold:end:unzip_build\n'

# Check that build output was extracted
echo $(GREEN "Listing contents of") $(CYAN "build/") $(GREEN "...")
ls -la build/

# Deploy build
echo $(GREEN "Deploying to firebase...")
firebase deploy --token "${FIREBASE_TOKEN}" --non-interactive

echo $(GREEN "Done deploying build output for TRAVIS_BRANCH") $(CYAN "${TRAVIS_BRANCH}")
