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

import './experiments.scss';
import template from './experiments.hbs';

import events from '../events/events.js';
import * as Button from '../button/button.js';
import FlyIn from '../fly-in/fly-in.js';
import * as ExperimentItem from './experiment-list-item.js';
import createInput from '../input-bar/input-bar.js';

const EXPERIMENTS_CONFIG_SOURCE_PATH =
  'https://raw.githubusercontent.com/ampproject/amphtml/master/tools/experiments/experiments-config.js';
const EXPERIMENTS_ID_PATTERN = /(?:id: ')(.*?)(?:')/gm;

export const EVENT_TOGGLE_EXPERIMENT = 'event-toggle-experiment';

export function createExperimentsView() {
  const target = document.getElementById('experiments-view');
  const trigger = document.getElementById('preview-header-experiments');
  if (!target) return;

  return new Experiments(target, trigger);
}

class Experiments extends FlyIn {
  constructor(target, trigger) {
    super(target);

    this.target = target;
    this.trigger = Button.from(trigger, this.toggle.bind(this));
    this.content.insertAdjacentHTML('beforeend', template());
    this.experimentList = this.content.querySelector('#experiments-list');
    this.availableExperiments = Promise.resolve([]);
    this.activeExperiments = [];

    // Load input bar template
    this.inputBar = createInput(
      document.getElementById('input-bar-experiments'),
      {
        helpText: `Enter a valid experiment id to enable a certain experiment for the playground's preview. Read more about <a href="https://amp.dev/documentation/guides-and-tutorials/learn/experimental/" target="_blank" rel="noopener">experiments</a> on amp.dev.`,
        label: 'Add',
        type: 'url',
        name: 'text',
        placeholder: 'Experiment ID',
      }
    );

    this.inputBar.input.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        this.onSubmitExperiment();
      }
    });
    this.inputBar.submit.addEventListener('click', () => {
      this.onSubmitExperiment();
    });

    this.addActiveExperiments();

    events.subscribe(ExperimentItem.EVENT_REMOVE_EXPERIMENT, (experiment) => {
      this.removeExperiment(experiment);
    });
  }

  async init() {
    if (this.availableExperiments.length) {
      return;
    } else {
      this.availableExperiments = await this.fetchExperiments();
    }
  }

  addActiveExperiments() {
    const experiments = localStorage.getItem('amp-experiment-toggles');
    if (experiments) {
      for (const experiment of experiments.split(',')) {
        if (!experiment.startsWith('-')) {
          this.addExperiment(experiment);
        }
      }
    }
  }

  onSubmitExperiment() {
    this.inputBar.toggleLoading();
    this.init().then(() => {
      const inputValue = this.inputBar.value;
      if (!inputValue || !this.availableExperiments.includes(inputValue)) {
        this.inputBar.showError('Not a valid AMP Experiment');
      } else if (!this.activeExperiments.includes(inputValue)) {
        this.addExperiment(inputValue);
        this.inputBar.hideError();
        this.inputBar.input.value = '';
      }
      this.inputBar.toggleLoading(false);
    });
  }

  /**
   * Fetch list of experimental amp components
   * @return {[Array]} list of active experiment components
   */
  fetchExperiments() {
    return fetch(EXPERIMENTS_CONFIG_SOURCE_PATH, {
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed fetching experiments');
        }
        return response.text();
      })
      .then((body) => {
        const experimentIds = body.match(EXPERIMENTS_ID_PATTERN).map((id) => {
          return id.substring(5, id.length - 1);
        });
        return experimentIds;
      })
      .catch((err) => {
        console.error(err);
        return [];
      });
  }

  /**
   * Add item to list and enable AMP experiment
   * @param {String} experiment name of valid experiment
   */
  addExperiment(experiment) {
    ExperimentItem.createExperimentListItem(this.experimentList, experiment);
    this.activeExperiments.push(experiment);
    events.publish(EVENT_TOGGLE_EXPERIMENT, experiment, true);
  }

  removeExperiment(experiment) {
    this.activeExperiments.splice(
      this.activeExperiments.indexOf(experiment),
      1
    );
    this.inputBar.hideError();
    events.publish(EVENT_TOGGLE_EXPERIMENT, experiment, false);
  }
}
