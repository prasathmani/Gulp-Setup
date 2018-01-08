var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');


//file path
var DEST = './build';

//Output both a minified and non-minified version JS
gulp.task('js', function() {
  return gulp.src('src/js/*.js')
    // This will output the non-minified version
    .pipe(babel({ignore: 'gulpfile.js'}))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to filename.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

//Output both a minified and non-minified version of CSS
gulp.task('sass', function () {
  return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest(DEST))
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(DEST));
});

//ES6 - convert javascript from ES6 to ES5 using Babel
gulp.task('es6', () => {
  return gulp.src('src/js/*.js')
      .pipe(babel({ignore: 'gulpfile.js'}))
      .pipe(gulp.dest(DEST));
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], {read: false})
              .pipe(mocha({reporter: 'list'}))
});

gulp.task('watch', () => {
  return gulp.watch('src/js/*.js', ['es6']);
});

gulp.task('default', ['sass', 'js']);
