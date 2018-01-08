module.exports = function (gulp, plugins) {
    return function () {
        gulp.src(SCSS_SRC)                          
            .pipe(sass().on('error', sass.logError))  
            .pipe(minifyCss())                        
            .pipe(concat('style.css'))  
            .pipe(rename({             
                basename : 'style',       
                extname : '.min.css'
            }))
      .pipe(gulp.dest('build/css //writes the renamed file to the destination'))

    };
};

