const gulp = require('gulp'),
      sass = require('gulp-sass'),
	  browserSync = require('browser-sync').create();

const scss = () => {
    return gulp.src('blocks/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(function (file) {
            return file.base;
        }))
        .pipe(browserSync.stream());
};
exports.scss = scss;

const serve = () => {
	browserSync.init({
        server: "./"
    });

    gulp.watch('blocks/**/*.scss', gulp.series(scss));
};
exports.serve = serve;
exports.default = serve;
