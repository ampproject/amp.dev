/**
 * Copyright 2019 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('FileName', () => {
  const FileName = require('./FileName');

  describe('fromString', () => {
    it('returns empty string for undefined', () => {
      expect(FileName.fromString(null)).toEqual('');
    });
    it('appends .html', () => {
      expect(FileName.fromString('file')).toEqual('file.html');
    });
    it('replaces whitespace with _', () => {
      expect(FileName.fromString('A String with whitespace')).toEqual(
        'A_String_with_whitespace.html'
      );
    });
    it('URI encodes other chars', () => {
      expect(FileName.fromString("What's possible with X?")).toEqual(
        'What%27s_possible_with_X%3F.html'
      );
    });
    it('returns empty string when the file is undefined', () => {
      expect(FileName.fromString(undefined)).toEqual('');
    });
    it('Adds path', () => {
      expect(FileName.fromString('hello', 'world')).toEqual('hello/world.html');
    });
  });

  describe('toString', () => {
    it('removes file extension', () => {
      expect(FileName.toString('file.txt')).toEqual('file');
    });
    it('replaces _ with space', () => {
      expect(FileName.toString('A_String_with_whitespace')).toEqual(
        'A String with whitespace'
      );
    });
    it('URI encodes other chars', () => {
      expect(FileName.toString('What%27s_possible_with_X%3F')).toEqual(
        "What's possible with X?"
      );
    });
    it('returns empty string when the file is undefined', () => {
      expect(FileName.toString(undefined)).toEqual('');
    });
  });
});
