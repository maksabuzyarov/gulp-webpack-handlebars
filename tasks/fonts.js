'use strict';

import gulp from 'gulp';
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Task: fonts
// -------------------------------------

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
});