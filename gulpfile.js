var gulp = require('gulp');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
  src: {
    sass: ['./src/sass/**/*.sass'],
    html: ['./*.html']
  },
  dest: {
    dist: './',
    css: './css'
  }
};

gulp.task('clean:css', function(done) {
  return del(['./css/**/*.css'], done);
});

gulp.task('sass', ['clean:css'], function() {
  return gulp.src(paths.src.sass)
    .pipe(sass()).on('error', sass.logError)
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.dest.css))
    .pipe(browserSync.stream());
});

// Reload html file when changes are saved
gulp.task('html', function(){
  return gulp.src(paths.src.html)
  .on('end', reload);
});

gulp.task('serve', function() {
  browserSync.init({
      server: "./"
  });

  gulp.watch(paths.src.sass, ['sass']);
  gulp.watch(paths.src.js, ['js']);
  gulp.watch(paths.src.html, ['html']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['sass'], function() {
  gulp.run('serve');
});