const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");
const mkdirp = require('mkdirp');
const https = require('https');
const http = require('http');
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
    error: 'red',
    'catchCaseTitle': 'green',
    'catchCaseValue': 'cyan',
    'catchCaseValue2': 'yellow',
});

// 创建目录
const mkdir = (dir) => {
    mkdirp(dir, function (err) {
        if (err) {
            console.error('mkdirp err:', err);
            return;
        }
    });
};

const writeTemplate = ({ dist, $html }) => {
    const string = `
        <!DOCTYPE html>
        ${$html.prop('outerHTML')}
    `;

    fs.writeFile(dist, string, 'utf-8', function (err) {
        if (err) {
            console.error('\n writeTemplate err:', err);
            return;
        }
        console.log('\n dist:'.green, dist);
        console.log('\n-------------------'.gray);
    });

    console.log('\n------------------- RUN writeTemplate() -------------------'.gray);
};

const saveImgHttps = ({ src, dist }) => {
    if (src) {
        // console.log(src);
        https.get(src, function (res) {
            res.setEncoding('binary');//二进制（binary）
            var imageData = '';
            res
                .on('data', function (data) {//图片加载到内存变量
                    imageData += data;
                })
                .on('end', function () {//加载完毕保存图片
                    fs.writeFile(dist, imageData, 'binary', function (err) {//以二进制格式保存
                        console.log(`\n====== saveImgHttps ======`.yellow);
                        console.log(' dist:'.green, `${dist}`.red);
                        console.log('saved:'.green, `${src}`.cyan);
                        if (err) throw err;
                    });
                });
        }).on('error', function (e) {
            console.log("saveImg Got error: ", e.message, src);
        });
    } else {
        console.log('saveImg need config!!!', src);
    }
};


const saveImgHttp = ({ src, dist }) => {
    if (src) {
        // console.log('http:', src);
        http.get(src, function (res) {
            res.setEncoding('binary');//二进制（binary）
            var imageData = '';
            res
                .on('data', function (data) {//图片加载到内存变量
                    imageData += data;
                })
                .on('end', function () {//加载完毕保存图片
                    fs.writeFile(dist, imageData, 'binary', function (err) {//以二进制格式保存
                        if (err) throw err;
                        console.log(`\n------ saveImgHttp --------`.gray);
                        console.log(' dist:'.green, `${dist}`.red);
                        console.log('saved:'.green, `${src}`.cyan);
                    });
                });
        }).on('error', function (e) {
            console.log("saveImg Got error: ", e.message, src);
        });
    } else {
        console.log('saveImg need config!!!', src);
    }
};

const targetArray = [
    'https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew',
    // 'https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A',
];

const catchCase = ({ href, dist, dir, i }) => {
    console.log('run ==> catchCase: \n'.red, { href, i, dist, dir });

    /**
     * { href: 'https://mp.weixin.qq.com/s?__biz=MzIxNDEzMjQwNw==&mid=2648957851&idx=1&sn=9d77b7cfcfe2594de8eb05a2c7309e0f&scene=21#wechat_redirect',
         i: 0,
         dist: './src/casefile0/case0/index.html',
         dir: './src/casefile0/case0' }
     */

    mkdir(dir);
    mkdir(dir + '/img');

    jsdom.env(
        href,
        ["http://code.jquery.com/jquery.js"],
        (err, window) => {
            if (err) {
                console.error('jsdom err:\n', err);
                return;
            }
            const $ = jQuery(window);

            const $script = $('html').find('script');
            $script.remove();
            let js_contentHTML = $('#js_content').html();

            let imgIndex = 0;

            js_contentHTML = js_contentHTML.replace(/(\(|&quot;|")(http(s)?:\/\/)([\s\S]*?)?(&quot;|"|\))/gm, function (...e) {
                /**
                 * (\(|&quot;|") (http(s)?:\/\/) ([\s\S]*?)? (&quot;|"|\) )
                 * (    1      ) ( 2  (3)      ) (   4    )  (     5      ) = 0
                 */

                const type = e[4].split('wx_fmt=')[1] || 'png';

                console.log('type:'.catchCaseTitle, `${type}`.catchCaseValue);
                console.log('e[0]:'.catchCaseTitle, `${e[0]}`.catchCaseValue2);
                // console.log('e[1]:'.catchCaseTitle, `${e[1]}`.catchCaseValue);
                // console.log('e[2]:'.catchCaseTitle, `${e[2]}`.catchCaseValue2);
                // console.log('e[3]:'.catchCaseTitle, `${e[3]}`.catchCaseValue);
                // console.log('e[4]:'.catchCaseTitle, `${e[4]}`.catchCaseValue2);


                // console.log('e[4]:'.catchCaseTitle, `${e[4].length}`.catchCaseValue);
                // console.log('   3:'.catchCaseTitle, /www\.w3\.org/i.test(e[4]) == false);
                console.log('------------------------\n'.gray);
                // console.log('   e:', e[2]);

                if (type && e[4].length > 0 && /www\.w3\.org/i.test(e[4]) == false) {
                    if (e[3]) {
                        imgIndex++;
                        saveImgHttps({
                            src: e[2] + e[4],
                            dist: `${dir}/img/img${imgIndex}.` + type
                        });
                        return `./img/img${imgIndex}.` + type;
                    } else {
                        imgIndex++;
                        saveImgHttp({
                            src: e[2] + e[4],
                            dist: `${dir}/img/img${imgIndex}.` + type
                        });
                        return `./img/img${imgIndex}.` + type;
                    }
                } else {
                    return e[0];
                }
            });

            $('#js_content').html(js_contentHTML).attr('style', '');

            $('body').append(`
                <script src="/jq.js"></script>
                <script src="/set-page.js"></script>
            `);

            writeTemplate({ // 写入 case
                'dist': dist,
                '$html': $('html'),
            });

        }
    );
};


const jsdomFn = (targetArray) => {
    console.log('run ==> jsdomFn: \n'.red, targetArray);

    targetArray.map((src, i) => {
        // console.log(src, i);

        let file1 = `./src/casefile${i}`;

        const caseIndex = `${file1}/index.html`;

        mkdir(file1);

        jsdom.env(
            src,
            ["http://code.jquery.com/jquery.js"],
            (err, window) => {
                if (err) {
                    console.error('jsdom err:\n', err);
                    return;
                }

                const $ = jQuery(window);

                const $a = $('#js_content').find('a');

                $a.each((i, e) => {
                    const $e = $(e);
                    const href = $e.attr('href');

                    $e
                        .addClass('is-changed')
                        .attr('data-href', href)
                        .attr('href', `./case${i}/index.html`)
                        .attr('target', '_self');

                    if (i == 4) { // is-dev: max = 2
                        catchCase({
                            href: href,
                            dist: `${file1}/case${i}/index.html`,
                            dir: `${file1}/case${i}`,
                            i: i,
                        });
                    }
                });

                writeTemplate({ // 写入 case
                    'dist': caseIndex,
                    '$html': $('html'),
                });
            }
        );
    });
};

if (targetArray && targetArray.length) {
    jsdomFn(targetArray);
}
