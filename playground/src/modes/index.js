// Copyright 2019 The AMPHTML Authors
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

class Modes {
  constructor(doc) {
    this.IS_EMBED = !!doc.body.classList.contains('embed');
    this.IS_VALIDATOR = !!doc.body.classList.contains('validator');
    this.IS_DEFAULT = !this.IS_EMBED && !this.IS_VALIDATOR;
  }
}

export default new Modes(document);
