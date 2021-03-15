/**
 * Copyright 2021  The AMP HTML Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PageExperienceGuide = require('@ampproject/toolbox-page-experience');

const pageExperienceGuide = new PageExperienceGuide();

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 *                     More info: https://expressjs.com/en/api.html#req
 * @param {Object} res Cloud Function response context.
 *                     More info: https://expressjs.com/en/api.html#res
 */
exports.checkPageExperience = async (req, res) => {
  const urlString = req.query.url;
  if (!urlString) {
    res.status(400).send('Missing url parameter');
    return;
  }
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    res.status(400).send(`invalid URL "${urlString}"`);
    return;
  }
  if (!url.protocol || !url.protocol.startsWith('http') || !url.host) {
    res.status(400).send(`invalid URL "${urlString}"`);
    return;
  }
  const result = await pageExperienceGuide.analyze(urlString);
  res.json(result);
};
