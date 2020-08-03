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

import './input-bar.scss';
import template from './input-bar.hbs';

import './autocomplete-item.scss';
import autocompleteItem from './autocomplete-item.hbs';

import {EventBus} from '../events/events.js';

export const EVENT_SELECT_AUTOCOMPLETE = 'event-select-autocomplete';

export default function createInput(target, config) {
  return new Input(target, config);
}

class Input {
  constructor(target, config) {
    target.insertAdjacentHTML('beforeend', template(config));

    this.container = target.querySelector('.input');
    this.input = target.querySelector('input');
    this.submit = target.querySelector('button');
    this.label = target.querySelector('label');

    if (config.autocomplete) {
      this.createAutocomplete(config.autocomplete.options);
    }

    this.eventBus = new EventBus();
  }

  subscribe(channel, observer) {
    this.eventBus.subscribe(channel, observer);
  }

  createAutocomplete(options) {
    this.autocomplete = this.container.querySelector('.input-bar-autocomplete');
    this.autocomplete
      .querySelector('.input-bar-autocomplete-header-close')
      .addEventListener('click', () => {
        this.toggleAutocomplete(false);
      });
    this.autocompleteList = this.autocomplete.querySelector(
      '.input-bar-autocomplete-list'
    );
    this.autocompleteLabel = this.autocomplete.querySelector('aside');

    this.input.addEventListener(
      'keyup',
      this.filterAutocompleteOptions.bind(this)
    );
    this.input.addEventListener('focus', () => {
      this.toggleAutocomplete(true);
    });

    if (options.length) {
      this.updateAutocompleteOptions(options);
    }

    document.addEventListener('keydown', (e) => {
      if (e.keyCode == 38 || e.keyCode == 40) {
        this.selectAutocompleteItem(e);
      }
    });
  }

  selectAutocompleteItem(e) {
    const selected = document.activeElement;
    if (selected.className == 'autocomplete-item') {
      if (e.keyCode == 38 && selected != this.autocompleteList.firstChild) {
        selected.previousElementSibling.focus();
      } else if (e.keyCode == 40 && selected != this.autocompleteList.lastChild) {
        selected.nextElementSibling.focus();
      }
    } else {
      this.autocompleteList.querySelector('.autocomplete-item').focus();
    }
  }

  updateAutocompleteOptions(options) {
    this.autocompleteOptions = options;
    this.renderAutocompleteList(options);
  }

  renderAutocompleteList(options) {
    this.autocompleteList.innerHTML = '';

    for (const option of options) {
      const item = document.createElement('button');
      item.className = 'autocomplete-item';
      item.dataset.id = option.id;
      item.insertAdjacentHTML(
        'beforeend',
        autocompleteItem({
          option,
        })
      );

      item.addEventListener('mouseover', () => {
        item.focus();
      });
      item.addEventListener('mouseleave', () => {
        item.focus();
      });

      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.input.value = option.id;
        this.eventBus.publish(EVENT_SELECT_AUTOCOMPLETE);
        this.toggleAutocomplete();
      });

      this.autocompleteList.appendChild(item);
    }
  }

  toggleAutocomplete(force) {
    this.autocomplete.classList.toggle('active', force);
  }

  filterAutocompleteOptions() {
    let showEmpty = false;
    const searchString = this.input.value;
    if (searchString.length) {
      for (const item of this.autocompleteList.children) {
        if (item.dataset.id.includes(searchString)) {
          item.hidden = false;
          showEmpty = true;
        } else {
          item.hidden = true;
        }
      }
    }

    this.autocompleteLabel.hidden = showEmpty;
  }

  showError(error) {
    this.label.classList.add('show');
    this.label.innerText = error;
    this.input.focus();
  }

  hideError() {
    this.label.classList.remove('show');
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
  }

  set hidden(hide) {
    this.container.classList.toggle('hidden', hide);
  }
}
