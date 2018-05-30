'use strict';

const express = require('express');
const methods = require('methods').concat('all');
const wrap = require('./lib/wrap');

const useWrap = wrap.use;
const methodWrap = wrap.method;

function createApplication() {
  const app = express();
  app._use = app.use;
  app.use = useWrap(app);
  return app;
}

exports = module.exports = createApplication;

Object.assign(exports, express);

const Router = express.Router;

exports.Router = function (options) {
  const router = Router(options);
  router._use = router.use;
  router.use = useWrap(router);
  methods.forEach((method) => {
    const _method = `_${method}`;
    router[_method] = router[method];
    router[method] = methodWrap(router, _method);
  });
  return router;
};
