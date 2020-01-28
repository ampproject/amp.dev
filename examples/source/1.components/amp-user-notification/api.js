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
'use strict';

const express = require('express');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(express.json());
const DISMISSED_NOTIFICATIONS = {};

/**
 * AMP will make a CORS GET request to this URL to determine whether
 * the notification should be shown. The AMP runtime will append the elementId and
 * ampUserId query string fields to the href provided on the data-show-if-href
 * attribute.
 */
examples.get('/show', (req, res) => {
  const userId = req.query.ampUserId;
  const notificationId = req.query.elementId;
  const showNotification = shouldShowNotification(notificationId, userId);
  res.json({
    'showNotification': showNotification,
  });
});

/**
 * AMP will make a CORS POST request to this URL transmitting the elementId
 * and ampUserId only when the user dismisses the notification.
 */
examples.post('/dismiss', (req, res) => {
  const userId = req.body.ampUserId;
  const notificationId = req.body.elementId;
  dismissNotification(notificationId, userId);
  res.json({});
});

/**
 * Returns true if the notification should be shown for the user
 * and notificationId
 */
function shouldShowNotification(notificationId, userId) {
  const user = DISMISSED_NOTIFICATIONS[userId];
  if (!user) {
    return true;
  }
  return !user[notificationId];
}

/**
 * Dismisses further notifications for the user and notificationId
 */
function dismissNotification(notificationId, userId) {
  let user = DISMISSED_NOTIFICATIONS[userId];
  if (!user) {
    user = {};
    DISMISSED_NOTIFICATIONS[userId] = user;
  }
  user[notificationId] = true;
}

module.exports = examples;
