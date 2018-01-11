'use strict';
var gulp = require('gulp');
var util = require('gulp-util');

function first(done) {
  util.log('First task done !');
  done();
}

function second(done) {
  util.log('Second task done !');
  done();
}

function third(done) {
  util.log('Third task done !');
  done();
}

function parallel(done) {
  util.log('Parallel task done !');
  done();
}

function series(done) {
  util.log('Series task done !');
  done();
}

gulp.task('first', first);
gulp.task('second', second);
gulp.task('third', third);
gulp.task('default', gulp.series(
  'third',
  gulp.parallel('first',);
  
  'second',
  'parallel'
));
