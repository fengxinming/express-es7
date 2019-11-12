'use strict';

const { flattenDeep } = require('celia');
const capture = require('./capture');

module.exports = function () {
  const callbacks = flattenDeep(arguments);
  return callbacks.map(function (cb) {
    return capture(cb);
  });
};
