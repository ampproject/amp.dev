// Copyright 2020 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import './fly-in-background.scss';
import events from '../events/events.js';
import modes from '../modes/index.js';

export const EVENT_FLY_IN_CLOSE = 'event-fly-in-close';

export function createFlyInBackground() {
  if (modes.IS_DEFAULT) {
    return new FlyInBackground();
  }
}

class FlyInBackground {
  constructor() {
    document
      .getElementById('fly-in-background')
      .addEventListener('click', () => {
        events.publish(EVENT_FLY_IN_CLOSE);
      });

    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        events.publish(EVENT_FLY_IN_CLOSE);
      }
    });
  }
}

createFlyInBackground();
