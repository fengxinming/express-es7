'use strict';

const flatten = require('array-flatten');
const {
  isAsyncFunction
} = require('celia/lib/type');

const convert = exports.convert = (asyncFunction) => {
  return isAsyncFunction(asyncFunction) ? asyncFunction.length === 4 ?
    function (err, req, res, next) {
      asyncFunction(err, req, res, next).catch(err => next(err));
    } : function (req, res, next) {
      asyncFunction(req, res, next).catch(err => next(err));
    } : asyncFunction;
};

exports.compose = (...args) => {
  const fns = flatten(args);
  return fns.map(n => convert(n));
};
