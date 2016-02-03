// generated on 2016-01-18 using generator-chrome-extension 0.5.1
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import jade from 'gulp-jade';
import { Server as karma } from 'karma';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('dist'));
});


gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function(err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('template', ['jade', 'html']);

gulp.task('jade', () => {
    gulp.src('app/scripts.babel/**/*.jade')
    //.pipe($.debug())
    .pipe(jade())
    .pipe(gulp.dest('app/scripts/'))
});

gulp.task('html',  () => {
  const assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});


// Scripts

gulp.task('scripts', ['babel', 'inject', 'wiredep'])

gulp.task('babel', () => {
  return gulp.src('app/scripts.babel/**/*.js')
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe(gulp.dest('app/scripts'));
});

gulp.task('inject', () => {
   return gulp.src('./app/popup.html')
   .pipe($.inject(gulp.src('scripts/**/*.js',
   {cwd: 'app'}, { read: false }, {relative: true})))
   .pipe(gulp.dest('./app'));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});




gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

// Watching

gulp.task('watch', ['scripts', 'inject', 'wiredep', 'template'], () => {
  $.livereload.listen({quiet: true});

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json'
  ])
    .on('change', $.livereload.reload)
    .on('error', swallowError);

  gulp.watch('app/scripts.babel/**/*.jade', ['template'])
    .on('error', swallowError);
  gulp.watch('app/scripts.babel/**/*.js', ['babel', 'inject', 'wiredep'])
    .on('error', swallowError);
  gulp.watch('bower.json', ['wiredep'])
    .on('error', swallowError);
});

// Test

gulp.task('inject-karma', () => {
  gulp.src('./karma.conf.js')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./,
      dependencies: true,
      devDependencies: true,
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('test', ['scripts'], (done) => {
  new karma({
    configFile: __dirname('/karma.conf.js'),
    singleRun: true
  }, done).start();
})

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('package', function() {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/*')
      .pipe($.zip('temp-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'scripts', 'chromeManifest',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}
