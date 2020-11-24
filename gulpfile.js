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



// 定义需要编译的 js 和 styl

const {
    jsCompiles,
    stylCompiles,
    incStyl,
    incPug,
} = {
    jsCompiles: [
        'js/s4-index.js',
        'js/homepage.js',
        'js/homepage-index.js',
        'js/pages.js',
        'js/homepage-config.js',
        'js/qndj.js',
        'js/long-pic.js',
        'js/content.js',
        'js/ej-footer.max.js',
        'js/ej-top.js',
        'js/zxgb.js',
        'js/iframe_news1.js',
        'js/xat-homepage.js',
        // 'js/ghgy.js',
        'js/homepage-iframe.js',
        'js/wx-share.js',
        'js/service-page.js',
        'js/homepage-config.js',
        'js/homepage-bf.js',
    ],
    stylCompiles: [
        'styl/s4-index.styl',
        'styl/homepage.styl',
        'styl/pages.styl',
        'styl/mobile-blueprint.styl',
        'styl/qndj.styl',
        'styl/message-board.styl',
        'styl/long-pic.styl',
        'styl/common.styl',
        'styl/rzjg.styl',
        'styl/iframe_news1.styl',
        'styl/content.styl',
        'styl/xat-homepage.styl',
        'styl/homepage-iframe.styl',
        'styl/lhr_xl_v1.max.styl',
        'styl/ej-topfooter-v1.max.styl',
        'styl/xa-yw-er.max.styl',
        'styl/accordion2.styl',
        'styl/service-page.styl',
        // 'styl/ghgy.styl',
        'styl/homepage-bf.styl',
    ],
    incStyl: [
        'styl/inc/*.styl'
    ],
    incPug: [
        'pug/inc/*.pug'
    ],
};


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

const banner = `/**
 * Copyright (c) 2017 - ${getTime("yyyy")} www.xiongan.gov.cn All Rights Reserved.
 * Project ${pkg.name} v${pkg.version}
 * @time ${now}
 */
`;
const bannerCSS_charset_utf_8 = `@charset "utf-8";
${banner}`;

