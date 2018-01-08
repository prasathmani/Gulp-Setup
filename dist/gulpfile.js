var gulp = require('gulp')
var babel = require('gulp-babel');

gulp.task('es6', () => {
  return gulp.src('./*.js')
      .pipe(babel({ignore: 'gulpfile.js'}))
      .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  return gulp.watch('./*.js', ['es6']);
});

gulp.task('default', ['es6', 'watch']);
