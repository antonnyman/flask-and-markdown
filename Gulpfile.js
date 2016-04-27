var gulp = require('gulp'),
    gulputil = require('gulp-util'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cssnano =  require('gulp-cssnano');
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');


gulp.task('styles', function() {
    return gulp.src('app/static/sass/style.scss')
    .pipe(rename({ suffix: '.min' }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('app/static/distr'));
  });

gulp.task('js', function() {
    return gulp.src('app/static/js/*.js')
    .pipe(concat('scripts.js'))
    .pipe(rename({suffix: '.min'}))
    //.pipe(uglify())
    .pipe(gulp.dest('app/static/distr'));
  });

gulp.task('html', function() {
    return gulp.src('app/static/html/*.html')
    .pipe(gulp.dest('app/static/distr'))
  });

gulp.task('img', function() {
  return gulp.src('app/img/*')
  .pipe(gulp.dest('app/static/distr/img'))
});


gulp.task('watch', function() {
  gulp.watch('app/static/sass/*.scss', ['styles']);
  gulp.watch('app/static/js/*.js', ['js']);
  gulp.watch('app/static/html/*.html', ['html']);
  gulp.watch('app/img/*', ['img']);
});

gulp.task('default', ['styles',
                      'js',
                      'html',
                      'img',
                      'watch'], function() {

});
