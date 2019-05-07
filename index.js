'use strict';

const express = require('express');
const methods = require('methods').concat('all');
const use = require('./lib/use');
const utils = require('./lib/utils');

function createApplication() {
  const app = express();
  app.__$use = app.use;
  app.use = use(app, '__$use');
  return app;
}

module.exports = createApplication;

Object.assign(createApplication, express);

const { Router } = express;

createApplication.Router = function (options) {
  const router = Router(options);
  router.__$use = router.use;
  router.use = use(router, '__$use');
  methods.forEach((method) => {
    const fn = '__$' + method;
    router[fn] = router[method];
    router[method] = use(router, fn);
  });
  return router;
};

createApplication.utils = utils;
