/**
 * Copyright 2018 The AMP HTML Authors. All Rights Reserved.
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
const {execSync} = require('child_process');
const {sh} = require('./sh');

const trim = async (promise) => {
  const str = await promise;
  return (str || '').trim();
};

module.exports.versionSync = () =>
  execSync('git log -1 --pretty=format:%h ').toString().trim();

module.exports.messageSync = () =>
  execSync('git log -1 --pretty=%B --no-merges').toString().trim();

module.exports.userSync = () =>
  execSync('git config user.name').toString().trim();

module.exports.committerDate = (path) =>
  trim(sh(`git log --format=%ai ${path} | tail -1`, {quiet: true}));

module.exports.version = () =>
  trim(sh('git log -1 --pretty=format:%h', {quiet: true}));

module.exports.message = () =>
  trim(sh('git log -1 --pretty=%B --no-merges', {quiet: true}));

module.exports.user = async () =>
  trim(sh('git config user.name', {quiet: true}));
