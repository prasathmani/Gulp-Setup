module.exports = function (gulp, plugins) {
    return function () {
          gulp.src('./*.js')
            .pipe(babel({ignore: 'gulpfile.js'}))
            .pipe(gulp.dest('./dist'));
    };
};