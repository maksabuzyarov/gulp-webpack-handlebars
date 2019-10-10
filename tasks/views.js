'use strict';

import hb from 'gulp-hb';
import gulp from 'gulp';
import gulpIf from 'gulp-if';
import plumber from 'gulp-plumber';
import replace from 'gulp-replace';
import beautify from 'gulp-beautify';
import browsersync from 'browser-sync';
import hbLayouts from 'handlebars-layouts';
import { paths, config } from '../gulpfile.babel';


// -------------------------------------
//   Task: views
// -------------------------------------

gulp.task('views', function (done) {
  let hbStream = hb({
    //debug: true
  })
    .partials(paths.views.partials + '**/*.{hbs,html}')

    // Data
    .data(config.html.data + '/**/*.{js,json}')
    //.data(config.html.metadata)

    // Helpers
    .helpers(hbLayouts)
    .helpers(paths.views.helpers + '/*.js');

  return gulp.src(paths.views.src)
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(beautify.html({
      indent_size: 2, preserve_newlines: false,
    }))
    .pipe(gulpIf(config.production, replace('.css', '.min.css')))
    .pipe(gulpIf(config.production, replace('.js', '.min.js')))
    .pipe(gulp.dest(paths.views.dist))
    .on('end', browsersync.reload);
});