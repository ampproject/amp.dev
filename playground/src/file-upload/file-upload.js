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

import {EventBus} from '../events/events.js';
import Dropzone from 'dropzone';

export const EVENT_FILE_UPLOADED = 'event-file-uploaded';

export default function createFileUpload(target, config) {
  return new FileUpload(target, config);
}

/**
 * FileUpload creates a dropzone that takes a file type and an action URL
 * used to load a files markup into the playground
 */
class FileUpload {
  constructor(target, config) {
    target.insertAdjacentHTML('beforeend', template());
    this.container = target.querySelector('.file-upload');
    this.acceptedFileType = config.acceptedFiles;
    this.label = target.querySelector('label');
    this.dropzone = new Dropzone(target.querySelector('#dz-target'), {
      maxFiles: 1,
      parallelUploads: 1,
      acceptedFiles: config.acceptedFileType,
      autoProcessQueue: false,
      url: config.url,
    });
    this.dropzone.on('addedfile', this.onAddedFile.bind(this));
    this.dropzone.on('maxfilesexceeded', this.onMaxFilesExceeded.bind(this));

    this.eventBus = new EventBus();
  }

  subscribe(channel, observer) {
    this.eventBus.subscribe(channel, observer);
  }

  onAddedFile(file) {
    this.hideError();
    if (this.file) {
      this.removeFile(this.file);
    }
    this.file = file;
    if (this.file.type == this.acceptedFileType) {
      this.eventBus.publish(EVENT_FILE_UPLOADED, file);
    } else {
      this.showError('Error: File format is not supported');
    }
    this.removeFile(this.file);
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
