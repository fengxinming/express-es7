'use strict';

const flatten = require('array-flatten');
const {
  isAsyncFunction
} = require('celia/lib/type');

function errCallback(err) {
  return err ? Promise.reject(err) : Promise.resolve();
}

const convert = exports.convert = (afn) => {
  return isAsyncFunction(afn) ? afn.length === 4 ?
    function (err, req, res, next) {
      afn(err, req, res, errCallback).then(next).catch(next);
    } : function (req, res, next) {
      afn(req, res, errCallback).then(next).catch(next);
    } : afn;
};

exports.compose = (...args) => {
  const fns = flatten(args);
  return fns.map(n => convert(n));
};
