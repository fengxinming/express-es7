'use strict';

const { flattenDeep } = require('kick-array');
const { compose } = require('./utils');

const slice = Array.prototype.slice;

module.exports = (app, method) => function (fn) {
  let offset = 0;
  let path = '/';

  if (typeof fn !== 'function') {
    let arg = fn;

    while (Array.isArray(arg) && arg.length !== 0) {
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

  return app[method](path, compose(callbacks));
};
