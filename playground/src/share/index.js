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

require('./share-dialog.scss');

import {Base64} from 'js-base64';
import createDialog from '../dialog/base.js';
import * as Button from '../button/button.js';

const MAX_URL_DISPLAY_LENGTH = 256;

export default function createShareAction(editor) {
  return new ShareDialog(document, editor, createDialog());
}

class ShareDialog {
  constructor(doc, editor, dialog) {
    this.doc = doc;
    this.editor = editor;
    this.dialog = dialog;
  }

  open() {
    const source = this.editor.getSource();
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.delete('url');
    shareUrl.hash = 'share=' + Base64.encode(source);
    const shareUrlString = shareUrl.toString();
    const root = document.createElement('div');
    root.id = 'share-dialog';
    const a = document.createElement('a');
    a.setAttribute('href', shareUrl.toString());

    if (shareUrlString.length > MAX_URL_DISPLAY_LENGTH) {
      a.textContent =
        shareUrlString.substring(0, MAX_URL_DISPLAY_LENGTH) + '...';
    } else {
      a.textContent = shareUrlString;
    }
    root.appendChild(a);

    const input = document.createElement('input');
    root.appendChild(input);
    input.hidden = true;

    Button.create(root, {
      text: 'Copy to clipboard',
      onClick: () => {
        input.hidden = false;
        input.value = shareUrl;
        input.select();
        input.focus();
        document.execCommand('copy');
        input.hidden = true;
        input.value = '';
        this.dialog.close();
      },
    });
    this.dialog.open(root);
  }
}
