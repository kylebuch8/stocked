var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var server = require('tiny-lr')();
var refresh = require('gulp-livereload');
var less = require('gulp-less');
var lrPort = 35729;

gulp.task('less', () => {
    return gulp.src('./client/less/main.less')
        .pipe(less())
        .pipe(gulp.dest('./client/styles'));
});

gulp.task('styles', () => {
    gulp.src('./client/styles/**/*')
        .pipe(refresh(server));
});

gulp.task('lr', () => {
    server.listen(lrPort, (err) => {
        if (err) {
            return console.error(err);
        }
    });
});

gulp.task('default', ['lr'], () => {
    nodemon({
        script: './index.js'
    });

    gulp.watch(['./client/less/**/*.less'], ['less']);
    gulp.watch(['./client/styles/**/*.css'], ['styles']);
});
