// Copyright 2018 The AMPHTML Authors
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

require('./fly-in.scss');

class FlyIn {
  constructor(target) {
    const content = document.createElement('div')
    content.className = 'fly-in-container';
    this.content = content;

    this.createFlyIn(target);
    this.registerButtons(target);
  }

  createFlyIn(target) {
    const title = target.getAttribute('data-title');
    target.innerHTML = `
      <div class="fly-in-header">
        <h2>${title}</h2>
        <div class="fly-in-close" tabindex="0" role="button">
          <svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </div>
      </div>
    `;

    target.appendChild(this.content);

    return target;
  }

  upadateContent(content) {
    this.content.innerHTML = '';
    this.content.appendChild(content);
  }

  registerButtons(target) {
    const button = target.querySelector('.fly-in-close');
    button.addEventListener('click', () => {
      this.hideFlyIn(target);
    });
  }

  toggle() {
    this.target.classList.toggle('active');
  }

  hideFlyIn() {
    this.target.classList.remove('active');
  }

  showFlyIn() {
    this.target.classList.add('active');
  }
}

export default FlyIn;
