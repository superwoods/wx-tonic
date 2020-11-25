const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");
const mkdirp = require('mkdirp');

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
        // console.log('\nwriteTemplate: \n', html);
        console.log('\n   dist:', dist);
    });
};


// let resultObj = {};
// const textClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|case|demo|）/ig, '');
// const textLightClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|）/ig, '');

const targetArray = [
    'https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew',
    // 'https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A',
];

const catchCase = ({ href, dist, dir, i }) => {
    console.log('run ==> catchCase: ', { href, i, dist, dir });
    mkdir(dir);

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

            console.log($('svg').length);


            writeTemplate({
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

                    if (i < 2) {
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