'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import cleanCSS from 'gulp-clean-css';
import sourcemaps from 'gulp-sourcemaps';
import browsersync from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import { paths, config } from '../gulpfile.babel';


// -------------------------------------
//   Task: styles
// -------------------------------------

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(plumber(config.plumber))
    .pipe(gulpIf(!config.production, sourcemaps.init()))
    .pipe(sass({
      includePaths: ['node_modules'],
      precision: 7,
    }))
    .pipe(autoprefixer())
    .pipe(gulpIf(config.production, cleanCSS()))
    .pipe(gulpIf(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browsersync.stream());
});
