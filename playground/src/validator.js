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

import './modes/validator.critical.scss';

import DocumentController from './document/controller.js';

import * as ErrorList from './error-list/error-list.js';
import * as ImportURL from './import-url/import-url.js';
import * as ValidationResult from './validation-result/validation-result.js';
import * as Validator from './validator/validator.js';
import * as Editor from './editor/editor.js';
import * as Button from './button/button.js';
import * as Menu from './menu/base.js';

import createSelector from './selector/selector.js';
import events from './events/events.js';
import titleUpdater from './title-updater/base.js';
import {runtimes, EVENT_SET_RUNTIME} from './runtime/runtimes.js';
import detectRuntime from './runtime/detector.js';
import addSplitPaneBehavior from './split-pane/base.js';
import formatter from './formatter/';

import './analytics';
import './service-worker/base.js';

// create editing/panels
const editor = Editor.createEditor(document.getElementById('source'), window);
addSplitPaneBehavior(document.querySelector('main'));

ImportURL.createURLImport();
ErrorList.createErrorList();
ValidationResult.createValidationResult();

// runtime select
// const runtimeChanged = (runtimeId) => {
//   const newRuntime = runtimes.get(runtimeId);
//   if (!newRuntime) {
//     console.error('unknown runtime: ' + newRuntime);
//     return;
//   }
//   events.publish(EVENT_SET_RUNTIME, newRuntime);
// };

// const runtimeSelector = createSelector(
//   document.getElementById('runtime-select'),
//   {
//     classes: ['caret-right'],
//     id: 'runtime',
//     label: 'select runtime',
//     values: runtimes.values.map((r) => {
//       return {
//         id: r.id,
//         label: r.name,
//         selected: r === runtimes.activeRuntime,
//       };
//     }),
//     onChange: runtimeChanged,
//   }
// );
// runtimeSelector.show();
//
// let activeRuntime;
// events.subscribe(EVENT_SET_RUNTIME, (newRuntime) => {
//   runtimeSelector.selectOption(newRuntime.id);
//   // change editor input to new runtime default if current input is unchanged
//   if (
//     activeRuntime &&
//     activeRuntime != newRuntime &&
//     activeRuntime.template === editor.getSource()
//   ) {
//     editor.setSource(newRuntime.template);
//   }
//   validator.validate(editor.getSource());
//   activeRuntime = newRuntime;
// });

runtimes.init();

// configure editor
const editorUpdateListener = () => {
  const source = editor.getSource();

  if (preview) {
    preview.refresh(source);
  }

  validator.validate(source);
  titleUpdater.update(source);
};
events.subscribe([Editor.EVENT_INPUT_CHANGE], editorUpdateListener);
events.subscribe(Validator.EVENT_NEW_VALIDATION_RESULT, (validationResult) => {
  editor.setValidationResult(validationResult);
});
events.subscribe([Editor.EVENT_INPUT_NEW], () => {
  const source = editor.getSource();
  const runtime = detectRuntime(source);
  runtimeChanged(runtime.id);
  editorUpdateListener();
});

// setup document
const documentController = new DocumentController(
  editor,
  runtimes.activeRuntime,
  document.querySelector('header'),
  window
);
documentController.show();

// configure menu
const menu = Menu.create();
Button.from(document.getElementById('show-menu'), () => {
  menu.show();
});

const formatSource = () => {
  formatter
    .format(editor.getSource())
    .then((formattedCode) => editor.setSource(formattedCode));
};
Button.from(document.getElementById('format-source'), formatSource);
Button.from(document.getElementById('menu-format-source'), formatSource);
