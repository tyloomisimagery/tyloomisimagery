var gulp = require('gulp');
var browserSync = require('browser-sync'); 

// Styles
var uglify = require('gulp-uglify'); 
var concat = require('gulp-concat'); 
var minify = require('gulp-clean-css'); 
var autoprefixer = require('gulp-autoprefixer'); 
var sass = require('gulp-sass'); 
var sourcemaps = require('gulp-sourcemaps');

// Image Compression
var imagemin = require('gulp-imagemin'); 
var imageminPngquant = require('imagemin-pngquant'); 
var imageminJpgRecompress = require('imagemin-jpeg-recompress'); 

// Paths
var CSS_PATH = 'css'; 
var SCSS_PATH = 'scss/**/*.scss'; 
var IMAGES_UNCOMPRESSED_PATH = 'images/uncompressed'; 
var IMAGES_COMPRESSED_PATH = 'images/compressed'; 


// === TASKS ===

// SCSS
gulp.task('styles', function() {
    return gulp.src('scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(CSS_PATH))
        .pipe(browserSync.stream());         
});

// Images
gulp.task('images', function() {
    return gulp.src(IMAGES_UNCOMPRESSED_PATH)
        .pipe(imagemin([
            imagemin.gifsicle(), 
            imagemin.jpegtran(), 
            imagemin.optipng(), 
            imagemin.svgo(), 
            imageminPngquant(), 
            imageminJpgRecompress()
        ]))
        .pipe(gulp.dest(IMAGES_COMPRESSED_PATH)); 
});

// Watch File Changes
gulp.task('watch', function() {
    browserSync.init({
        server: './'
    }); 

    gulp.watch(SCSS_PATH, ['styles']); 
    gulp.watch('*.html').on('change', browserSync.reload); 
});

gulp.task('default', ['styles', 'images', 'watch']); 