const gulp = require('gulp');
const browserify = require('browserify');
const browserSync = require('browser-sync').create();

    gulp.task('browser-sync', () => {
      browserSync.init({
        server: './src/'
      });
    });

    gulp.task('js', () => {
      gulp.src('jasmine/spec/inverted-index-test.js')
      .pipe(browserify())
      .pipe(uglify())
      .pipe(gulp.dest('./jasmine'));
    });

    gulp.task('default', ['browser-sync'], () => {
      const filesToWatch = ['**/*.js', '**/*.css', '**/*.html'];
      gulp.watch(filesToWatch).on('change', browserSync.reload);
    });
