const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jasmineBrowser = require('gulp-jasmine-browser');


gulp.task('browserSync', ['watch'], () => {
  browserSync.init({
    server: {
      baseDir: 'src/',
    },
    port: 3000,
    ghostMode: false
  });
});

gulp.task('default', ['browserSync']);

gulp.task('watch', () => {
  gulp.watch('.src/css/*.css', browserSync.reload);
  gulp.watch('src/index.html', browserSync.reload);
  gulp.watch(['./src/*.js', './jasmine/spec/*.js'], browserSync.reload);
});


// gulp.task('jasmine', () => {
//   const filesForTest = ['./jasmine/spec/less/**/*'];
//     gulp.src(filesForTest)
//     .pipe(watch(filesForTest))
//     .pipe(jasmineBrowser.specRunner({ console: true }))
//     .pipe(jasmineBrowser.headless());
// });

