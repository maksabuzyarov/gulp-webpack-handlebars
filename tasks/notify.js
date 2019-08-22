'use strict';

import gulp from 'gulp';
import notifier from 'node-notifier';


// -------------------------------------
//   Task: say
// -------------------------------------

gulp.task('say:hello', function (done) {
  notifier.notify({
    title: 'Hello World!',
    message: 'Very very cruel frontend world...',
  });

  return done();
});

gulp.task('say:build', function (done) {
  notifier.notify({
    title: 'Build complete!',
    message: 'ok!',
  });

  return done();
});