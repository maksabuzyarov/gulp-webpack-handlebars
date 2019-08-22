'use strict';

// Main:
const del = require('del');
const gulp = require('gulp');
const yargs = require('yargs');
const gulpIf = require('gulp-if');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');

// Compile:
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// Styles:
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

// Views:
const hb = require('gulp-hb');
const beautify = require('gulp-beautify');

// Scripts
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

// Images:
const imagemin = require('gulp-imagemin');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGiflossy = require('imagemin-giflossy');

const argv = yargs.argv;
const production = !!argv.production;

// -------------------------------------
//   Available tasks
// -------------------------------------
//     build
//     styles
//     fonts
//     images
//     clean
//     say:hello
// *************************************

const paths = {
  dist: './dist/',
  views: {
    src: './src/views/templates/**/*.html',
    pages: './src/views/templates/',
    partials: './src/views/partials/',
    helpers: './src/views/helpers/',
    dist: './dist/',
    watch: './src/views/**/*.html',
  },
  styles: {
    src: './src/styles/*.{scss,sass}',
    dist: './dist/assets/styles/',
    watch: './src/styles/**/*.{scss,sass}',
  },
  fonts: {
    src: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}',
    dist: './dist/assets/fonts/',
    watch: './src/fonts/**/*.{woff,woff2,eot,ttf,svg}',
  },
  images: {
    src: [
      './src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}',
    ],
    dist: './dist/assets/img/',
    watch: './src/img/**/*.{jpg,jpeg,png,gif,svg,tiff}',
  },
  scripts: {
    src: './src/js/main.js',
    dist: './dist/assets/js/',
    watch: './src/js/**/*.js',
  },
  assets: {
    dist: './dist/assets/',
  },
};

const config = {
  imagemin: [
    imageminGiflossy({
      optimizationLevel: 3,
      optimize: 3,
      lossy: 2,
    }),
    imageminPngquant({
      speed: 5,
      quality: [0.8, 0.95],
    }),
    imageminZopfli({
      more: true,
    }),
    imageminMozjpeg({
      progressive: true,
      quality: 90,
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
        { collapseGroups: true },
      ],
    }),
  ],
};

const webpackConfig = {
  entry: {
    main: './src/js/main.js',
  },

  output: {
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }],
            ],
          },
        },
      },
    ],
  },
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
      suffix: '.min',
    }))
    .pipe(gulpIf(!production, sourcemaps.write()))
    .pipe(gulp.dest(paths.styles.dist));
});

// -------------------------------------
//   Task: scripts
// -------------------------------------
webpackConfig.mode = production ? 'production' : 'development';
webpackConfig.devtool = production ? false : 'source-map';

gulp.task('scripts', function () {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulpIf(production, rename({
      suffix: '.min',
    })))
    .pipe(gulp.dest(paths.scripts.dist));
});

// -------------------------------------
//   Task: views
// -------------------------------------
gulp.task('views', function (done) {
  let hbStream = hb({
    //debug: true
  })
    .partials(paths.views.partials + '**/*.{hbs,html}')

    // Data
    //.data(config.html.data + '/**/*.{js,json}')
    //.data(config.html.metadata)

    // Helpers
    //.helpers(require('handlebars-layouts'))
    .helpers(paths.views.helpers + '/*.js');

  return gulp.src(paths.views.src)
    .pipe(plumber())
    .pipe(hbStream)
    .pipe(beautify.html({
      indent_size: 2, preserve_newlines: false,
    }))
    .pipe(gulp.dest(paths.views.dist));
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
gulp.task(
  'default', gulp.series('styles', 'scripts', 'images', 'fonts', 'views'));

// -------------------------------------
//   Task: build
// -------------------------------------
gulp.task(
  'build', gulp.series('styles', 'scripts', 'images', 'fonts', 'views'));

export { paths, config };