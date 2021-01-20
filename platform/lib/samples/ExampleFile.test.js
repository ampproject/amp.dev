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

describe('ExampleFile', () => {
  const ExampleFile = require('./ExampleFile');

  describe('created from path', () => {
    const file = ExampleFile.fromPath(
      "src/10_Hello-world's/What's_up_100%25?.html"
    );
    it('extracts title', () => {
      expect(file.title()).toBe("What's up 100%?");
    });
    it('use parent directory name as title if filename is index', () => {
      expect(
        ExampleFile.fromPath('src/Samples_%26_Templates/index.html').title()
      ).toBe('Samples & Templates');
    });
    it('extracts file name', () => {
      expect(file.fileName()).toBe("What's_up_100%25?.html");
    });
    it('extracts category', () => {
      expect(file.category().name).toBe("Hello-world's");
    });
  });

  describe('non-example files', () => {
    const file = ExampleFile.fromPath('src/offline.html');
    it('has no category', () => {
      expect(file.category()).toBe('');
    });
  });

  describe('nextFile', () => {
    const TEST_DIR = __dirname + '/FileNameTestFiles/';
    it('returns next file in alphabetical order', () => {
      expect(
        ExampleFile.fromPath(TEST_DIR + 'a.html').nextFile().filePath
      ).toEqual(TEST_DIR + 'b.html');
    });
    it('returns undefined when the file is the last one in alphabetical order', () => {
      expect(ExampleFile.fromPath(TEST_DIR + 'b.html').nextFile()).toEqual(
        null
      );
    });
    it('returns undefined when the file does not exist', () => {
      expect(
        ExampleFile.fromPath(TEST_DIR + 'notExistentFile.html').nextFile()
      ).toEqual(null);
    });
    it('returns undefined when the file has no category', () => {
      expect(
        ExampleFile.fromPath('src/amp-form-error.html').nextFile()
      ).toEqual(null);
    });
  });

  describe('section', () => {
    it('returns parent dir if section', () => {
      expect(
        ExampleFile.fromPath('src/amp-ads/10_introduction/hello.html').section()
          .path
      ).toEqual('/amp-ads');
    });
    it('returns root path if no section', () => {
      expect(
        ExampleFile.fromPath('src/10_introduction/hello.html').section().path
      ).toEqual('/');
    });
    it('returns root path if no category', () => {
      expect(ExampleFile.fromPath('src/hello.html').section().path).toEqual(
        '/'
      );
    });
  });
});
