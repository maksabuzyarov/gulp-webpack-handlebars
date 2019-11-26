'use strict';

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import uglify from 'gulp-uglify';
import fileInclude from 'gulp-file-include';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config.js';
import browsersync from 'browser-sync';
import sourcemaps from 'gulp-sourcemaps';
import { paths, config } from '../gulpfile.babel';


// -------------------------------------
//   Task: scripts
// -------------------------------------

gulp.task('scripts:webpack', function () {
  webpackConfig.mode = config.production ? 'production' : 'development';
  webpackConfig.devtool = config.production ? false : 'source-map';

  return gulp.src(paths.scripts.src)
    .pipe(plumber(config.plumber))
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(paths.scripts.dist))
    .on('end', browsersync.reload);
});

gulp.task('scripts:other', function() {
  return gulp.src(paths.scripts.srcOther)
    .pipe(plumber(config.plumber))
    .pipe(gulpIf(!config.production, sourcemaps.init()))
    .pipe(fileInclude(config.fileInclude))
    .pipe(gulp.dest(paths.scripts.distOther))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulpIf(!config.production, sourcemaps.write()))
    .pipe(gulp.dest(paths.scripts.distOther));
});

gulp.task('scripts', gulp.parallel('scripts:webpack', 'scripts:other'));
