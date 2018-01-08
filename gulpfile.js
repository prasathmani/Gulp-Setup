var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

//file path
var DEST = './build';

//Output both a minified and non-minified version
gulp.task('js-non-min', function() {
  return gulp.src('src/js/*.js')
    // This will output the non-minified version
    .pipe(babel({ignore: 'gulpfile.js'}))
    .pipe(gulp.dest(DEST))
    // This will minify and rename to filename.min.js
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(DEST));
});

//ES6 - convert javascript from ES6 to ES5 using Babel
gulp.task('es6', () => {
  return gulp.src('src/js/*.js')
      .pipe(babel({ignore: 'gulpfile.js'}))
      .pipe(gulp.dest(DEST));
});

gulp.task('watch', () => {
  return gulp.watch('src/js/*.js', ['es6']);
});

gulp.task('default', ['es6', 'watch']);
