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
const cookieParser = require('cookie-parser');
const SampleRenderer = require('@examples/lib/SampleRenderer');
const {createRequestContext} = require('@lib/templates/index.js');
const {v4: uuidv4} = require('uuid');
const nunjucks = require('nunjucks');
const path = require('path');

// eslint-disable-next-line new-cap
const examples = express.Router();
examples.use(cookieParser());

const AMP_ANALYTICS_COOKIE = 'userId';
const EVENTS = {};
const USER_CHANGE_LISTENERS = {};
const GLOBAL_ANALYTICS = '__all_users__';
const EXPIRES = 60 * 60 * 24 * 365; // 1 year
const embedFilePath = path.resolve(__dirname, 'embed.html');
const analyticsTemplate = nunjucks.compile(
  `
    <table>
    <tr>
      <th>Event</th>
      <th>Count</th>
    </tr>
    {% for item in data %}
    <tr>
      <td>{{item.key}}</td><td>{{item.value}}</td>
    </tr>
    {% else %}
      No data available.
    {% endfor %}
    </table>`.replace(/\n/g, '')
);

SampleRenderer.use(examples, (request, response, template) => {
  let user = request.cookies[AMP_ANALYTICS_COOKIE];
  if (!user) {
    user = uuidv4();
    response.cookie(AMP_ANALYTICS_COOKIE, user, {
      maxAge: EXPIRES,
      httpOnly: true,
    });
  }
  response.send(template.render(createRequestContext(request, {user})));
});

examples.post('/ping', pingHandler);
examples.get('/embed', embedHandler);
examples.get('/embed/listen', embedListenHandler);

/**
 * Registers an event for the given account.
 *
 * Example: /amp-analytics/ping?acccount=AN_ACCOUNT&event=AN_EVENT
 */
function pingHandler(request, response) {
  const account = request.query.account;
  const event = request.query.event;
  const user = request.query.user;
  if (!trackEvent(account, event, user)) {
    response.sendStatus(400);
    return;
  }
  response.sendStatus(200);
}

function embedHandler(request, response) {
  const account = request.query.account;
  const user = request.query.user;
  const analytics = forUser(account, user);
  const host = request.protocol + '://' + request.get('host');
  response.send(
    nunjucks.render(embedFilePath, {
      host,
      account,
      user,
      data: analytics,
    })
  );
}

function embedListenHandler(request, response) {
  const account = request.query.account;
  const user = request.query.user;
  if (!account || !user) {
    response.sendStatus(400);
  }
  response.writeHead(200, {
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  const onNewAnalyticsData = function (userData) {
    const content = analyticsTemplate.render({data: userData});
    response.write('data: ' + content + '\n\n');
    response.flush();
  };

  const userData = forUser(account, user);
  onNewAnalyticsData(userData);

  addUserListener(user, onNewAnalyticsData);
  request.on('close', () => {
    removeUserListener(user, onNewAnalyticsData);
  });
}

/**
 * Add user analytics change listener.
 */
function addUserListener(userId, callback) {
  let listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    listeners = [];
    USER_CHANGE_LISTENERS[userId] = listeners;
  }
  listeners.push(callback);
}

/**
 * Remove user analytics change listener.
 **/
function removeUserListener(userId, callback) {
  const listeners = USER_CHANGE_LISTENERS[userId];
  if (!listeners) {
    return;
  }
  const index = listeners.indexOf(callback);
  if (index == -1) {
    return;
  }
  listeners.splice(index, 1);
}

/**
 * Returns analytics for the given user and account.
 */
function forUser(account, user) {
  const accountData = EVENTS[account];
  if (!accountData) {
    return '';
  }
  return formatData(accountData[user]);
}

function trackEvent(account, event, user) {
  if (!account || !event) {
    return false;
  }
  trackUserEvent(account, event, GLOBAL_ANALYTICS);
  if (user) {
    trackUserEvent(account, event, user);
  }
  return true;
}

function trackUserEvent(account, event, user) {
  const accountData = get(EVENTS, account);
  const userData = get(accountData, user);
  inc(userData, event);
  notifyListeners(user, userData);
}

function get(obj, prop) {
  let value = obj[prop];
  if (!value) {
    value = {};
    obj[prop] = value;
  }
  return value;
}

function inc(data, event) {
  let eventCount = data[event];
  if (!eventCount) {
    eventCount = 0;
  }
  data[event] = eventCount + 1;
}

function notifyListeners(user, data) {
  const listeners = USER_CHANGE_LISTENERS[user];
  if (!listeners) {
    return;
  }
  const formattedData = formatData(data);
  listeners.forEach((listener) => {
    listener(formattedData);
  });
}

/**
 * Make our analytics data mustache compatible.
 */
function formatData(object) {
  const result = [];
  for (const prop in object) {
    if (object.hasOwnProperty(prop)) {
      result.push({
        key: prop,
        value: object[prop],
      });
    }
  }
  return result;
}

module.exports = examples;
