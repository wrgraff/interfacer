var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    include = require("gulp-include");

gulp.task('sass', function () {
    return gulp.src('sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
gulp.task('html', function () {
    return gulp.src('*.html').pipe(livereload());
});
gulp.task('js', function() {
    return gulp.src('js/app.js')
        .pipe(include())
        .pipe(uglify())
        .on('error', console.log)
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('sass:watch', function () {
    livereload.listen();
    gulp.watch('sass/**/*.scss', gulp.series('sass'));
    gulp.watch('**/*.html', gulp.series('html'));
    gulp.watch('js/**/*.js', gulp.series('js'));
});
