const del = require('del');
const gulp = require('gulp');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const jsImport = require('gulp-js-import-moo');
// const postcss = require('gulp-postcss');
// const atImport = require('postcss-import');
const header = require('gulp-header');
const dateFormat = require('dateformat');
const pkg = require('./package.json');
const stripDebug = require('gulp-strip-debug');
const usemin = require('gulp-usemin');

// const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
// const imagemin = require('gulp-imagemin');
const rename = require("gulp-rename");
const clean = require('gulp-clean');
const cache = require('gulp-cache');
const pug = require('gulp-pug');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browsersync = require('browser-sync').create();
// const reload = browsersync.reload;
const stylus = require('gulp-stylus');
const colors = require('colors');

colors.setTheme({
    silly: 'rainbow',
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'green',
    data: 'grey',
    help: 'cyan',
    warn: 'yellow',
    debug: 'blue',
    error: 'red'
});

const getTime = (formats) => {
    const now = new Date();
    return dateFormat(now, formats);
};
const now = getTime("yyyy-mm-dd HH:MM:ss");

// const banner = `/**
//  * Copyright (c) 2017 - ${getTime("yyyy")} www.xiongan.gov.cn All Rights Reserved.
//  * Project ${pkg.name} v${pkg.version}
//  * @time ${now}
//  */
// `;
// const bannerCSS_charset_utf_8 = `@charset "utf-8";
// ${banner}`;

// gulp.task('clean-dist-bundle', function (cb) {
//     del([
//         'dist/bundle/',
//         'dist/s4/',
//         // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
//         // 'dist/mobile/**/*',
//         // 我们不希望删掉这个文件，所以我们取反这个匹配模式
//         // '!dist/mobile/deploy.json'
//     ], cb);
// });

gulp.task('browsersync', function () {
    browsersync
        .init([
            '*.html',
            'src/**/*',
            // 'js/*.js',
            // 'bundle/*.css',
            // 'bundle/*.js',
            // 'bundle/*.png',
            // 'bundle/*.jpg',
            // 'bundle/*.gif',
            // 'images/*.png',
            // 'images/*.jpg',
            // 'images/*.gif',
            // 'pug/*.pug',
            // 'pug/views/*.pug',
            // // 'scss/*.scss',
            // // 'scss/include/*.scss',
            // 'tools/helper-grabber/*.js',
            // 'tools/helper-grabber/*.css',
            // 'tools/helper-grabber/*.html',
            // 'tools/helper-grabber/*.styl',
            // 'inc/*.html',
            // 'css/*.*.css',
        ], {
            server: {
                baseDir: './',
                https: false,
            },
            notify: true,
        });
});

// // pug
// gulp.task('pug', function () {
//     gulp
//         .src('pug/*.pug')
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest('./'));
// });

// // styl
// gulp.task('styl', function () {
//     gulp
//         .src(stylCompiles)
//         .pipe(plumber({
//             errorHandler: notify.onError('Error: <%= error.message %>')
//         }))
//         .pipe(stylus())
//         .pipe(gulp.dest('bundle'));
// });

// watch
gulp.task('autowatch', function () {
    gulp.watch('*.html', function () {
        browsersync.reload();
    });
    gulp.watch('local-index.js', function () {
        browsersync.reload();
    });
    gulp.watch('index.js', function () {
        browsersync.reload();
    });
});

// gulp run
gulp.task('default', [
    // 'autowatch',
    'browsersync'
]);

// gulp.task('copy-src', function () {
//     return gulp.src('src/**/*')
//         .pipe(gulp.dest('dist'));
// });

// gulp.copy=function(src,dest){
//     return gulp.src(src, {base:"."})
//         .pipe(gulp.dest(dest));
// };

// gulp.task('build', [
//     // `copy-src`,
// ]);
