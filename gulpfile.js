var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserslist= require('browserslist');
var autoprefixer= require('gulp-autoprefixer');
var pug         = require('gulp-pug');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require("gulp-rename");
var imagemin    = require('gulp-imagemin');
var plumber     = require('gulp-plumber');
var replace     = require('gulp-replace');
var browserSync = require('browser-sync').create();

sass.compiler   = require('node-sass');
  
function style(){
    return gulp.src('./source/sass/*.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream())
}

function templates(){
    return gulp.src('./source/layouts/*.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./dist'))
}

function images() {
    return gulp
        .src('source/images/*')
        // .pipe(newer('./dist/source/images/*'))
        .pipe(
        //     imagemin([
        //     imagemin.gifsicle({ interlaced: true }),
        //     imagemin.jpegtran({ progressive: true }),
        //     imagemin.optipng({ optimizationLevel: 5 }),
        //     imagemin.svgo({
        //         plugins: [
        //             {
        //                 removeViewBox: false,
        //                 collapseGroups: true
        //             }
        //         ]
        //     })
        // ])
        imagemin()
    )
    .pipe(gulp.dest('dist/img'));
}

function javascript(){
    return gulp.src([
        './source/javascript/javascript.js'
    ])
        .pipe(uglify())
        .pipe(rename('app.js'))
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.stream())
}
function plugins(){
    return gulp.src([
        './source/javascript/plugins/*.js'
    ])
        .pipe(concat('plugins.js') )
        .pipe(uglify({
        compress:{
            drop_console:true
        }
    }))
        .pipe(gulp.dest('dist/js/plugins'))
        .pipe(browserSync.stream())
}

function watchFiles() {
    gulp.watch('source/sass/**/*.scss', style);
    gulp.watch('source/layouts/**/*.pug', templates);
    gulp.watch('source/images/*', images);
    gulp.watch('source/javascript/**/*.js', javascript);
    gulp.watch('source/javascript/plugins/*.js', plugins);
    gulp.watch('dist/**/*.html').on('change', browserSync.reload);
}

function browser(){
    browserSync.init({
        server: './dist/'
    })
}

const watch = gulp.series(style, templates, images, javascript, plugins, gulp.parallel(watchFiles, browser));
exports.default = watch;