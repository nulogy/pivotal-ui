/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
var copy = function copy(document, text) {
  var textarea = document.createElement('textarea');
  textarea.className = 'sr-only';
  textarea.value = text;
  document.body.appendChild(textarea);

  try {
    textarea.select();
    document.execCommand('copy');
  } catch (e) {} finally {
    document.body.removeChild(textarea);
  }
};

exports.default = { copy: copy };
module.exports = exports['default'];