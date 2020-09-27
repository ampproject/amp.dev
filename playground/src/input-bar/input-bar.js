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

import key from 'keymaster/keymaster.js';

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
      this.autocomplete = this.createAutocomplete(config.autocomplete.options);
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
      this.filterAutocompleteOptionsList.bind(this)
    );
    this.input.addEventListener('focus', () => {
      this.toggleAutocomplete(true);
    });

    if (options.length) {
      this.updateAutocompleteOptions(options);
    }

    key('up', this.onArrowKey.bind(this));
    key('down', this.onArrowKey.bind(this));

    return this.autocomplete;
  }

  /**
   * Overrwrite arrow key events to allow navigation between results using up/down keys
   * @param  {event} e keyDown event with keycode either 38 (up) or 40 (down)
   */
  onArrowKey(e) {
    e.preventDefault();
    const selected = document.activeElement;

    // If the focused element is the input field, then jump in to the list
    // of autocomplete options by selecting the first not filtered item
    if (e.key == 'ArrowDown' && selected == this.input) {
      this.filteredAutocompleteItems[0].focus();
      return;
    }

    // If a autocomplete item is currently selected and its a children of
    // this input then advance in the list
    if (selected.parentElement == this.autocompleteList) {
      if (e.key == 'ArrowUp') {
        if (selected != this.filteredAutocompleteItems[0]) {
          this.filteredAutocompleteItems[
            this.filteredAutocompleteItems.indexOf(selected) - 1
          ].focus();
        } else {
          // If the focused element is the first child in the list then go back
          // into the input
          this.input.focus();
        }

        return;
      }

      if (
        e.key == 'ArrowDown' &&
        selected !=
          this.filteredAutocompleteItems[
            this.filteredAutocompleteItems.length - 1
          ]
      ) {
        this.filteredAutocompleteItems[
          this.filteredAutocompleteItems.indexOf(selected) + 1
        ].focus();
        return;
      }
    }
  }

  /**
   * Allow updating the list of autocomplete options later on
   * @param {Array} options list of possible autocomplete results
   */
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
      item.setAttribute('role', 'listitem');
      item.insertAdjacentHTML(
        'beforeend',
        autocompleteItem({
          option,
        })
      );

      item.addEventListener('mouseenter', () => {
        item.focus();
      });

      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.input.value = option.id;
        this.eventBus.publish(EVENT_SELECT_AUTOCOMPLETE);
        this.toggleAutocomplete(true);
      });

      this.autocompleteList.appendChild(item);
    }

    this.filteredAutocompleteItems = Array.from(this.autocompleteList.children);
  }

  toggleAutocomplete(force) {
    this.autocomplete.classList.toggle('active', force);

    if (force) {
      const listener = document.addEventListener('click', (e) => {
        if (!e.target.className.startsWith('input-bar')) {
          this.toggleAutocomplete(false);
          document.removeEventListener('click', listener);
        }
      });
    }
  }

  /**
   * Update autocomplete list based on input value
   */
  filterAutocompleteOptionsList() {
    let showEmpty = false;
    const searchString = this.input.value;
    const filteredItems = [];
    if (searchString.length) {
      for (const item of this.autocompleteList.children) {
        if (item.dataset.id.includes(searchString)) {
          item.hidden = false;
          filteredItems.push(item);
          showEmpty = true;
        } else {
          item.hidden = true;
        }
      }
      this.filteredAutocompleteItems = filteredItems;
      this.autocompleteLabel.hidden = showEmpty;

      return;
    }

    if (!searchString.length) {
      this.filteredAutocompleteItems = Array.from(
        this.autocompleteList.children
      );
      this.filteredAutocompleteItems.map((item) => {
        item.hidden = false;
      });

      return;
    }
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