gulp.task('usemin: s4', function () {
    gulp
        .src([
            // './index.html',
            // './s1.html',
            // './s2.html',
            // './s3.html',
            './s4.html',
            // './s5.html',
            // './s6.html',
            // './content.html',
            './pages.html',
            // './dsj.html',
        ])
        .pipe(usemin({
            // js: [],
            // css: [],
            // css: [rev],
            // html: [function () { return htmlmin({ collapseWhitespace: true }); }],
            // js: [uglify, rev],
            // inlinejs: [uglify],
            // inlinecss: [cleanCss, 'concat']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('clean-dist-bundle', function (cb) {
    del([
        'dist/bundle/',
        'dist/s4/',
        // 这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
        // 'dist/mobile/**/*',
        // 我们不希望删掉这个文件，所以我们取反这个匹配模式
        // '!dist/mobile/deploy.json'
    ], cb);
});

// const inc_pug = [
//     'inc/top.pug',
// ];

gulp.task('browsersync', function () {
    const baseFiles = [
        '*.htm',
        '*.html',
        'css/*.css',
        'js/*.js',
        'bundle/*.css',
        'bundle/*.js',
        'bundle/*.png',
        'bundle/*.jpg',
        'bundle/*.gif',
        'images/*.png',
        'images/*.jpg',
        'images/*.gif',
        'pug/*.pug',
        'pug/views/*.pug',
        // 'scss/*.scss',
        // 'scss/include/*.scss',
        'tools/helper-grabber/*.js',
        'tools/helper-grabber/*.css',
        'tools/helper-grabber/*.html',
        'tools/helper-grabber/*.styl',
        'inc/*.html',
        'css/*.*.css',
    ];
    const _files = baseFiles.concat(jsCompiles, stylCompiles, incStyl, incPug); //, inc_pug
    browsersync
        .init(_files, {
            server: {
                baseDir: './'
            },
            notify: true,
        });
});

// pug
gulp.task('pug', function () {
    gulp
        .src('pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-xat-homepage', function () {
    gulp
        .src('pug/xat-homepage.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-cut', function () {
    gulp
        .src('pug/cut.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('pug-inc', function () {
    gulp
        .src(incPug)
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('inc'));
});

// gulp.task('pug-ghgy', function () {
//     gulp
//         .src('pug/ghgy.pug')
//         .pipe(plumber())
//         .pipe(pug({
//             pretty: true
//         }))
//         .pipe(gulp.dest('./'));
// });

// js Compile
let jsCompileTasks = [];

jsCompiles.map((item, index) => {
    const taskTisp = `[${index < 10 ? `0${index}` : index}] jsImport > babel:`;
    const taskName = taskTisp + item;
    jsCompileTasks.push(taskName); //.info + ` ${item}`.data;
    console.log('jsCompileTasks:'.warn, taskTisp.info, item.data);
    gulp.task(taskName, () => {
        gulp
            .src(item)
            .pipe(jsImport({
                hideConsole: 0
            }))
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            })) //错误处理
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('bundle'));
    });
});

gulp.task('jsImport + babel: js/homepage-index.js', function () {
    gulp
        .src([
            'js/homepage-index.js',
        ])
        .pipe(jsImport()) // jsImport
        .pipe(gulp.dest('import'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('bundle'));
});

gulp.task('styl', function () {
    gulp
        .src(stylCompiles)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('bundle'));
});

gulp.task('styl-inc', function () {
    gulp
        .src(incStyl)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('bundle/inc')); // 这里结尾不要加 /
});

gulp.task('ad-js', function () {
    gulp
        .src([
            'ad/jkydp-video.js',
        ])
        .pipe(rename('jkydp-video.min.js'))
        .pipe(jsImport()) // jsImport
        .pipe(gulp.dest('import'))
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        })) //错误处理
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('ad'));
});

