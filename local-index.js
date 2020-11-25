// const textClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|case|demo|）/ig, '');
// const textLightClean = ($t) => $t.text().replace(/\r|\n|\s|（|、|）/ig, '');

const textClean = ($t) => $t.text().replace(/\r|\n|\s/ig, '');
const textLightClean = ($t) => $t.text().replace(/\r|\n|\s/ig, '');

let resultObj = {};

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
            i2 = i2 - 2;

            if (name2) {
                resultObj[i1].child[i2] = {
                    'name': name2,
                    'child': []
                };

                $e2.children('section').each((i3, e3) => {
                    const $e3 = $(e3);
                    // console.log($e3);
                    let mark_i4 = 0;

                    $e3.children('section').each((i4, e4) => {
                        const $e4 = $(e4);
                        mark_i4 = i4;
                        // console.log('i4:', i4);
                        // $e4.addClass('is-item' + i4);
                        let $a = $e4.find('a');
                        resultObj[i1].child[i2].child.push({});

                        if ($a.length <= 0) {
                            let name = textClean($e4);
                            resultObj[i1].child[i2].child[mark_i4].name3 = name;

                        } else if ($a.length <= 1) {
                            let name = textClean($a.closest('p'));
                            resultObj[i1].child[i2].child[mark_i4].name3 = name;
                            resultObj[i1].child[i2].child[mark_i4].href = $a.attr('href');
                        } else {
                            resultObj[i1].child[i2].child[mark_i4].more = true;
                            resultObj[i1].child[i2].child[mark_i4].href = [];
                            $a.each((i5, e5) => {
                                const $e5 = $(e5);



                                let name5 = textClean($e5.closest('p'));

                                if (name5 == '') {
                                    // 如果 a 外层没有p，那么继续外层 section，获取其中文字作为 name5
                                    name5 = textClean($e5.closest('section'));
                                }

                                if (i1 == 3) {
                                    if ($e5.closest('p').find('a').length > 1) {
                                        console.log($e5.closest('p').find('a').length);


                                    } else {
                                        resultObj[i1].child[i2].child[mark_i4].name3 = name5;
                                        resultObj[i1].child[i2].child[mark_i4].href.push({
                                            a: textClean($e5),
                                            href: $e5.attr('href')
                                        });
                                    }
                                }


                            });
                        }



                        // let $a = $e4.find('a');

                        // if ($a.length > 0) {
                        //     resultObj[i1].child[i2].child[i4].link = [];
                        //     $a.each((i, e) => {
                        //         resultObj[i1].child[i2].child[i4].link.push({
                        //             'name4': textLightClean($(e)),
                        //             'href': $(e).attr('href')
                        //         });
                        //     });
                        // }
                    });

                });
            }
        });
    });


// console.log(resultObj);
// console.log(JSON.stringify(resultObj[3].child[0].child[1]).replace(/{"name"/ig, '{\n "name"').replace(/","href"/ig, '",\n "href"').replace(/},{/ig, '\n},{'));
console.log(resultObj[3].name + '\n', '  \\-> ' + resultObj[3].child[0].name + '\n', '     \\-> ', resultObj[3].child[0]);
// console.log(resultObj[7].name + '\n', '  \\-> ', resultObj[7].child);

// console.log(resultObj[3].name + '\n', '  \\-> ' + resultObj[3].child[0].name + '\n', '     \\-> ', resultObj[3].child);
