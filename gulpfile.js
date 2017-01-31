const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const path = require('path');
const karma = require('karma').Server;


gulp.task('browserSync', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: 'src',
    },
    port: 5000,
    ghostMode: false
  });
});

gulp.task('default', ['scripts', 'browserSync', 'watch']);

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build/'));
});

gulp.task('karma', (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch-test', () => {
  gulp.watch(['src/js/**/*.js', './jasmine/spec/*.js'], ['scripts', 'karma']);
});

gulp.task('watch', () => {
  gulp.watch('src/css/**/*.css', browserSync.reload);
  gulp.watch('**/*.html', browserSync.reload);
  gulp.watch(['src/js/**/*.js', './jasmine/spec/*.js'], browserSync.reload);
});

