'use strict';

module.exports = function() {
  return {
    get: function() {
      return require('vinyl-buffer');
    },
  };
};