const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', function() {
});

gulp.task('test', function() {
  gulp.src('./test/**/*.js', {read: false})
    .pipe(mocha({reporter: 'nyan'}))
});