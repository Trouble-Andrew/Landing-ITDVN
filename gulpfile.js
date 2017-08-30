var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var spritesmith = require('gulp.spritesmith');
var rimraf = require('rimraf');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

<!-- Server  -->

gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change', browserSync.reload);
});


<!-- Pug compile -->

gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/templates/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});


<!-- Styles compile -->

gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('build/css'));
});


<!-- JS -->

gulp.task('js', function () {
    return gulp.src(['source/js/init.js', 'source/js/validation.js', 'source/js/form.js', 'source/js/navigation.js', 'source/js/main.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});


<!-- Sprites -->

gulp.task('sprite', function (cb) {
    var spriteData = gulp.src('source/img/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../img/sprite.png',
        cssName: 'sprite.scss'
    }));
    spriteData.img.pipe(gulp.dest('build/img'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'))
    cb();
});


<!-- Delete -->

gulp.task('clean', function (cb) {
    return rimraf('build', cb);
});


<!-- Copy fonts -->

gulp.task('copy:fonts', function () {
    return gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});


<!-- Copy img -->

gulp.task('copy:img', function () {
    return gulp.src('./source/img/**/*.*')
        .pipe(gulp.dest('build/img'));
});


<!-- Copy -->

gulp.task('copy', gulp.parallel('copy:fonts', 'copy:img'));


<!-- Watchers -->

gulp.task('watch', function () {
    gulp.watch('source/templates/**/*.pug', gulp.series('templates:compile'))
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'))
    gulp.watch('source/js/**/*.js', gulp.series('js'));
});
gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'js', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
))
