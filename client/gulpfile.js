/**
 * Created by Christian on 29.06.2014.
 */

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var less = require('gulp-less');
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var html2js = require('gulp-ng-html2js');
var minifyhtml = require('gulp-minify-html');
var inject = require('gulp-inject');
var appendRev = require('./gulp-append-rev.js').appendRev;
var appendAppInfo = require('./gulp-append-rev.js').appendAppInfo;
var angularFileSort = require('gulp-angular-filesort');
var pkg = require('./package.json');
var gulpif = require('gulp-if');
var argv = require('yargs').argv;
var header = require('gulp-header');
var cssmin = require('gulp-minify-css');
var path = require('path');

var release = argv.release;

var paths = {
    "filenames": {
        "app": pkg.name + ".js",
        "css": pkg.name + ".css",
        "template": pkg.name + ".templates.js",
        "vendor": pkg.name + ".vendor.js",
        "img": 'site.png'
    },
    "src": {
        "fonts": 'src/assets/fonts/*.*',
        "img": ['src/assets/images/*.png', 'src/assets/images/*.jpg'],
        "app": ['src/**/*.js'],
        "template": ['src/app/**/*.html', 'src/common/**/*.html'],
        "css": 'src/assets/main.less',
        "index": 'src/index.html'
        //"bootstrap": 'src/assets/bootstrap.less'
    },
    "name": pkg.name,
    "build": "build/",
    "templatemodule": pkg.name + ".templates"
};

function watchFilesAndStartTask(filesGlob, task) {
    console.log(filesGlob);
    console.log(task);
    watch(filesGlob, function (files, cb) {
        gulp.start(task, cb);
    });
}

gulp.task('changelog', function () {
    require('conventional-changelog')({
        repository: 'https://github.com/Opiskull/one4all',
        version: require('./package.json').version,
        file: '../CHANGELOG.md'
    }, function (err, log) {
        require('fs').writeFile('../CHANGELOG.md', log);
    });
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});

gulp.task('build', ['clean'], function () {
    gulp.start('fonts');
    gulp.start('images');
    gulp.start('index');
});

gulp.task('watch', function () {
    gulp.start('watch:fonts', 'watch:images', 'watch:app', 'watch:templates', 'watch:vendor', 'watch:css', 'watch:index');
});

gulp.task('clean', function () {
    return gulp.src(paths.build, {read: false})
        .pipe(clean());
});

gulp.task('index', ['app', 'templates', 'vendor', 'css'], function () {
    return gulp.src('./src/index.html')
        .pipe(
        inject(
            gulp.src([
                paths.build + paths.filenames.vendor,
                paths.build + paths.filenames.app,
                paths.build + paths.filenames.css,
                paths.build + paths.filenames.template
            ], {read: false}),
            {
                ignorePath: paths.build, addRootSlash: false
            }
        )
    )
        .pipe(appendRev())
        .pipe(appendAppInfo())
        .pipe(gulp.dest(paths.build));
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('images', function () {
    return gulp.src(paths.src.img)
        .pipe(gulp.dest(paths.build + "/images/"));
});

gulp.task('app', function () {
    return gulp.src(paths.src.app)
        .pipe(angularFileSort())
        .pipe(concat(paths.filenames.app))
        .pipe(gulpif(release, uglify()))
        .pipe(gulp.dest(paths.build));
});

gulp.task('templates', function () {
    return gulp.src(paths.src.template)
        .pipe(gulpif(release, minifyhtml({
            empty: true,
            spare: true,
            quotes: true
        })))
        .pipe(html2js({
            moduleName: paths.templatemodule,
            declareModule: false
        }))
        .pipe(concat(paths.filenames.template))
        .pipe(gulpif(release, uglify()))
        .pipe(header("angular.module('<%= moduleName %>',[]);\n",{moduleName: paths.templatemodule}))
        .pipe(gulp.dest(paths.build));
});

gulp.task('vendor', function () {
    return gulp.src(mainBowerFiles())
        .pipe(concat(paths.filenames.vendor))
        .pipe(gulpif(release, uglify()))
        .pipe(gulp.dest(paths.build))
        .on('error', gutil.log);
});

gulp.task('css', function () {
    return gulp.src(paths.src.css)
        .pipe(less())
        .pipe(gulpif(release,cssmin()))
        .pipe(rename(paths.filenames.css))
        .pipe(gulp.dest(paths.build));
});

gulp.task('watch:fonts', function () {
    watchFilesAndStartTask(paths.src.fonts, 'fonts');
});

gulp.task('watch:images', function () {
    watchFilesAndStartTask(paths.src.img, 'images');
});

gulp.task('watch:app', function () {
    watchFilesAndStartTask(paths.src.app, 'app');
});

gulp.task('watch:templates', function () {
    watchFilesAndStartTask(paths.src.template, 'templates');
});

gulp.task('watch:vendor', function () {
    watchFilesAndStartTask('bower_components/**/*.js', 'vendor');
});

gulp.task('watch:css', function () {
    watchFilesAndStartTask('src/assets/**/*.less', 'css');
});

gulp.task('watch:index', function () {
    watchFilesAndStartTask(paths.src.index, 'index');
});