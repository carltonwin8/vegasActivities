var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var yaml = require('yamljs');

gulp.task ('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
});

gulp.task ('watch',['browser-sync'], function () {
  gulp.watch("*.html").on('change', browserSync.reload)
  gulp.watch("js/*.js").on('change', browserSync.reload)
  gulp.watch("css/*.css").on('change', browserSync.reload)
});


gulp.task ('updateJson', function () {
  yaml.load('/home/carltonj2000/cj/configsNscripts/data/vegasActivities.yml', function(result) {
    require('fs').writeFileSync(process.cwd() + '/vegasActivities.json',
      'var vegasActivities = ' + JSON.stringify(result, null, 2));
  });
});

gulp.task ('default', ['watch']);
