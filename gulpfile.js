var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var yaml = require('yamljs');
var swig = require('gulp-swig');
var data = require('gulp-data');

var yamlDir = '/home/carltonj2000/cj/configsNscripts/data/';
gulp.task ('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })
});

gulp.task('templates', function () {
  return gulp.src('./templates/*.html')
    .pipe(data(function () {
      return require(yamlDir + 'passwords.json');
      }))
    .pipe(swig({defaults: {cache: false}})) // avoid caching for browser-sync
    .pipe(gulp.dest('./'))
});

gulp.task ('watch',['browser-sync'], function () {
  gulp.watch("index.html").on('change', browserSync.reload)
  gulp.watch("js/*.js").on('change', browserSync.reload)
  gulp.watch("css/*.css").on('change', browserSync.reload)
  gulp.watch("templates/*.html", ['templates'])
});


gulp.task ('updateActivities', function () {
  yaml.load(yamlDir + 'vegasActivities.yml', function(result) {
    require('fs').writeFileSync(process.cwd() + '/vegasActivities.json',
      'var vegasActivities = ' + JSON.stringify(result, null, 2));
  });
});

gulp.task ('updateKeys', function () {
  yaml.load(yamlDir + 'passwords.yml', function(result) {
    require('fs')
      .writeFileSync(yamlDir + 'passwords.json',JSON.stringify(result, null, 2));
  });
});

gulp.task ('default', ['templates','watch']);
