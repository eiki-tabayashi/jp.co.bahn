'use strict';
var Parameter = require('gulp.plus-parameter');

module.exports = function(gulp, task) {
  var args = new Parameter;
  var path = new Parameter({
     inc: 'inc',
     src: 'src',
    dest: 'test',
    root: 'test',
  });
  var data;

  // ---------------------------------------------------------------------------
  // HTML
  // ---------------------------------------------------------------------------
  /** html:build **/
  args.set('src.globs', path.get('src') + '/*.pug')
      .set('dest.folder', path.get('dest'));
  path.set('html.build', args.get('src.globs'));
  gulp.task('html:build', task.pug(args.dump()));

  // ---------------------------------------------------------------------------
  // CSS
  // ---------------------------------------------------------------------------
  /** css:build **/
  args.set('src.globs', path.get('src') + '/styles/*.styl')
      .set('dest.folder', path.get('dest') + '/styles')
      .set('stylus.options.paths', [path.get('inc') + '/styles']);
  path.set('css.build', args.get('src.globs'));
  gulp.task('css:build', task.stylus(args.dump()));

  // ---------------------------------------------------------------------------
  // JS
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Fonts
  // ---------------------------------------------------------------------------
  /** fonts:clone */
  args.set('src.globs', path.get('src') + '/fonts/**/*')
      .set('dest.folder', path.get('dest') + '/fonts');
  path.set('fonts.clone', args.get('src.globs'));
  gulp.task('fonts:clone', task.clone(args.dump()));

  // ---------------------------------------------------------------------------
  // Media
  // ---------------------------------------------------------------------------
  /** media:build */
  args.set('src.globs', path.get('src') + '/media/**/*')
      .set('dest.folder', path.get('dest') + '/media');
  path.set('media.build', args.get('src.globs'));
  data = args.dump();
  gulp.task('media:retina:build', task.imageretina(data));
  gulp.task('media:reduce:build', task.imagereduce(data));
  gulp.task('media:build', gulp.parallel(
    'media:retina:build', 'media:reduce:build'
  ));

  // ---------------------------------------------------------------------------
  // Sprites
  // ---------------------------------------------------------------------------
  /** sprites:build */
  args.set('src.globs', path.get('src') + '/sprites/**/*.png')
      .set('dest.folder', path.get('dest') + '/media')
      .set('json.dest.folder', path.get('src') + '/styles/sprites');
  path.set('sprites.build', args.get('src.globs'));
  data = args.dump();
  gulp.task('sprites:retina:build', task.spriteretina(data));
  gulp.task('sprites:reduce:build', task.spritereduce(data));
  gulp.task('sprites:build', gulp.parallel(
    'sprites:retina:build', 'sprites:reduce:build'
  ));

  // ---------------------------------------------------------------------------
  // Icons
  // ---------------------------------------------------------------------------
  /** icons:build */
  args.set('src.globs', path.get('src') + '/icons/**/*')
      .set('dest.folder', path.get('dest') + '/fonts')
      .set('css.src.globs', path.get('inc') + '/templates/iconfont.styl')
      .set('css.dest.folder', path.get('src') + '/styles/icons');
  path.set('icons.build.icon', args.get('src.globs'))
      .set('icons.build.css', args.get('css.src.globs'));
  gulp.task('icons:build', task.iconfont(args.dump()));

  // ---------------------------------------------------------------------------
  // Web Server
  // ---------------------------------------------------------------------------
  /** httpd **/
  args.set('src.globs', path.get('root'));
  gulp.task('httpd', task.httpd(args.dump()));

  // ---------------------------------------------------------------------------
  // Watch
  // ---------------------------------------------------------------------------
  /** watch **/
  gulp.task('watch', function() {
    gulp.watch(path.get('fonts.clone'), gulp.task('fonts:clone'));
    gulp.watch(path.get('media.build'), gulp.task('media:build'));
    gulp.watch(path.get('html.build'), gulp.task('html:build'));
    gulp.watch(path.get('icons.build.icon'), gulp.task('icons:build'));
    gulp.watch(path.get('icons.build.css'), gulp.task('css:build'));
    gulp.watch(path.get('sprites.build'), gulp.task('sprites:build'));
    gulp.watch(path.get('css.build'), gulp.task('css:build'));
  });

  // ---------------------------------------------------------------------------
  // Deploy
  // ---------------------------------------------------------------------------
  gulp.task('deploy', gulp.series(
    gulp.parallel(
      'sprites:build',
      'icons:build',
      'media:build',
      'fonts:clone'
    ),
    'css:build',
    'html:build'
  ));

  // ---------------------------------------------------------------------------
  // Default
  // ---------------------------------------------------------------------------
  gulp.task('default', gulp.series('httpd', 'watch'));
};
