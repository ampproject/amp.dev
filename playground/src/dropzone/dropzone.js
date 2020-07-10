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

import './dropzone.scss';
import template from './dropzone.hbs';

import dropzone from 'dropzone';

export default function createDropzone(container, config) {
  return new Dropzone(container, config);
}

class Dropzone {
  constructor(container, config) {
    container.insertAdjacentHTML('beforeend', template(config));

    this.label = container.querySelector('label');
  }

  showError(error) {
    this.label.classList.add('show');
    this.label.innerText = error;
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
}
