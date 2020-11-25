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
// const textClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|case|demo|）/ig, '');
// const textLightClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|）/ig, '');

const targetArray = [
    'https://mp.weixin.qq.com/s/4IfCETREWz8kZX-S8fvxew',
    // 'https://mp.weixin.qq.com/s/gHnDoiVCZ_3PkAJfWbfC8A',
];

const jsdomFn = (targetArray) => {

    targetArray.map((src, i) => {
        // console.log(src, i);
        let file1 = `/${i}`;
        console.log('file1:', file1);

        jsdom.env(
            src,
            ["http://code.jquery.com/jquery.js"],
            (err, window) => {
                if (err) {
                    console.error('jsdom err:\n', err);
                    return;
                }

                const $ = jQuery(window);
                let dom = '';


                const $script = $('html').find('script');
                $script.remove();

                const $a = $('#js_content').find('a');

                // console.log($a.length);

                $a.each((i, e) => {
                    const $e = $(e);
                    $e
                        .addClass('is-changed')
                        .attr('data-href', $e.attr('href'))
                        .attr('href', `${file1}/case${i}/case${i}.html`)
                        .attr('target', '_self');
                });


                console.log($('html').prop('outerHTML'));


                // let $spans = $('html').find('svg');

                // console.log('$spans: ', $spans);


                // let resultObj = {};

                // $spans.each((i, e) => {
                //     let $e = $(e);
                //     // if (i == 200) console.log($e.text());
                //     if ($.trim($e.text())) {
                //         resultObj[$e.text()] = {
                //             'index': i,
                //             'lists': {

                //             }
                //         };
                //     }
                // });
                // console.log(resultObj);
            }
        );
    });



}


if (targetArray && targetArray.length) {
    jsdomFn(targetArray);
}



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