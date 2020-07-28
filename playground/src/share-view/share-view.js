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

import './share-view.scss';
import template from './share-view.hbs';

import {Base64} from 'js-base64';
import FlyIn from '../fly-in/fly-in.js';
import * as Button from '../button/button.js';

export function createShareView(editor) {
  const target = document.getElementById('share-view');
  const trigger = document.getElementById('share-toggle');
  if (!target) return;

  return new ShareView(target, trigger, editor);
}


class ShareView extends FlyIn {
  constructor(target, trigger, editor) {
    super(target);

    this.target = target;
    this.editor = editor;
    this.content.insertAdjacentHTML('beforeend', template());
    Button.from(trigger, this.showShare.bind(this));

    this.textarea = this.content.querySelector('#share-url');
    this.textarea.setAttribute('readonly', '');
    Button.from(this.content.querySelector('#copy-button'), this.onClick.bind(this));
  }

  showShare() {
    this.shareUrl = this.createShareUrl();
    this.textarea.innerHTML = this.shareUrl;
    this.toggle();
  }

  /**
   * Create a hash from the current editor source and generate sharable URL
   * @return {String} URL string
   */
  createShareUrl() {
    const source = this.editor.getSource();
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.delete('url');
    shareUrl.hash = 'share=' + Base64.encode(source);

    return shareUrl.toString();
  }

  onClick() {
    this.textarea.select();
    document.execCommand('copy');
  }
}
