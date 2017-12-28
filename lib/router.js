'use strict';

const express = require('express');
const convertAsync = require('./index');
let methods = require('methods');

methods = methods.concat('all');

module.exports = function(opts) {
  const router = express.Router(opts);
  const newRouter = {};
  methods.forEach((method) => {
    newRouter[method] = function(path, ...args) {
      if (!path || typeof path === 'function') {
        throw new Error('path error');
      }
      router[method].apply(router, convertAsync(args));
      return this;
    };
    newRouter.use = (...args) => {
      const path = args[0];
      if (typeof path !== 'function') {
        router.use(path, convertAsync(args.slice(1)));
      } else {
        router.use(convertAsync(args));
      }
      return this;
    };
    newRouter.router = router;
  });
};
