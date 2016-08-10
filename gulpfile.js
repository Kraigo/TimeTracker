'use strict';

const gulp = require('gulp');
const react = require('gulp-react');
const babel = require('gulp-babel');

gulp.task('jsx', () => {
    return gulp.src('./public/scripts/*.jsx')
        .pipe(react())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/scripts'));
});

gulp.task('watch', () => {
    gulp.watch('./public/scripts/*.jsx', ['jsx']);
});