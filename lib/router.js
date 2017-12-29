'use strict';

const express = require('express');
const convertAsync = require('./convert');
let methods = require('methods');

methods = methods.concat('all');

class Router {

  constructor(opts) {
    const router = this._router = express.Router(opts);
    methods.forEach(method => {
      this[method] = function(path, ...args) {
        if (!path || typeof path === 'function') {
          throw new Error('path error');
        }
        router[method](path, convertAsync(args));
        return this;
      };
    }, this);
  }

  use(...args) {
    const path = args[0];
    if (typeof path !== 'function') {
      this._router.use(path, convertAsync(args.slice(1)));
    } else {
      this._router.use(convertAsync(args));
    }
    return this;
  }

  callback() {
    return this._router;
  }

}

module.exports = function(opts) {
  return new Router(opts);
};
