// Copyright 2019 The AMPHTML Authors
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import events from '../events/events.js';
import * as quotedPrintable from 'quoted-printable';
import * as FileUpload from '../file-upload/file-upload.js';

export const EVENT_FILE_UPLOADED_SUCCESS = 'event-file-uploaded-success';
export const EVENT_FILE_UPLOADED_ERROR = 'event-file-uploaded-error';

export function createEmailLoader(editor) {
  return new EmailLoader(editor);
}

class EmailLoader {
  constructor(editor) {
    this.editor = editor;

    events.subscribe(FileUpload.EVENT_FILE_UPLOADED, (file) => {
      this.loadEmailContent(file);
    });
  }

  async loadEmailContent(file) {
    const data = await file.text();
    this.loadEmail(data);
  }

  loadEmail(emailCode) {
    emailCode = emailCode.replace(/\r\n/g, '\n');
    const [head, body] = twoSplit(emailCode, '\n\n');
    if (!body) {
      this.onError('No body found in email');
    }

    const {parts, contentType} = this.parseMultipart(head, body);
    if (contentType !== 'multipart/alternative') {
      this.onError('Email is not multipart/alternative');
    }

    const ampPart = parts.find((part) =>
      part.contentType.startsWith('text/x-amp-html')
    );
    if (!ampPart) {
      this.onError('No AMP part found in multipart/alternative');
    }
    events.publish(EVENT_FILE_UPLOADED_SUCCESS);
    this.editor.setSource(ampPart.body);
  }

  parseMultipart(head, body) {
    const headers = this.parseHeaders(head);
    const {contentType, boundary} = this.parseMultipartContentType(
      headers.get('content-type')
    );
    const parts = this.parseMultipartBody(body, boundary);
    return {
      contentType,
      parts,
    };
  }

  parseHeaders(head) {
    const lines = head.split('\n');
    let current = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.match(/^\s/)) {
        current = i;
        continue;
      }
      lines[current] += ' ' + line.trim();
      lines[i] = null;
    }

    return new Map(
      lines
        .filter((line) => line)
        .map((line) => {
          const [key, value] = twoSplit(line, ':');
          return [key.toLowerCase(), value.trim()];
        })
    );
  }

  parseMultipartBody(body, boundary) {
    const rawParts = body.split('--' + boundary);
    if (
      rawParts[0].trim() !== '' ||
      rawParts[rawParts.length - 1].trim() !== '--'
    ) {
      this.onError('Invalid multipart body');
    }
    const parts = rawParts.slice(1, -1);

    return parts.map((part) => {
      let [head, body] = twoSplit(part, '\n\n');
      if (!body) {
        this.onError('No body found in email part');
      }
      const headers = this.parseHeaders(head);
      const encoding = headers.get('content-transfer-encoding');
      switch (encoding) {
        case 'base64':
          body = atob(body.replace(/\s/g, ''));
          break;
        case 'quoted-printable':
          body = quotedPrintable.decode(body.replace('=E2=9A=A1', '⚡'));
          break;
      }
      return {
        contentType: headers.get('content-type') || '',
        body,
      };
    });
  }

  parseMultipartContentType(contentTypeHeader) {
    const parts = (contentTypeHeader || '').split(/\s*;\s*/);
    const contentType = parts[0].trim();
    if (!contentType.startsWith('multipart/')) {
      this.onError('Invalid content type: not multipart');
    }
    const params = Object.create(null);
    for (let i = 1; i < parts.length; i++) {
      let [key, value] = twoSplit(parts[i], /\s*=\s*/);
      if (!key || !value) {
        continue;
      }
      key = key.toLowerCase();
      if (value.startsWith('"')) {
        value = JSON.parse(value);
      }
      params[key] = value;
    }
    if (!params.boundary) {
      this.onError('Invalid content type: no valid boundary in multipart');
    }
    return {
      contentType,
      boundary: params.boundary,
    };
  }

  onError(message) {
    events.publish(EVENT_FILE_UPLOADED_ERROR, `Error: ${message}`);
    throw new Error(message);
  }
}

// like String.prototype.split, but returns only two parts
function twoSplit(str, separator) {
  const pos =
    separator instanceof RegExp
      ? str.search(separator)
      : str.indexOf(separator);
  if (pos === -1) {
    return [str];
  }
  return [str.substring(0, pos), str.substring(pos).replace(separator, '')];
}
