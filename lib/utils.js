'use strict';

exports.compose = middleware => {
  return function(req, res) {
    let index = -1;
    return dispatch(0);

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;
      let fn = middleware[i];

      if (i === middleware.length) {
        fn = undefined;
      }
      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(fn(req, res, err => {
          if (err) {
            return Promise.reject(err);
          } else {
            return dispatch(i + 1);
          }
        }));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
};
