'use strict';

import gulp from 'gulp';
import gulpIf from 'gulp-if';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from '../webpack.config.js';
import browsersync from 'browser-sync';
import { paths, config } from '../gulpfile.babel';


// -------------------------------------
//   Task: scripts
// -------------------------------------

gulp.task('scripts', function () {
  webpackConfig.mode = config.production ? 'production' : 'development';
  webpackConfig.devtool = config.production ? false : 'source-map';

  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpIf(config.production, rename({
      suffix: '.min',
    })))
    .pipe(gulp.dest(paths.scripts.dist))
    .on('end', browsersync.reload);
});
