/**
 * Copyright 2019 The AMPHTML Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const {setNoCache} = require('@lib/utils/cacheHelpers.js');
// eslint-disable-next-line new-cap
const handler = express.Router();


/**
 *  Handle requests to files with hash that where not found and serve the existing file.
 *  This will prevent a 404 error while CDN or cluster nodes have different versions of our app.
 *  See https://github.com/ampproject/docs/issues/2029
 */
handler.get(/\/(critical|main)\..+\.(js|css)/, (request, response, next) => {
  fs.readdir(path.join(__dirname, '../dist'), (err, files) => {
    if (!err) {
      const fileNamePattern = new RegExp(request.params['0'] + '\\..+\\.' + request.params['1']);

      const availableFile = files.find((fileName) => {
        return fileNamePattern.test(fileName);
      });

      if (availableFile) {
        setNoCache(response);
        response.sendFile(path.join(__dirname, '../dist', availableFile));
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

module.exports = handler;
