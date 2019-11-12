'use strict';

const { flattenDeep } = require('celia');
const batch = require('./batch');

const slice = Array.prototype.slice;
const { isArray } = Array;

module.exports = (app, method) => function (fn) {
  let offset = 0;
  let path = '/';

  if (typeof fn !== 'function') {
    let arg = fn;

    while (isArray(arg) && arg.length !== 0) {
      arg = arg[0];
    }

    if (typeof arg !== 'function') {
      offset = 1;
      path = fn;
    }
  }

  const callbacks = flattenDeep(slice.call(arguments, offset));

  if (callbacks.length === 0) {
    throw new TypeError('Router.use() requires a middleware function');
  }

  return app[method](path, batch(callbacks));
};
