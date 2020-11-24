const textClean = ($t) => $t.text().replace(/ |\r|\n/ig, '');

let resultObj = {};

$('body')
    .find('#js_content')
    .find('section[style="max-width: 100%;display: inline-block;width: 677px;vertical-align: top;background-color: rgb(249, 249, 249);border-width: 0px;border-style: none;border-color: rgb(51, 51, 51);border-radius: 5px;overflow: hidden;box-sizing: border-box !important;overflow-wrap: break-word !important;"]')
    .each((index, e) => {
        const $e = $(e);
        const $children = $e.children('section');

        let name1 = textClean($children.eq(1));

        resultObj[index] = {
            'name': name1,
            'child': {}
        };

        $children.each((_i, _e) => {
            const $_e = $(_e);
            // console.log($_e);
            let name2 = textClean($_e.children('p'));
            if (name2) {

                resultObj[index].child[_i] = {
                    'name2': name2,
                    'child2': []
                };

                $_e.children('section')
                    .each((__i, __e) => {
                        const $__e = $(__e);

                        $__e.children('section')
                            .each((___i, ___e) => {

                                const $___e = $(___e);
                                // console.log($___e);

                                let name3 = textClean($___e);

                                resultObj[index].child[_i].child2.push({
                                    'name3': name3
                                });

                                let $a = $___e.find('a');
                                if ($a.length == 1) {
                                    resultObj[index].child[_i].child2[___i].href = $a.attr('href');
                                } else if ($a.length > 1) {
                                    resultObj[index].child[_i].child2[___i].href = [];
                                    $a.each((i, e) => {
                                        resultObj[index].child[_i].child2[___i].href.push({
                                            'name': textClean($(e)),
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