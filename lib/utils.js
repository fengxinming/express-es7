'use strict';

const { isAsyncFunction } = require('celia');
const { flattenDeep } = require('kick-array');

const callbackify = exports.callbackify = function (fn) {
  return isAsyncFunction(fn) ?
    fn.length === 4 ?
      function (err, req, res, next) {
        fn(err, req, res, next)
          .catch(err => next(err));
      } : function (req, res, next) {
        fn(req, res, next)
          .catch(err => next(err));
      } :
    fn;
};

exports.compose = function () {
  const callbacks = flattenDeep(arguments);
  return callbacks.map(cb => callbackify(cb));
};
