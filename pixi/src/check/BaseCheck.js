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

const URL_VALIDATION_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;

export default class BaseCheck {
  constructor() {
    this.input = document.getElementById('input-field');
    this.submit = document.getElementById('input-submit');
    this.submit.addEventListener('click', this.onSubmitUrl.bind(this));
  }

  runCheck() {
    return;
  }

  fetchApi(apiEndpoint) {
    try {
      this.toggleLoading(false);

      fetch(apiEndpoint)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed running check');
          }
          return response.json();
        })
        .then(this.onSuccess.bind(this))
        .catch(this.onError.bind(this));
    } catch (error) {
      this.onError(error);
    }
  }

  onSubmitUrl() {
    const value = this.input.value;
    const url =
      value.startsWith('http://') || value.startsWith('https://')
        ? value
        : `http://${value}`;
    if (url.match(URL_VALIDATION_REGEX)) {
      this.runCheck();
    } else {
      this.onError('Error: Please enter a valid URL');
    }
  }

  toggleLoading(force) {
    this.submit.classList.toggle('loading', force);
  }

  onSuccess() {
    return;
  }

  onError(error) {
    console.log(error);
  }
}
