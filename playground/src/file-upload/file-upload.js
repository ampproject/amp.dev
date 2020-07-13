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

export const EVENT_FILE_UPLOADED = 'event-file-uploaded';

export default function createFileUpload(container, config) {
  return new FileUpload(container, config);
}

class FileUpload {
  constructor(container, config) {
    container.insertAdjacentHTML('beforeend', template(config));

    this.dropzoneTarget = container.querySelector('#file-upload');
    this.dropzone = new Dropzone(this.dropzoneTarget, {
      maxFiles: 1,
      parallelUploads: 1,
      autoProcessQueue: false,
      url: '#',
    });
    this.dropzone.on('addedfile', this._onAddedFile.bind(this));
    this.dropzone.on('maxfilesexceeded', this._onMaxFilesExceeded.bind(this));
  }

  _onAddedFile(file) {
    events.publish(EVENT_FILE_UPLOADED, file);
  }

  _removeFile(file) {
    this.dropzone.removeFile(file);
  }

  _onMaxFilesExceeded(file) {
    this._removeFile(file);
  }
}
