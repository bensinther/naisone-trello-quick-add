'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var shell = require('gulp-shell');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
  return gulp.src([
      path.join(conf.paths.src, '/app/**/*.html'),
      path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache('templateCacheHtml.js', {
      module: 'n1ElectronTrelloTodo',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), {read: false});
  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(conf.paths.tmp, '/partials'),
    addRootSlash: false
  };

  var htmlFilter = $.filter('*.html', {restore: true});
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});
  var assets;

  return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))
    .pipe($.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense})).on('error', conf.errorHandler('Uglify'))
    .pipe($.sourcemaps.write('maps'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe($.sourcemaps.init())
    .pipe($.replace('../../bower_components/material-design-iconfont/iconfont/', '../fonts/'))
    .pipe($.minifyCss({processImport: false}))
    .pipe($.sourcemaps.write('maps'))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
    .pipe($.size({title: path.join(conf.paths.dist, '/'), showFiles: true}));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles().concat('bower_components/material-design-iconfont/iconfont/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe($.flatten())
    .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
  var fileFilter = $.filter(function (file) {
    return file.stat.isFile();
  });

  return gulp.src([
      path.join(conf.paths.src, '/**/*'),
      path.join('!' + conf.paths.src, '/**/*.{html,css,js,less}')
    ])
    .pipe(fileFilter)
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('copy-electron-files', function () {
  return gulp.src(path.join(conf.paths.src, '**electron**.js'))
    .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
});

gulp.task('clean', function () {
  return $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/'), 'executables/**/*']);
});

gulp.task('build', ['html', 'fonts', 'other', 'copy-electron-files']);
gulp.task('build-electron', ['build'], shell.task([
  'electron-packager ' + path.join(conf.paths.dist, '/') + ' "Naisone Trello Quick Add" --platform=darwin --arch=x64 --out="executables" --version=0.34.0 --overwrite --icon="dist/assets/images/n1-logo"',
  'electron-packager ' + path.join(conf.paths.dist, '/') + ' "Naisone Trello Quick Add" --platform=win32 --arch=x64 --out="executables" --version=0.34.0 --overwrite',
  //TODO: electron-packager statement for windows (above) does not accept icon parameter
  //'electron-packager ' + path.join(conf.paths.dist, '/') + ' "Naisone Trello Quick Add" --platform=win32 --arch=x64 --out="executables" --version=0.34.0 --overwrite --icon="dist/assets/images/n1-logo.ico"',
  // --icon="dist/assets/images/n1-logo"
  // nor
  // --icon="dist/assets/images/n1-logo.ico".
  // Leads to an error at build time (run gulp inside the terminal/console)
/**
 * Error: Command `electron-packager dist/ "Naisone Trello Quick Add" --platform=win32 --arch=x64 --out="executables" --version=0.34.0 --overwrite --icon="dist/assets/images/n1-logo.ico"` failed with exit code 1
 at ChildProcess.exithandler (child_process.js:751:12)
 at ChildProcess.emit (events.js:110:17)
 at maybeClose (child_process.js:1015:16)
 at Process.ChildProcess._handle.onexit (child_process.js:1087:5)
 */
  'open "executables/Naisone Trello Quick Add-darwin-x64/Naisone Trello Quick Add.app"'
]));
