var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    include = require("gulp-include"),
    nunjucks = require('gulp-nunjucks-render'),
    prettify = require('gulp-html-prettify');

gulp.task('scss', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(livereload());
});
gulp.task('html', function () {
    return gulp.src('**/*.html').pipe(livereload());
});
gulp.task('js', function() {
    return gulp.src('src/js/app.js')
        .pipe(include())
        // .pipe(uglify())
        .on('error', console.log)
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('docs', () =>
    gulp.src('src/njk/pages/**/*.njk')
        .pipe(nunjucks({
            path: ['src/njk/layouts']
        }))
        .pipe(prettify({indent_char: ' ', indent_size: 4}))
        .pipe(gulp.dest('docs'))
);

gulp.task('default', function () {
    livereload.listen();
    gulp.watch('src/scss/**/*', gulp.series('scss'));
    // gulp.watch('**/*.html', gulp.series('html'));
    gulp.watch('src/js/**/*.js', gulp.series('js'));
    gulp.watch('src/njk/**/*.njk', gulp.series('docs'));
});
