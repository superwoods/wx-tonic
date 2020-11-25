const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");
const mkdirp = require('mkdirp');
const https = require('https');
const http = require('http');

// 创建目录
const mkdir = (dir) => {
    mkdirp(dir, function (err) {
        if (err) {
            console.error('mkdirp err:', err);
            return;
        }
    });
};

const writeTemplate = ({ dist, html }) => {
    console.log('\nrun ==> writeTemplate()');
    fs.writeFile(dist, html, 'utf-8', function (err) {
        if (err) {
            console.error('writeTemplate err:', err);
            return;
        }
        console.log('\n   dist:', dist);
    });
};

const saveImgHttps = ({ src, dist }) => {
    if (src) {

        console.log(src);

        https.get(src, function (res) {
            res.setEncoding('binary');//二进制（binary）
            var imageData = '';
            res
                .on('data', function (data) {//图片加载到内存变量
                    imageData += data;
                })
                .on('end', function () {//加载完毕保存图片
                    fs.writeFile(dist, imageData, 'binary', function (err) {//以二进制格式保存
                        if (err) throw err;
                        console.log('saved:', dist);
                        console.log('saved:', src);
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
        console.log('http:', src);
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
                        console.log('saved:', dist);
                        console.log('saved:', src);
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
    console.log('run ==> catchCase: ', { href, i, dist, dir });

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
                const type = e[4].split('wx_fmt=')[1] || 'png';

                console.log('type:', type);
                console.log('e[0]:', e[0]);
                console.log('e[2]:', /https/i.test(e[2]), e[2]);
                console.log('e[4]:', e[4].length);
                console.log('   3:', /www\.w3\.org/i.test(e[4]) == false, '\n----\n');
                // console.log('   e:', e[2]);

                if (type && e[4].length > 0 && /www\.w3\.org/i.test(e[4]) == false) {
                    if (/https/i.test(e[2])) {
                        // console.log("e[2] == 'https://':", e[2] == 'https://');
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

            console.log('js_contentHTML:', js_contentHTML);

            writeTemplate({ // 写入 case
                dist: dist,
                html: `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>
                               case${i}_${$('#activity-name').text()}
                            </title>
                        </head>
                        <body>
                            <a href="${href}" target="_blank">原地址</a>
                            <h2>
                                ${$('#activity-name').text()}
                            </h2>
                            <div id="js_content">
                                ${js_contentHTML}
                            </div>
                        </body>
                    </html>
                    `,
            });

        }
    );
};


const jsdomFn = (targetArray) => {
    console.log('run ==> jsdomFn: ', targetArray);

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

                const $script = $('html').find('script');
                $script.remove();

                const $a = $('#js_content').find('a');

                // console.log($a.length);

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


                writeTemplate({
                    dist: caseIndex,
                    // html: '<!DOCTYPE html>\n' + $('html').prop('outerHTML'),
                    html: `
                    <!DOCTYPE html>
                    <html>
                        <head>
                            <title>
                                ${$('title').text()}
                            </title>
                        </head>
                        <body>
                            <h2>
                                ${$('#activity-name').text()}
                            </h2>
                            <div id="js_content">
                                ${$('#js_content').html()}
                            </div>
                        </body>
                    </html>
                    `,
                });
            }
        );
    });
};


if (targetArray && targetArray.length) {
    jsdomFn(targetArray);
}