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
# This script builds ampproject/docs for the list of locales provided via
# a list of command line arguments, and zips and uploads the build output to
# a well known GCE storage instance.

set -e

GREEN() { echo -e "\033[1;32m$1\033[0m"; }
CYAN() { echo -e "\033[1;36m$1\033[0m"; }

echo $(GREEN "Performing a parallel build for TRAVIS_BRANCH") $(CYAN "${TRAVIS_BRANCH}")

# Process command line arguments
cmd="grow build --re-route "
locales=""
build_file="build"
for locale in "$@"
do
  cmd="${cmd} --locale ${locale}"
  locales="${locales} ${locale}"
  build_file="${build_file}_${locale}"
done
build_file="${build_file}.zip"

# Perform build
echo $(GREEN "Building locales: ") $(CYAN "${locales}")
echo -e 'travis_fold:start:build\n'
echo "Running \"${cmd}\"..."
${cmd}
echo -e 'travis_fold:end:build\n'

# Compress build output
echo $(GREEN "Zipping") $(CYAN "build") $(GREEN "directory...")
echo -e 'travis_fold:start:zip_build\n'
zip -r ${build_file} build/
echo -e 'travis_fold:end:zip_build\n'

# Install gcloud tools
echo $(GREEN "Installing") $(CYAN "gsutil") $(GREEN "...")
echo 'travis_fold:start:install_gsutil\n\n'
pip install gsutil --user # can't do this before grow has run, as the oath2client is incompatible
echo -e 'travis_fold:end:install_gsutil\n'

# Upload build output
echo $(GREEN "Uploading build output...")
if [ "${TRAVIS_BRANCH}" = "legacy-production" ]; then
  gsutil -m cp -r ${build_file} gs://ampproject-b5f4c.appspot.com;
elif [ "${TRAVIS_BRANCH}" = "legacy-master" ]; then
  gsutil -m cp -r ${build_file} gs://ampproject-staging.appspot.com;
fi

echo $(GREEN "Done building and uploading output for locales") $(CYAN "${locales}")
