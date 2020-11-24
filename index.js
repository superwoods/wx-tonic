const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");


// const dateFormat = require('dateformat');

// console.log('__dirname : ' + __dirname);

// let files = __dirname + '/index.html';

/**
let files = 'https://mp.weixin.qq.com/s?__biz=MzI0Mjg5MDEwMw==&amp;mid=2247484516&amp;amp;idx=1&amp;amp;sn=20d1aa9208fa7a125fedbde79154d41b&amp;source=41&amp;scene=21#wechat_redirect';

fs.readFile(files, 'utf-8', function (err, callbackData) {
    if (err) {
        console.error('/lib/index.js readFile err:\n', err);
        return;
    }

    jsdom.env(
        callbackData,
        (err, window) => {
            if (err) {
                console.error('jsdom err:\n', err);
                return;
            }
            const $ = jQuery(window);

            let $spans = $('body').find('[style="max-width: 100%;font-size: 14px;letter-spacing: 0.5px;font-family: Optima-Regular, PingFangTC-light;box-sizing: border-box !important;overflow-wrap: break-word !important;"]');

            console.log('$spans: ', $spans.length);

            let resultObj = {};

            $spans.each((i, e) => {
                let $e = $(e);
                // if (i == 200) console.log($e.text());
                if ($.trim($e.text())) {
                    resultObj[$e.text()] = {
                        'index': i,
                        'lists': {

                        }
                    };
                }
            });

            console.log(resultObj);

        }
    );
});
 */



let resultObj = {};
const textClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|case|demo|）/ig, '');
const textLightClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|）/ig, '');

jsdom.env(
    'https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew',
    // 'https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A',
    ["http://code.jquery.com/jquery.js"],
    (err, window) => {
        if (err) {
            console.error('jsdom err:\n', err);
            return;
        }

        const $ = jQuery(window);

        $('body')
            .find('#js_content')
            .find('section[style="max-width: 100%;display: inline-block;width: 677px;vertical-align: top;background-color: rgb(249, 249, 249);border-width: 0px;border-style: none;border-color: rgb(51, 51, 51);border-radius: 5px;overflow: hidden;box-sizing: border-box !important;overflow-wrap: break-word !important;"]')
            .each((i1, e) => {
                const $e = $(e);
                const $children = $e.children('section');

                let name1 = textClean($children.eq(1));

                resultObj[i1] = {
                    'name': name1,
                    'child': {}
                };

                $children.each((i2, e2) => {
                    const $e2 = $(e2);
                    let name2 = textClean($e2.children('p'));

                    if (name2) {
                        resultObj[i1].child[i2] = {
                            'name': name2,
                            'child': []
                        };

                        $e2.children('section')
                            .each((i3, e3) => {
                                const $e3 = $(e3);

                                $e3.children('section')
                                    .each((i4, e4) => {
                                        const $e4 = $(e4);
                                        // console.log($e4);
                                        let name = textClean($e4);

                                        resultObj[i1].child[i2].child.push({
                                            'name': name
                                        });

                                        let $a = $e4.find('a');

                                        if ($a.length > 0) {
                                            resultObj[i1].child[i2].child[i4].link = [];
                                            $a.each((i, e) => {
                                                resultObj[i1].child[i2].child[i4].link.push({
                                                    'name': textLightClean($(e)),
                                                    'href': $(e).attr('href')
                                                });
                                            });
                                        }
                                    });
                            });
                    }
                });
            });

        console.log(JSON.stringify(resultObj));

    }
);

// jsdom.env(
//     files,
//     ["http://code.jquery.com/jquery.js"],
//     (err, window) => {
//         if (err) {
//             console.error('jsdom err:\n', err);
//             return;
//         }

//         const $ = jQuery(window);

//         let $spans = $('html').find('svg');

//         console.log('$spans: ', $spans);


//         // let resultObj = {};

//         // $spans.each((i, e) => {
//         //     let $e = $(e);
//         //     // if (i == 200) console.log($e.text());
//         //     if ($.trim($e.text())) {
//         //         resultObj[$e.text()] = {
//         //             'index': i,
//         //             'lists': {

//         //             }
//         //         };
//         //     }
//         // });
//         // console.log(resultObj);
//     }
// );