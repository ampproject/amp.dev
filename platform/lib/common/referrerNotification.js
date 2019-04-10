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

'use strict';

const VALID_REFERRER = new Set(['ampstart.com', 'ampbyexample.com', 'ampproject.org']);

function shouldAddReferrerNotification(request) {
  const referrer = request.query.referrer;
  return referrer && VALID_REFERRER.has(referrer);
}


function addReferrerNotification(referrer, $) {
  if (!$('head').html().includes('amp-user-notification-0.1.js')) {
    $('head').append(
        '<script async custom-element="amp-user-notification" src="https://cdn.ampproject.org/v0/amp-user-notification-0.1.js"></script></head>'
    );
  }
  $('body').append(`
<amp-user-notification layout="nodisplay" id="referrer-notification" style="
    display: flex; 
    justify-content: center; 
    align-items: center; 
    background: #ffe100;     
    padding: 5px;
    text-align: center;
    color: black;
    font-family: Poppins,sans-serif;
    font-weight: 700;
    font-size: .875rem;">
   ${referrer} has moved to amp.dev (<a href="https://blog.amp.dev/2019/04/02/ampproject-org-moves-to-amp-dev/">read the blog post</a>)
   <span on="tap:referrer-notification.dismiss" tabindex="0" role="button" style="
   padding: 5px;
   background: white;
   margin: 4px 8px;
   display: inline-block;
   border-radius: 4px;
   ">OK</span>
</amp-user-notification>
  `);
}

module.exports = {
  shouldAddReferrerNotification,
  addReferrerNotification,
};
