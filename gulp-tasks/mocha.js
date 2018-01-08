module.exports = function (gulp, plugins) {
    return function () {
        gulp.src(['test/*.js'], {read: false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', log.error)
    };
};