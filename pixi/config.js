/**
 * Copyright 2020 The AMPHTML Authors
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
const config = {
  development: {
    API_ENDPOINT_LINTER: 'http://localhost:8080/page-experience/api/lint',
    API_ENDPOINT_LINTER_CANARY:
      'http://localhost:8080/page-experience/api/lint-canary',
    API_ENDPOINT_TOOLBOX_PAGE_EXPERIENCE:
      'https://us-central1-amp-dev-230314.cloudfunctions.net/checkPageExperience',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'http://localhost:8080/page-experience/mock-api/page-experience',
    API_ENDPOINT_MOBILE_FRIENDLINESS:
      'http://localhost:8080/page-experience/mock-api/mobile-friendliness',
  },
  production: {
    API_ENDPOINT_LINTER: 'https://amp.dev/page-experience/api/lint',
    API_ENDPOINT_LINTER_CANARY:
      'https://amp.dev/page-experience/api/lint-canary',
    API_ENDPOINT_TOOLBOX_PAGE_EXPERIENCE:
      'https://us-central1-amp-dev-230314.cloudfunctions.net/checkPageExperience',
    API_ENDPOINT_PAGE_SPEED_INSIGHTS:
      'https://www.googleapis.com/pagespeedonline/v5/runPagespeed',
    API_ENDPOINT_MOBILE_FRIENDLINESS:
      'https://searchconsole.googleapis.com/v1/urlTestingTools/mobileFriendlyTest:run',
  },
  createKeyMapping: (mode) => {
    return {
      IS_DEVELOPMENT: mode !== 'production',
      API_ENDPOINT_LINTER: JSON.stringify(config[mode].API_ENDPOINT_LINTER),
      API_ENDPOINT_LINTER_CANARY: JSON.stringify(
        config[mode].API_ENDPOINT_LINTER_CANARY
      ),
      API_ENDPOINT_PAGE_SPEED_INSIGHTS: JSON.stringify(
        config[mode].API_ENDPOINT_PAGE_SPEED_INSIGHTS
      ),
      API_ENDPOINT_MOBILE_FRIENDLINESS: JSON.stringify(
        config[mode].API_ENDPOINT_MOBILE_FRIENDLINESS
      ),
      AMP_DEV_PIXI_APIS_KEY: JSON.stringify(process.env.AMP_DEV_PIXI_APIS_KEY),
    };
  },
};

module.exports = config;
