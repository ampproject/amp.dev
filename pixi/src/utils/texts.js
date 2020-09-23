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

/**
 * This method is a workaround for
 * https://github.com/ampproject/amphtml/issues/30273
 *
 * Also all empty span tags (which are created by grow markdown.extensions.codehilite) are removed.
 */
export const cleanCodeForInnerHtml = (html) => {
  if (!html) {
    return '';
  }
  return html.replace(/<span>\s*<\/span>/g, '');
};

/**
 * Add target=_blank to all link tags that do not have a target attribute
 * and do have a href attribute that is not empty and not an anchor
 */
export const addTargetBlankToLinks = (html) => {
  if (!html) {
    return html;
  }
  return html.replace(
    /<a\s(?![^>]*\btarget\s*=)(?=[^>]*\bhref\s*=\s*['"][^#"'])/g,
    '<a target="_blank" '
  );
};
