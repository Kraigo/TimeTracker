const gulp = require('gulp');
// const sass = require('gulp-sass');
// const uglify = require('gulp-uglify');
// const concat = require('gulp-concat');
// const autoprefixer = require('gulp-autoprefixer');
// const imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync').create();



gulp.task('css', function() {
    // gulp.src('styles/main.scss')
    //     .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    //     .pipe(autoprefixer({
    //         browsers: ['last 3 versions'],
    //         cascade: false
    //     }))
    //     .pipe(gulp.dest('styles/'))
    //     .pipe(browserSync.stream())
});



// gulp.task('js', function() {
//     gulp.src('scripts/*.js')
//         .pipe(concat('bundle.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('scripts/'))
// });



// gulp.task('img', function() {
//     gulp.src('images/*/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('images/dest'))
// });



gulp.task('watch', ['css'], function() {
    browserSync.init({
        server: "./"
    });

    // gulp.watch('styles/*.scss', ['css']);
    gulp.watch("*.html").on('change', browserSync.reload);

});

gulp.task('default', ['css', 'js', 'img'])