gulp.task('ad-styl', function () {
    gulp
        .src([
            'ad/jkydp-video.styl',
        ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(rename('jkydp-video.min.css'))
        .pipe(gulp.dest('ad'));
});

gulp.task('styl: iframe_news1_pages.styl', function () {
    gulp
        .src([
            'styl/iframe_news1_pages.styl',
        ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(rename('bundle/iframe_news1_pages.min.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('styl-tools-helper-grabber', function () {
    gulp
        .src([
            'tools/helper-grabber/helper-grabber.styl',
        ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(rename('helper-grabber.css'))
        .pipe(gulp.dest('tools/helper-grabber'));
});

// scss 请尽可能不要使用
// gulp.task('scss', function () {
//     gulp
//         .src([
//             'scss/*.scss',
//         ])
//         .pipe(plumber({
//             errorHandler: notify.onError('Error: <%= error.message %>')
//         }))
//         // .pipe(sourcemaps.init())
//         .pipe(sass({
//             outputStyle: 'expanded',
//             precision: 10
//         }))
//         // .pipe(autoprefixer({
//         //     browsers: ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 4.1', 'IE 9', 'IE 10']
//         // }))
//         // .pipe(autoprefixer({
//         //     browsers: ["chrome 30", "Firefox < 20", "ios_saf 8", "safari 8", 'Android >= 2.1', 'IE 9', 'IE 10']
//         // }))
//         // .pipe(sourcemaps.write('./maps'))
//         .pipe(gulp.dest('bundle'))
//     // .pipe(reload({ stream: true }));
// });

// watch
gulp.task('autowatch', function () {
    // gulp.watch([
    //     'pug/cut.pug',
    //     'pug/inc/*.pug'
    // ], [
    //     'pug-cut',
    //     'pug-inc'
    // ]);
    // // gulp.watch('pug/*.pug', ['pug-ghgy']);

    // gulp.watch('pug/*.pug', [
    //     'pug-xat-homepage',
    //     // 'pug-ghgy'
    // ]);

    // gulp.watch('js/*.js', jsCompileTasks);
    // gulp.watch('styl/*.styl', ['styl']);
    // gulp.watch(incStyl, ['styl-inc']);

    // gulp.watch('tools/helper-grabber/*.styl', ['styl-tools-helper-grabber']);

    // gulp.watch('scss/*.scss', ['scss']);
    // gulp.watch('scss/include/*.scss', ['scss']);

    gulp.watch('*.html');

});



gulp.task('autowatch-css-common', function () {
    const _src = 'css/*.styl';

    gulp.watch(_src, function () {
        gulp
            .src(_src)
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            }))
            .pipe(stylus())
            .pipe(gulp.dest('css'));
    });
});


// watch
gulp.task('autowatch-ad', function () {
    gulp.watch('ad/*.js', ['ad-js']);
    gulp.watch('ad/*.styl', ['ad-styl']);
});

// gulp.task('autowatch-iframe_news1_pages', function () {
//     // gulp.watch('ad/*.js', ['ad-js']);
//     gulp.watch('styl/iframe_news1_pages.styl', ['styl: iframe_news1_pages.styl']);
// });

// built
gulp.task('built css: s4', function () {
    gulp
        .src('bundle/s4-index.css')
        .pipe(rename('s4-index.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        .pipe(gulp.dest('bundle'));
});

// 2018-07-01 xa-yw-er.css
gulp.task('built xa-yw-er.css', function () {
    gulp
        .src('bundle/xa-yw-er.max.css')
        .pipe(rename('xa-yw-er.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8 + '/* src: http://www.xiongan.gov.cn/news/css/xa-yw-er.css */\n'))
        .pipe(gulp.dest('bundle'));
});

// 2018-06-29
// ej-topfooter-v1.css
gulp.task('built ej-topfooter-v1.css', function () {
    gulp
        .src('bundle/ej-topfooter-v1.max.css')
        .pipe(rename('ej-topfooter-v1.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8 + '/* src: http://www.xiongan.gov.cn/news/css/ej-topfooter-v1.css */\n'))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built_lhr_xl_v1_css', function () {
    gulp
        .src('bundle/lhr_xl_v1.max.css')
        .pipe(rename('lhr_xl_v1.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8 + '/* src: http://www.xiongan.gov.cn/css/lhr_xl_v1.css */\n'))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});


// gulp built_css/common.css
gulp.task('built_css/common.css', function () {
    gulp
        .src('css/common.max.css')
        .pipe(rename('common.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('css'))
        .pipe(gulp.dest('bundle')); // 因为历史遗留问题，同时需要编译到 /bundle/ 一个文件，防止出现不同步情况

});



// 2018-04-09 17:22 add built_content_css
gulp.task('built_content_css', function () {
    gulp
        .src('bundle/content.css')
        .pipe(rename('content.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: s4', function () {
    gulp
        .src([
            'bundle/swiper.min.js',
            // 'bundle/swiper.animate.min.js',
            // 'bundle/jquery.slimscroll.min.js',
            'bundle/jquery.jplayer.min.js',
            'bundle/jplayer.playlist.js',
            'bundle/jquery.qrcode.min.js',
            'bundle/s4-index.js',
        ])
        .pipe(concat('s4-index.all.js')) //合并后的文件名
        .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('s4-index.all.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// 新增添加单独 js 编译的方法
// --------------------------------- config START ---------------------------------
// 控制开启模块
const { isPug, isJs, isStyl } = {
    // isPug: 1,
    isJs: 1,
    isStyl: 1,
};

// 编译目标
const taskNameArray = [
    'print', // index.css, index.js | build: index.min.css, index.min.js,
];
// --------------------------------- config END ---------------------------------

let TASK_js = [];
let TASK_stylus = [];
let TASK_build_js = [];
let TASK_build_css = [];

const tipFn = (i, type) => {
    // return `[${i}] type: '${type}' -->`;
    return `[${i}] -->`;
};

const jsTask = ({ file, name, type, index } = {
    file: 'js/',
    name: 'index',
    type: '.js',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;

    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.js': js/index.js

    // TASK_js
    TASK_js.push(taskName);
    console.log('[gulp TASK]'.silly, 'js'.warn, tips.info, src.data);

    gulp.task(taskName, () => {
        gulp
            .src(src)
            .pipe(jsImport())
            .pipe(gulp.dest('import'))
            .pipe(plumber({
                errorHandler: notify.onError('Error: <%= error.message %>')
            }))
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(gulp.dest('bundle'));
    });

    // bulid js
    const BUNDLE_src = 'bundle/' + name + type;
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.js
    TASK_build_js.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'bulid_js'.warn, tips.info, BUNDLE_src.data);

    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(BUNDLE_src)
            .pipe(stripDebug()) // 删除 console
            .pipe(rename(`${name}.min.js`))
            .pipe(uglify())
            .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

const stylTask = ({ file, name, type, index } = {
    file: 'styl/',
    name: 'index',
    type: '.styl',
    index: 0,
}) => {
    const i = index < 10 ? `0${index}` : index;
    const tips = tipFn(i, type);
    const src = file + name + type;
    const taskName = tips + src; // task [00] '.styl': styl/index.styl

    // 生产批量的 src
    TASK_stylus.push(src);
    console.log('[gulp TASK]'.silly, 'stylus'.warn, tips.info, src.data);


    // bulid css
    const BUNDLE_src = 'bundle/' + name + '.css';
    const BUNDLE_taskName = tips + BUNDLE_src; // task [00] '.js': bundle/index.css
    // TASK_build_css
    TASK_build_css.push(BUNDLE_taskName);
    console.log('[gulp TASK]'.silly, 'build_css'.warn, tips.info, BUNDLE_src.data);

    // build task
    gulp.task(BUNDLE_taskName, function () {
        gulp
            .src(`bundle/${name}.css`)
            .pipe(rename(`${name}.min.css`))
            .pipe(cleancss({
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(header(bannerCSS_charset_utf_8))
            // .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

// set tasks
taskNameArray.map((item, index) => {
    if (isJs) {
        jsTask({
            file: 'js/',
            name: item,
            type: '.js',
            index: index,
        });
    }
    if (isStyl) {
        stylTask({
            file: 'styl/',
            name: item,
            type: '.styl',
            index: index,
        });
    }
    // if (isPug) {
    //     useminTask({
    //         file: './',
    //         name: item,
    //         type: '.html',
    //         index: index,
    //     });
    // }
});

gulp.task('styl-ex', function () {
    gulp
        .src(TASK_stylus)
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(stylus())
        .pipe(gulp.dest('bundle'));
});

// watch
gulp.task('autowatch-ex', function () {
    console.log('[gulp autowatch]'.rainbow);
    console.log(' --------------------------------------'.gray);
    // console.log('      pug:'.warn, isPug ? 'true'.info : 'false'.error);
    console.log('       js:'.warn, isJs ? 'true'.info : 'false'.error);
    console.log('     styl:'.warn, isStyl ? 'true'.info : 'false'.error);
    console.log(' --------------------------------------'.gray);

    // isPug && gulp.watch('pug/*.pug', ['pug']);
    isJs && gulp.watch('js/*.js', TASK_js);
    isStyl && gulp.watch('styl/*.styl', ['styl-ex']);

    if (!isPug && !isJs && !isStyl) {
        console.log('[gulp autowatch]'.rainbow, 'is off'.info);
        console.log(' --------------------------------------'.gray);
        console.log('    Only'.info, '`browsersync`'.debug, 'now!'.info);
        console.log(' --------------------------------------'.gray);
    }
});

gulp.task('build-TASK_build_js', TASK_build_js);
gulp.task('build-TASK_build_css', TASK_build_css);
// gulp.task('build-TASK_usemin', TASK_usemin);

// build-ex
gulp.task('build-ex', [
    'build-TASK_build_js',
    'build-TASK_build_css',
    // 'build-TASK_usemin',
]);

// gulp run
gulp.task('default', [
    'autowatch',
    'autowatch-css-common',
    // 'autowatch-ad',
    // 'autowatch-ex',
    // 'autowatch-iframe_news1_pages',
    'browsersync'
]);

// built
gulp.task('built js: homepage.js', function () {
    gulp
        .src([
            'bundle/homepage.js',
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('homepage.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// homepage-config.js
gulp.task('built js: homepage-config.js', function () {
    gulp
        .src([
            'bundle/homepage-config.js',
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('homepage-config.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: homepage-index.js', function () {
    gulp
        .src([
            // 'bundle/index.js',
            'bundle/homepage-index.js'
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('homepage-index.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built css: homepage.css', function () {
    gulp
        .src('bundle/homepage.css')
        .pipe(rename('homepage.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built css: homepage-index.css', function () {
    gulp
        .src('bundle/homepage-index.css')
        .pipe(rename('homepage-index.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// pages
gulp.task('built css: pages.css', function () {
    gulp
        .src('bundle/pages.css')
        .pipe(rename('pages.min.css'))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built js: pages.js', function () {
    gulp
        .src([
            // 'bundle/index.js',
            'bundle/pages.js'
        ])
        // .pipe(concat('homepage.all.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('pages.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// build-s4
gulp.task('s4', [
    'built css: s4',
    'built js: s4',
    'usemin: s4',
]);

// build-homepage
gulp.task('homepage', [
    'built js: homepage.js',
    'built css: homepage.css',
    'built js: homepage-index.js',
    'built css: homepage-index.css',
]);

// build-homepage
gulp.task('pages', [
    'built js: pages.js',
    'built css: pages.css',
]);

const buildTackCB = (key) => {
    gulp.task(`built css: ${key}.css`, function () {
        gulp
            .src(`bundle/${key}.css`)
            .pipe(rename(`${key}.min.css`))
            .pipe(cleancss({
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(header(bannerCSS_charset_utf_8))
            // .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });

    gulp.task(`built js: ${key}.js`, function () {
        gulp
            .src([
                `bundle/${key}.js`
            ])
            .pipe(stripDebug()) // 删除 console
            .pipe(rename(`${key}.min.js`))
            // .pipe(sourcemaps.init())
            .pipe(uglify())
            // .pipe(sourcemaps.write('../maps'))
            .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });

    // gulp.task(`usemin: ${key}`, function () {
    //     gulp
    //         .src([`./${key}.html`])
    //         .pipe(usemin({}))
    //         .pipe(gulp.dest('dist'));
    // });

    // gulp.task(`clean-dist: ${key}`, function (cb) {
    //     del([`dist/http*/`], cb);
    // });
};

buildTackCB('long-pic');
buildTackCB('xat-homepage');
buildTackCB('service-page');

gulp.task('built_service_page', [
    'built js: service-page.js',
    'built css: service-page.css',
]);

// build long-pic
gulp.task('xat-homepage', [
    `built css: xat-homepage.css`,
    'built js: xat-homepage.js',
]);


gulp.task('built js: long-pic.all.min.js', function () {
    gulp
        .src([
            'bundle/TweenLite.min.js',
            'bundle/Draggable.min.js',
            'bundle/ThrowPropsPlugin.min.js',
            'bundle/CSSPlugin.min.js',
            'bundle/long-pic.js',
        ])
        .pipe(concat('long-pic.all.js')) //合并后的文件名
        .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('long-pic.all.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

// build long-pic
gulp.task('long-pic', [
    `built css: long-pic.css`,
    // `built js: long-pic.js`,
    'built js: long-pic.all.min.js',
    // `usemin: long-pic`,
    // `clean-dist: qndj`
]);

buildTackCB('qndj');

// build qndj
gulp.task('qndj', [
    // `built css: qndj.css`,
    `built js: qndj.js`,
    // `usemin: qndj`,
    // `clean-dist: qndj`
]);

gulp.task('built_content_js', function () {
    gulp
        .src([
            'bundle/content.js',
        ])
        // .pipe(concat('content.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('content.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built_wx-share', function () {
    gulp
        .src([
            'bundle/wx-share.js',
        ])
        // .pipe(concat('content.js')) //合并后的文件名
        // .pipe(gulp.dest('bundle'))
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('wx-share.min.js'))
        // .pipe(sourcemaps.init())
        .pipe(uglify({
            // mangle: false,//类型：Boolean 默认：true 是否修改变量名
            // mangle: { except: ['\u4E2D\u56FD\u96C4\u5B89\u5B98\u7F51'] }//排除混淆关键字
        }))
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built_ej_footer_max_js', function () {
    gulp
        .src([
            'bundle/ej-footer.max.js',
        ])
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('ej-footer.js'))
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});

gulp.task('built_s4_index_js', function () {
    gulp
        .src([
            'bundle/s4-index.js',
        ])
        .pipe(stripDebug()) // 删除 console
        .pipe(rename('s4-index.js'))
        .pipe(uglify())
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});


const bulidCSS = (key) => {
    gulp.task(`built_css_${key}`, function () {
        gulp
            .src(`bundle/${key}.css`)
            .pipe(rename(`${key}.min.css`))
            .pipe(cleancss({
                advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
                compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
                keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
                keepSpecialComments: '*'
                //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
            }))
            .pipe(header(bannerCSS_charset_utf_8))
            // .pipe(header(banner))
            .pipe(gulp.dest('bundle'));
    });
};

// built_css_rzjg
bulidCSS('rzjg');


// iframe_news1
const key = 'iframe_news1';
gulp.task(`built css: ${key}.css`, function () {
    gulp
        .src(`bundle/${key}.css`)
        .pipe(rename(`${key}.min.css`))
        .pipe(cleancss({
            advanced: true, //类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie8', //保留ie8及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: true, //类型：Boolean 默认：false [是否保留换行]
            keepSpecialComments: '*'
            //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
        }))
        .pipe(header(bannerCSS_charset_utf_8))
        // .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});
gulp.task(`built js: ${key}.js`, function () {
    gulp
        .src([
            `bundle/${key}.js`
        ])
        .pipe(stripDebug()) // 删除 console
        .pipe(rename(`${key}.min.js`))
        // .pipe(sourcemaps.init())
        .pipe(uglify())
        // .pipe(sourcemaps.write('../maps'))
        .pipe(header(banner))
        .pipe(gulp.dest('bundle'));
});
gulp.task('build_iframe_news1', [
    `built css: iframe_news1.css`,
    `built js: iframe_news1.js`,
]);

gulp.task('build_content', [
    `built_content_js`,
    `built_content_css`,
]);


gulp.task('show end tips:', function (params) {
    const now = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    console.log('[' + `${now}`.input + ']' + `\nGulp Finish build ==//==>`.green + ` ${pkg.name}`.grey + ` Build v${pkg.version}`.error);
});

gulp.task('build', [
    `qndj`,
    `pages`,
    `homepage`,
    `s4`,
    `long-pic`,
    `build_content`,
    `built_ej_footer_max_js`,
    'built_wx-share',
    'built_css_rzjg',
    'build_iframe_news1',
    'xat-homepage',
    'built_lhr_xl_v1_css',
    'built ej-topfooter-v1.css',
    'built xa-yw-er.css',
    'built_s4_index_js',
    'built_service_page',
    'built js: homepage-config.js',
    'built_css/common.css',
    'show end tips:'
]);
