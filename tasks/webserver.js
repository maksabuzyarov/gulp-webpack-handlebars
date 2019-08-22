'use strict';

import gulp from 'gulp';
import browsersync from 'browser-sync';
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Tast: server
// -------------------------------------

gulp.task('server', function(done) {
  browsersync.init({
    server: './dist/',
    port: 4000,
    notify: true
  });

  gulp.watch(paths.views.watch, gulp.parallel('views'));
  gulp.watch(paths.styles.watch, gulp.parallel('styles'));
  gulp.watch(paths.scripts.watch, gulp.parallel('scripts'));
  gulp.watch(paths.images.watch, gulp.parallel('images'));

  return done();
});