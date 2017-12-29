'use strict';

const flatten = require('array-flatten');
const convert = require('./lib/convert');
const Router = require('./lib/router');

const EA = module.exports = function (...fns) {
  if (!(this instanceof EA)) {
    return convert(...fns);
  } else {
    this.middleware = [];
  }
};

EA.Router = Router;

const proto = EA.prototype;

proto.use = function (...args) {
  const fn = args[0];
  if (typeof fn !== 'function') {
    throw new TypeError('middleware must be a function!');
  }
  const middleware = flatten(args);
  this.middleware.push(...middleware);
};

proto.callback = function () {
  return convert(this.middleware);
};
