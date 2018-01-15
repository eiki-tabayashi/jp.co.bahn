'use strict';
var Params = require('gulp.plus-parameter');

module.exports = function(streams) {
  return function(params) {
    return function() {
      params = new Params(params);
      params.ace('httpd.options', {
        host: '0.0.0.0',
        port: 8080,
        livereload: true
      });
      return streams
        .src(
          params.get('src.globs'),
          params.get('src.options')
        )
        .pipe(streams.httpd(
          params.get('httpd.options')
        ));
    };
  };
};
