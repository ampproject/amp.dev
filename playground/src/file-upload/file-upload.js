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

import './file-upload.scss';
import template from './file-upload.hbs';

import events from '../events/events.js';
import Dropzone from 'dropzone';
import * as EmailLoader from '../email-loader/email-loader.js';

export const EVENT_FILE_UPLOADED = 'event-file-uploaded';

const ALLOWED_FILE_SUFFIX = '.eml';

export default function createFileUpload(target) {
  return new FileUpload(target);
}

class FileUpload {
  constructor(target) {
    target.insertAdjacentHTML('beforeend', template());
    this.container = target.querySelector('.file-upload');
    this.label = target.querySelector('label');
    this.dropzone = new Dropzone(target.querySelector('#dz-target'), {
      maxFiles: 1,
      parallelUploads: 1,
      acceptedFiles: '.eml',
      autoProcessQueue: false,
      url: '#',
    });
    this.dropzone.on('addedfile', this.onAddedFile.bind(this));
    this.dropzone.on('maxfilesexceeded', this.onMaxFilesExceeded.bind(this));

    events.subscribe(
      EmailLoader.EVENT_FILE_UPLOADED_ERROR,
      this.showError.bind(this)
    );
  }

  onAddedFile(file) {
    this.hideError();
    if (this.file) {
      this.removeFile(this.file);
    }
    this.file = file;

    if (this.file.name.endsWith(ALLOWED_FILE_SUFFIX)) {
      events.publish(EVENT_FILE_UPLOADED, file);
    } else {
      this.showError('Error: File is not in EML format');
      this.removeFile(this.file);
    }
  }

  removeFile(file) {
    this.dropzone.removeFile(file);
  }

  onMaxFilesExceeded(file) {
    this.removeFile(file);
  }

  showError(error) {
    this.label.classList.add('show');
    this.label.innerText = error;
  }

  hideError() {
    this.label.classList.remove('show');
  }

  set hidden(hide) {
    this.container.classList.toggle('hidden', hide);
  }
}
