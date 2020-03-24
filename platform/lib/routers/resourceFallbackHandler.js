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

const {Signale} = require('signale');

const log = new Signale({
  'interactive': false,
  'scope': 'Resource Fallback Handler',
});

/**
 *  Create a router to handle requests to files with hash that where not found.
 *  It will serve the existing file with a different hash.
 *
 *  This will prevent a 404 error while CDN or cluster nodes have different versions of our app.
 *  See https://github.com/ampproject/docs/issues/2029
 */
function createHandler(rootDir) {
  // eslint-disable-next-line new-cap
  const handler = express.Router();

  /**
   *  We assume that the hash in the URL is at least 15 characters long (webpack default is 20)
   *  and has only digits and lowercase characters.
   */
  handler.get(
    /^(.*\/)([^/]+\.)[a-z0-9]{15,}(\.[^/]+)$/,
    (request, response, next) => {
      const requestPath = request.params['0'];
      const fileNamePrefix = request.params['1']; // including the dot at the end
      const fileNamePostfix = request.params['2']; // starting with a dot

      try {
        const folder = path.join(rootDir, requestPath);
        const availableFile = findFile(folder, fileNamePrefix, fileNamePostfix);

        if (availableFile) {
          setNoCache(response);
          log.info(
            'Serve resource with different hash:',
            request.path,
            availableFile
          );
          response.sendFile(path.join(folder, availableFile));
        } else {
          log.debug('No fallback resource for path:', request.path);
          next();
        }
      } catch (error) {
        log.warn(
          'Error when trying to find fallback resource',
          request.path,
          error
        );
        next();
      }
    }
  );

  return handler;
}

function findFile(folder, namePrefix, namePostfix) {
  if (!fs.existsSync(folder)) {
    return undefined;
  }
  const files = fs.readdirSync(folder);

  return files.find((fileName) => {
    return fileName.startsWith(namePrefix) && fileName.endsWith(namePostfix);
  });
}

module.exports = createHandler;
