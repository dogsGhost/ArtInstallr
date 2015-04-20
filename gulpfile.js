'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');

/*
 Browserify
 */
gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/js/main.jsx',
    debug: true,
    // defining transforms here will avoid crashing your stream
    transform: [babelify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/js/'));
});

/*
 Styles - refactor later for more efficient building
 */
var stylesheets = [
  'node_modules/bootstrap/dist/css/bootstrap.min.css',
  'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
  'src/css/style.css'
];

gulp.task('css', function() {
    return gulp.src(stylesheets)
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./public/css/'));
});

/*
 Watch
 */
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.jsx', ['js']);
    gulp.watch('src/css/style.css', ['css']);
});

gulp.task('connect', function () {
  browserSync.init({
    server: {
      baseDir: './public/'
    }
  });

  gulp.watch('public/**/*').on('change', reload);  
});

/*
 Default
 */
gulp.task('default', ['css', 'js']);