'use strict';

import gulp from "gulp";
import del from "del";
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Task: clean
// -------------------------------------

gulp.task('clean', function () {
  return del(paths.dist);
});