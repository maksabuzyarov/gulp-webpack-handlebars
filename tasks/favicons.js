"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import { stream as favicons } from "favicons";

gulp.task("favicons", () => {
  return gulp.src(paths.favicons.src)
    .pipe(favicons({
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        windows: false,
        yandex: false,
      }
    }))
    .pipe(gulp.dest(paths.favicons.dist))
});
