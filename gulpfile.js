const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const bs = require('browser-sync').create();
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const path = require('path');
const karma = require('karma').Server;

const reload = browserSync.reload;

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build/'));
});

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'index.html'
    },
    port: process.env.PORT || 4000,
    ui: false,
    ghostMode: false
  });
});

gulp.task('browserTest', ['scripts'], () => {
  bs.init({
    server: {
      baseDir: ['./src/js', './jasmine'],
      index: 'SpecRunner.html'
    },
    port: 4040,
    ui: false,
    ghostMode: false
  });
});

gulp.task('karma', ['scripts'], (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch', ['browserTest', 'browser-sync'], () => {
  gulp.watch('src/css/**/*.css', reload);
  gulp.watch('**/*.html', reload);
  gulp.watch('src/js/**/*.js', reload);
  gulp.watch(['src/js/**/*.js', 'jasmine/spec/*.js'], ['scripts']);
  gulp.watch(
    ['./src/js/**/*.js', './jasmine/spec/inverted-index-test.js'], bs.reload);
});
gulp.task('default', ['browser-sync', 'scripts', 'browserTest', 'watch']);

gulp.task('test', ['scripts', 'karma']);
