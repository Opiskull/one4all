var gulp = require('gulp'), nodemon = require('gulp-nodemon');

gulp.task('default', function () {
    nodemon({script: 'server.js', ext: "js json", ignore: ['node_modules/*']})
        .on('restart', function () {
            console.log('restarted!');
        });
});