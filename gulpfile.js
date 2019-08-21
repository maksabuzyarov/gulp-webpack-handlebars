'use strict';

const gulp = require('gulp');
const notifier = require('node-notifier');

// -------------------------------------
//   Available tasks:
// -------------------------------------
//     say:hello
// *************************************

gulp.task('say:hello', function (done) {
  notifier.notify({
    title: 'Hello World!',
    message: 'Very very cruel frontend world...',
  });

  done();
});