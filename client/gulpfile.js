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

var debug = argv.debug;

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
        "img": ['src/*.png', 'src/*.jpg'],
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

function watchFilesAndStartTask(files, task) {
    watch({
        glob: files,
        emit: 'one',
        emitOnGlob: false
    }, function () {
        gulp.start(task);
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
    gulp.start('fonts:watch', 'images:watch', 'app:watch', 'templates:watch', 'vendor:watch', 'css:watch', 'index:watch');
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

gulp.task('index:watch', function () {
    watchFilesAndStartTask(paths.src.index, 'index');
});

gulp.task('fonts', function () {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('fonts:watch', function () {
    watchFilesAndStartTask(paths.src.fonts, 'fonts');
});

gulp.task('images', function () {
    return gulp.src(paths.src.img)
        //.pipe(rename(paths.filenames.img))
        .pipe(gulp.dest(paths.build));
});

gulp.task('images:watch', function () {
    watchFilesAndStartTask(paths.src.img, 'images');
});

gulp.task('app', function () {
    return gulp.src(paths.src.app).pipe(angularFileSort())
        .pipe(concat(paths.filenames.app))
        .pipe(gulpif(!debug, uglify()))
        .pipe(gulp.dest(paths.build));
});

gulp.task('app:watch', function () {
    watchFilesAndStartTask(paths.src.app, 'app');
});

gulp.task('templates:watch', function () {
    watchFilesAndStartTask(paths.src.template, 'templates');
});

gulp.task('templates', function () {
    return gulp.src(paths.src.template)
        .pipe(gulpif(!debug, minifyhtml({
            empty: true,
            spare: true,
            quotes: true
        })))
        .pipe(html2js({
            moduleName: paths.templatemodule
        }))
        .pipe(concat(paths.filenames.template))
        .pipe(gulpif(!debug, uglify()))
        .pipe(gulp.dest(paths.build));
});

gulp.task('vendor', function () {
    return gulp.src(mainBowerFiles())
        .pipe(concat(paths.filenames.vendor))
        .pipe(gulpif(!debug, uglify()))
        .pipe(gulp.dest(paths.build))
        .on('error', gutil.log);
});

gulp.task('vendor:watch', function () {
    watchFilesAndStartTask('bower_components/**/*.js', 'vendor');
});

gulp.task('css', function () {
    return gulp.src(paths.src.css)
        .pipe(less())
        .pipe(rename(paths.filenames.css))
        .pipe(gulp.dest(paths.build));
});

gulp.task('css:watch', function () {
    watchFilesAndStartTask('src/assets/**/*.less', 'css');
});

