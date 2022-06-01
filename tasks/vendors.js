'use strict';

import gulp from "gulp";
import { paths } from '../gulpfile.js';


// -------------------------------------
//   Task: vendors
// -------------------------------------

gulp.task('vendors', function () {
  return gulp.src(paths.vendors.src)
    .pipe(gulp.dest(paths.vendors.dist))
});
