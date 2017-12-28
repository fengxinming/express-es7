'use strict';

const flatten = require('array-flatten');
const createError = require('http-errors');
const { compose } = require('./utils');

function convertError(err) {
  const opts = !err.status ? { status: 500 } : {};
  return createError(err, opts);
}

function ea(...args) {
  const middlewares = flatten(args);
  const unitedMiddleware = compose(middlewares);
  return function(req, res, next) {
    return unitedMiddleware(req, res).then(next).catch(err => next(convertError(err)));
  };
}

module.exports = ea;
