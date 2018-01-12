'use strict';
var Parameter = require('gulp.plus-parameter');

module.exports = function(gulp, task) {
  var args = new Parameter;
  var path = new Parameter({
     inc:  'inc',
     src:  'src',
    dest: 'test',
    root: 'test',
  });

  // ---------------------------------------------------------------------------
  // HTML
  // ---------------------------------------------------------------------------
  /** documents:build **/
  args.set('src.globs', path.data.src + '/*.pug')
      .set('dest.folder', path.data.dest);
  path.set('documents.build', args.data.src.globs);
  gulp.task('documents:build', task.pug(args.dump()));

  // ---------------------------------------------------------------------------
  // Web Server
  // ---------------------------------------------------------------------------
  /** httpd **/
  args.set('src.globs', path.data.root);
  gulp.task('httpd', task.httpd(args.dump()));

  // ---------------------------------------------------------------------------
  // Watch
  // ---------------------------------------------------------------------------
  gulp.task('watch', function() {
    gulp.watch(path.data.documents.build, gulp.task('documents:build'));
  });

  // ---------------------------------------------------------------------------
  // Deploy
  // ---------------------------------------------------------------------------
  gulp.task('deploy', function(done) {
    gulp.series(
      'documents:build',
      done
    );
  });

  // ---------------------------------------------------------------------------
  // Default
  // ---------------------------------------------------------------------------
  gulp.task('default', gulp.series('httpd', 'watch'));
};
