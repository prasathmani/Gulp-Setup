var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');
var sass = require('gulp-sass');
var htmlmin = require('gulp-htmlmin');
var extname = require('gulp-extname');
var assemble = require('assemble');
var hbscompiler = assemble();
var marked = require('marked');
var sitemap = require('gulp-sitemap-generator');
var gft = require('gulp-file-tree');
var jsonTransform = require('gulp-json-transform');
var data = require('gulp-data');
var fs = require('fs');
var path = require('path');
var template = require('gulp-template');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var markdown = require('gulp-markdown');
//var handlebars = require('gulp-compile-handlebars');

//file path
var DEST = './build';
var DEST2 = './dest';
var json = JSON.parse(fs.readFileSync('./dist/tree.json'));

gulp.task('load', function(cb) {
   hbscompiler.layouts('templates/layouts/*.hbs');
   hbscompiler.pages('src/components/**/*.hbs');
  //hbscompiler.pages('templates/pages/*.hbs');
  cb();
});
 
gulp.task('assemble', ['load'], function() {
  return hbscompiler.toStream('pages')
    .pipe(hbscompiler.renderFile())
    .pipe(htmlmin())
    .pipe(extname())
    .pipe(hbscompiler.dest(DEST));
});

//Output both a minified and non-minified version JS
gulp.task('js', function() {
  return gulp.src('src/components/**/*.js')
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
  return gulp.src('src/components/**/*.scss')
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

gulp.task('gettreejson1', () => {
  return gulp.src('./build/**/*.html')
      .pipe(gft()) 
      .pipe(gulp.dest('./dest'))
})

// gulp.task('gettreejson2', function() {
//   gulp.src('./dest/*.json')
//   .pipe(jsonTransform(function(data, file) {
//     return {
//       title: 'AEM'
//   };
//   }))
//   .pipe(gulp.dest('./dist'));
// });

gulp.task('gettreejson2', function() {
  gulp.src('./dest/*.json')
  .pipe(jsonTransform(function(data, file) {
    var title, children= data.children, obj={}; arr=[];
    for (var i=0; i<children.length; i++) {
        obj = {};
        obj['title'] = children[i].children[0].name.replace(".html", ""); 
        obj['path'] = '/build/'+ children[i].children[0].relative.replace("\\", "/");
        obj['readme'] = '/build/'+ children[i].children[0].name.replace(".html", "") + '/README.md';
        arr.push(obj);
    }
    return {"maps": arr};   
  }))
  .pipe(gulp.dest('./dist'));
});


gulp.task('sitemap', function() {
  return gulp.src('./map.html')
    .pipe(data(() => json))
    .pipe(template())
    .pipe(inject(gulp.src(['./src/partials/head/*.html']), {
      starttag: '<!-- inject:{{path}} -->',
      relative: true,
      transform: function (filePath, file) {
        // return file contents as string
        return file.contents.toString('utf8')
      }
    }))
    .pipe(gulp.dest('./sitemap'));
});

gulp.task('readmdtohtml',() => {
  gulp.src('src/components/**/*.md')
        .pipe(markdown())
        .pipe(gulp.dest(DEST))
})

gulp.task('watch', () => {
  return gulp.watch('src/js/*.js', ['es6']);
});

gulp.task('build-sitemap', function (cb) {
  runSequence(['gettreejson1', 'gettreejson2', 'sitemap'], cb);
});
// gulp.task('build-sitemap', ['gettreejson1', 'gettreejson2', 'sitemap']);

gulp.task('default', ['sass', 'js', 'assemble', 'readmdtohtml']);

