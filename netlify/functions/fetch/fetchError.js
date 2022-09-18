/**
 * Copyright 2020 The AMPHTML Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

class FetchError extends Error {
  constructor(errorId, message) {
    super(message);
    this.errorId = errorId;
  }
}

FetchError.INVALID_URL = 'INVALID_URL';
FetchError.TOO_MANY_REQUESTS = 'TOO_MANY_REQUESTS';
FetchError.NO_SUCCESS_RESPONSE = 'NO_SUCCESS_RESPONSE';
FetchError.UNSUPPORTED_CONTENT_TYPE = 'UNSUPPORTED_CONTENT_TYPE';
FetchError.OTHER = 'OTHER';

module.exports = FetchError;
