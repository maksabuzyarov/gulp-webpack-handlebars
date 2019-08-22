'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminGiflossy from 'imagemin-giflossy';
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Task: images
// -------------------------------------

gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dist))
    .pipe(imagemin([
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3,
        lossy: 2,
      }),
      imageminPngquant({
        speed: 1,
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
    ]))
    .pipe(gulp.dest(paths.images.dist));
});