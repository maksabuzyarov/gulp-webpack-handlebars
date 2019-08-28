"use strict";

import { paths, config } from "../gulpfile.babel";
import gulp from "gulp";
import svg from "gulp-svg-sprite";
import browsersync from "browser-sync";

gulp.task("sprites", () => {
  return gulp.src(paths.sprites.src)
    .pipe(svg({
      shape: {
        dest: "intermediate-svg"
      },
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(gulp.dest(paths.sprites.dist))
    .on("end", browsersync.reload);
});