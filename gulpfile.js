var gulp = require('gulp')
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var log = require('gulplog');
var sass = require('gulp-sass');            //compiles SASS
var minifyCss = require('gulp-minify-css'); //minifies css
var concat = require('gulp-concat');        //joins multiple files into one
var rename = require('gulp-rename');        //renames files

gulp.task('es6', () => {
  return gulp.src('./*.js')
      .pipe(babel({ignore: 'gulpfile.js'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], {read: false})
              .pipe(mocha({reporter: 'list'}))
              .on('error', log.error)
});

gulp.task('watch', () => {
  return gulp.watch('./*.js', ['es6']);
});

gulp.task('default', ['es6', 'watch']);
