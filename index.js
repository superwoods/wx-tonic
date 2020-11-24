// const fs = require("fs");
const jsdom = require('jsdom');
const jQuery = require("jquery");
// const dateFormat = require('dateformat');

// console.log('__dirname : ' + __dirname);

// let files = __dirname + '/index.html';

// let files = 'https://mp.weixin.qq.com/s?__biz=MzI0Mjg5MDEwMw==&amp;mid=2247484516&amp;amp;idx=1&amp;amp;sn=20d1aa9208fa7a125fedbde79154d41b&amp;source=41&amp;scene=21#wechat_redirect';

// fs.readFile(files, 'utf-8', function (err, callbackData) {
//     if (err) {
//         console.error('/lib/index.js readFile err:\n', err);
//         return;
//     }

//     jsdom.env(
//         callbackData,
//         (err, window) => {
//             if (err) {
//                 console.error('jsdom err:\n', err);
//                 return;
//             }
//             const $ = jQuery(window);

//             let $spans = $('body').find('[style="max-width: 100%;font-size: 14px;letter-spacing: 0.5px;font-family: Optima-Regular, PingFangTC-light;box-sizing: border-box !important;overflow-wrap: break-word !important;"]');

//             console.log('$spans: ', $spans.length);

//             let resultObj = {};

//             $spans.each((i, e) => {
//                 let $e = $(e);
//                 // if (i == 200) console.log($e.text());
//                 if ($.trim($e.text())) {
//                     resultObj[$e.text()] = {
//                         'index': i,
//                         'lists': {

//                         }
//                     };
//                 }
//             });

//             console.log(resultObj);

//         }
//     );
// });

let resultObj = {};

jsdom.env(
    'https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A',
    ["http://code.jquery.com/jquery.js"],
    (err, window) => {
        if (err) {
            console.error('jsdom err:\n', err);
            return;
        }

        const $ = jQuery(window);

        // let $js_content = $('body').find('#js_content');
        let $as = $('body')
            .find('#js_content')
            .find('section[style="max-width: 100%;display: inline-block;width: 677px;vertical-align: top;background-color: rgb(249, 249, 249);border-width: 0px;border-style: none;border-color: rgb(51, 51, 51);border-radius: 5px;overflow: hidden;box-sizing: border-box !important;overflow-wrap: break-word !important;"]')
            .find('a');



        $as.each((i, e) => {
            //     const index = i;
            const $e = $(e);
            // console.log(i, $e.parent('span').text(), $e.attr('href'));
            console.log($as.eq(i).end().find('p'));


            //     const $in = $e.children('section[style="max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;"]');

            //     $in.each((i, e) => {
            //         const $e = $(e);
            //         if (i == 0) {

            //         } else if (i == 1) {
            //             resultObj[index] = {
            //                 'name': $e.text(),
            //                 'child': {},
            //             };
            //         } else {
            //             let text = $e.children('p').find('strong').text();

            //             resultObj[index].child[text] = i;
            //         }
            //         // resultObj[$e.text()].child[$e.children('p').find('strong').text()] = $e.children('section').find('a').attr('href');

            //     });
            //     // if ($e.children('p').length == 1) {
            //     //     console.log(i);
            //     // }
        });




        // js_content = js_content.replace(/ style="([\s\S]*?)?"/ig, '');

        // // console.log($(js_content).find('a[target="_blank"]').attr('href') + '\n');

        // $(js_content).find('a[target="_blank"]').each((i, e) => {
        //     console.log(i + $(e).attr('href') + '\n');

        //     $(e).father('span')

        // });

        // $sections.each((i, e) => {
        //     const $e = $(e);
        //     const $in = $e.find('section');

        //     if ($in.length > 0) {
        //         if ($in.find('p').length == 2 && $in.find('strong').length == 1) {
        //             console.log($in.find('strong').text());
        //             console.log($in.find('p').text());
        //         }
        //     }
        // });




        // $spans.each((i, e) => {
        //     let $e = $(e);
        //     let text = $.trim($e.text());

        //     if (text !== '......') {
        //         resultObj[$e.text()] = {
        //             'index': i,
        //             'lists': {

        //             }
        //         };
        //     }
        // });

        console.log(resultObj);

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