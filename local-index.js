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


console.log(resultObj);