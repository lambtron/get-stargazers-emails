
/**
 * Module dependencies.
 */

var request = require('superagent');

/**
 * Thunkified GET.
 */

exports.get = function get(uri) {
  return function(fn) {
    request
      .get(uri)
      .end(fn);
  };
};
