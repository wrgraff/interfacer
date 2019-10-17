var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify-es').default,
    concat = require('gulp-concat'),
    include = require("gulp-include"),
    nunjucks = require('gulp-nunjucks-render'),
	prettier = require('gulp-prettier'),
	browserSync = require('browser-sync').create();

gulp.task('scss', function () {
    return gulp.src('src/scss/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});
gulp.task('html', function () {
    return gulp.src('**/*.html').pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src('src/js/app.js')
        .pipe(include())
        // .pipe(uglify())
        .on('error', console.log)
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

gulp.task('docs', () =>
    gulp.src('src/njk/pages/**/*.njk')
        .pipe(nunjucks({
            path: ['src/njk/layouts']
        }))
        .pipe(prettier({ proseWrap: 'never', printWidth: 800, tabWidth: 4, useTabs: true }))
        .pipe(gulp.dest('docs'))
);

gulp.task('default', function () {
	browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/scss/**/*', gulp.series('scss')).on('change', browserSync.reload);
    gulp.watch('**/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', gulp.series('js')).on('change', browserSync.reload);
    gulp.watch('src/njk/**/*.njk', gulp.series('docs'));
});
