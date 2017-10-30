// Define variables.
var autoprefixer = require('autoprefixer');
var browserSync  = require('browser-sync').create();
var cleancss     = require('gulp-clean-css');
var concat       = require('gulp-concat');
var del          = require('del');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var imagemin     = require('gulp-imagemin');
var notify       = require('gulp-notify');
var postcss      = require('gulp-postcss');
var rename       = require('gulp-rename');
var run          = require('gulp-run');
var runSequence  = require('run-sequence');
var sass         = require('gulp-ruby-sass');
var uglify       = require('gulp-uglify');

var paths        = require('./_assets/gulp_config/paths');


// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate location.
gulp.task('build:styles:main', function() {
    return sass(paths.sassFiles + '/main.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [paths.sassFiles]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(paths.jekyllCssFiles))
        .pipe(gulp.dest(paths.siteCssFiles))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Builds all styles.
gulp.task('build:styles', ['build:styles:main']);

gulp.task('clean:styles', function(callback) {
    del([paths.jekyllCssFiles + 'main.css',
        paths.siteCssFiles + 'main.css'
    ]);
    callback();
});

// Optimizes and copies image files.
gulp.task('build:images', function() {
    return gulp.src(paths.imageFilesGlob)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.jekyllImageFiles))
        .pipe(gulp.dest(paths.siteImageFiles))
        .pipe(browserSync.stream());
});

gulp.task('clean:images', function(callback) {
    del([paths.jekyllImageFiles, paths.siteImageFiles]);
    callback();
});

// Runs jekyll build command.
gulp.task('build:jekyll', function() {
    var shellCommand = 'bundle exec jekyll build --future --config _config.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Runs jekyll build command using test config.
gulp.task('build:jekyll:test', function() {
    var shellCommand = 'bundle exec jekyll build --future --config _config.yml,_config.test.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Runs jekyll build command using local config.
gulp.task('build:jekyll:local', function() {
    var shellCommand = 'bundle exec jekyll build --future --config _config.yml,_config.test.yml,_config.dev.yml';

    return gulp.src('')
        .pipe(run(shellCommand))
        .on('error', gutil.log);
});

// Deletes the entire _site directory.
gulp.task('clean:jekyll', function(callback) {
    del(['_site']);
    callback();
});

gulp.task('clean', ['clean:jekyll',
    'clean:images',
    'clean:styles']);

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence('clean',
        ['build:images', 'build:styles'],
        'build:jekyll',
        callback);
});

// Builds site anew using test config.
gulp.task('build:test', function(callback) {
    runSequence('clean',
        ['build:images', 'build:styles'],
        'build:jekyll:test',
        callback);
});

// Builds site anew using local config.
gulp.task('build:local', function(callback) {
    runSequence('clean',
        ['build:images', 'build:styles'],
        'build:jekyll:local',
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// Special tasks for building and then reloading BrowserSync.
gulp.task('build:jekyll:watch', ['build:jekyll:local'], function(callback) {
    browserSync.reload();
    callback();
});

// Static Server + watching files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().
gulp.task('serve', ['build:local'], function() {

    browserSync.init({
        server: paths.siteDir,
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: true        // Toggle to automatically open page when starting.
    });

    // Watch site settings.
    gulp.watch(['_config.yml'], ['build:jekyll:watch']);

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('_assets/styles/**/*.scss', ['build:styles']);

    // Watch image files; changes are piped to browserSync.
    gulp.watch('_assets/img/**/*', ['build:images']);

    // Watch posts.
    gulp.watch('_posts/**/*.+(md|markdown|MD)', ['build:jekyll:watch']);

    // Watch drafts if --drafts flag was passed.
    if (module.exports.drafts) {
        gulp.watch('_drafts/*.+(md|markdown|MD)', ['build:jekyll:watch']);
    }

    // Watch html and markdown files.
    gulp.watch(['**/*.+(html|md|markdown|MD)', '!_site/**/*.*'], ['build:jekyll:watch']);

    // Watch RSS feed XML files.
    gulp.watch('**.xml', ['build:jekyll:watch']);

    // Watch data files.
    gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:jekyll:watch']);

    // Watch favicon.png.
    gulp.watch('favicon.png', ['build:jekyll:watch']);
});

// Updates Ruby gems
gulp.task('update:bundle', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});
