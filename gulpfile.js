'use strict';

// Main:
const gulp = require('gulp');
const notifier = require('node-notifier');
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const yargs =  require('yargs');
const del = require('del');
const changed = require('gulp-changed');

// Compile:
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Styles:
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');

// Images:
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');

const argv = yargs.argv;
const production = !!argv.production;

// -------------------------------------
//   Available tasks
// -------------------------------------
//     say:hello
// *************************************

const paths = {
  dist: './dist/',
  styles: {
    src: './src/styles/*.{scss,sass}',
    dist: './dist/assets/styles/',
    watch: './src/styles/**/*.{scss,sass}',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}',
    dist: './dist/assets/fonts/',
    watch: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}'
  },
  images: {
    src: [
      "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}"
    ],
    dist: "./dist/assets/img/",
    watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}"
  }
};

const config = {
  imagemin: [
    imageminGiflossy({
      optimizationLevel: 3,
      optimize: 3,
      lossy: 2
    }),
    imageminPngquant({
      speed: 5,
      quality: [0.8, 0.95]
    }),
    imageminZopfli({
      more: true
    }),
    imageminMozjpeg({
      progressive: true,
      quality: 90
    }),
    imagemin.jpegtran({
      progressive: true,
    }),
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
        { removeUnusedNS: false },
        { removeUselessStrokeAndFill: false },
        { cleanupIDs: false },
        { removeComments: true },
        { removeEmptyAttrs: true },
        { removeEmptyText: true },
        { collapseGroups: true }
      ]
    })
  ]
};

// -------------------------------------
//   Task: styles
// -------------------------------------

gulp.task('styles', function () {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(gulpIf(!production, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dist));
});

// -------------------------------------
//   Task: fonts
// -------------------------------------

gulp.task('fonts', function () {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dist));
});

// -------------------------------------
//   Task: images
// -------------------------------------

gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dist))
    .pipe(imagemin(config.imagemin))
    .pipe(gulp.dest(paths.images.dist));
});

// -------------------------------------
//   Task: clean
// -------------------------------------

gulp.task('clean', function () {
  return del(paths.dist);
});

// -------------------------------------
//   Task: say:hello
// -------------------------------------

gulp.task('say:hello', function (done) {
  notifier.notify({
    title: 'Hello World!',
    message: 'Very very cruel frontend world...',
  });

  done();
});

// -------------------------------------
//   Task: default
// -------------------------------------
gulp.task('default', gulp.series('styles'));

// -------------------------------------
//   Task: build
// -------------------------------------
gulp.task('build', gulp.series('styles'));