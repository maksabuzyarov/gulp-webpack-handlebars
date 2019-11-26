'use strict';

import gulp from 'gulp';
import changed from 'gulp-changed';
import imagemin from 'gulp-imagemin';
import imageminZopfli from 'imagemin-zopfli';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { paths } from '../gulpfile.babel';


// -------------------------------------
//   Task: images
// -------------------------------------

gulp.task('images', function () {
  return gulp.src(paths.images.src)
    .pipe(changed(paths.images.dist))
    .pipe(imagemin([
      imageminPngquant({
        speed: 4,
        quality: [0.8, 0.95],
      }),
      imageminZopfli({
        more: false,
      }),
      imageminMozjpeg({
        progressive: true,
        quality: 90,
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
