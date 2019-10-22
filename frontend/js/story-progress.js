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
// Move story to the selected page
const pageId = getUrlParameter('id');
switchToPage(pageId);

function switchToPage(pageId) {
  if (!pageId) {
    return;
  }
  const story = document.querySelector('amp-story');
  story.addEventListener('ampstory:load', () => {
    const event = new CustomEvent('ampstory:switchpage', {
      bubbles: true,
      detail: {
        targetPageId: pageId,
      },
    });
    story.dispatchEvent(event);
  });
}

function getUrlParameter(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return '';
  }
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
