(function(){
  /*global -$ */
  'use strict';

  var gulp = require('gulp');
  var $ = require('gulp-load-plugins')();
  var browserSync = require('browser-sync');
  var reload = browserSync.reload;
  var notify = require('gulp-notify');
  var dust = require('gulp-dust');

  gulp.task('styles', function () {
    return gulp.src('styles/main.scss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
        outputStyle: 'nested', // libsass doesn't support expanded yet
        precision: 10,
        includePaths: ['.'],
        onError: console.error.bind(console, 'Sass error:')
      }))
      .pipe($.postcss([
        require('autoprefixer-core')({browsers: ['last 1 version']})
      ]))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('dist/styles'))
      .pipe(reload({stream: true}));
  });

  gulp.task('scripts', function () {
    return gulp.src('scripts/**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.plumber())
      .pipe($.babel())
      .pipe($.wrapCommonjs({
        relativePath: 'scripts',
        pathModifier: function (path) {
          return path.replace(/.js$/, '');
        }
      }))
      .pipe($.concat('app.js'))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('dist/scripts/'))
      .pipe(reload({stream: true}));
  });

  gulp.task('templates', function() {
    return gulp.src('templates/*.dust')
      .pipe(dust())
      .pipe($.concat('templates.js'))
      .pipe(gulp.dest('dist/scripts/'))
      .pipe(notify('Minification Complete'))
      .pipe(reload({stream: true}));
  });

  gulp.task('build', ['scripts', 'templates', 'styles'], function(){});

  gulp.task('serve', ['build'], function () {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['./']
      }
    });

    // watch for changes
    gulp.watch([
      '*.html',
      'scripts/**/*.js'
    ]).on('change', reload);

    gulp.watch('styles/**/*.scss', ['styles']);
    gulp.watch('templates/**/*.dust', ['templates']);
    gulp.watch('scripts/**/*.js', ['scripts']);
  });

  gulp.task('default', ['serve'], function (){});
})();