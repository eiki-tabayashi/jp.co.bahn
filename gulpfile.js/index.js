'use strict';
var gulp    = require('gulp');
var Router  = require('gulp.plus-router');
var Loader  = require('gulp.plus-loader');

var router  = new Router();
var streams = new Loader('gulpfile.js/streams', [gulp]);
var tasks   = new Loader('gulpfile.js/tasks',   [streams, gulp]);
var should  = Router.should;

// -----------------------------------------------------------------------------
// [Router] Setup options
// -----------------------------------------------------------------------------

router
  .option('m', {
    alias: 'mode',
    type: 'string',
    default: process.env.NODE_ENV || 'development',
    choice: ['development', 'production'],
  })
  .option('c', {
    alias: 'component',
    type: 'string',
    default: '',
  });

// -----------------------------------------------------------------------------
// [Router] Setup routes
// -----------------------------------------------------------------------------

router
  .route({
    m: 'development',
    c: '',
  }, require('./routes/development.js'))
  /*
  .route({
    m: 'production',
    c: '',
  }, require('./routes/docs/production.js'))
  .route({
    m: 'development',
    c: should.notBeEqualsTo(''),
  }, require('./routes/cmps/development.js'))
  .route({
    m: 'production',
    c: should.notBeEqualsTo(''),
  }, require('./routes/cmps/development.js'))
  */
  ;

// -----------------------------------------------------------------------------
// [Router] Run
// -----------------------------------------------------------------------------

router.run(gulp, tasks);
