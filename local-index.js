let resultObj = {};

let $as = $('body')
    .find('#js_content')
    .find('section[style="max-width: 100%;display: inline-block;width: 677px;vertical-align: top;background-color: rgb(249, 249, 249);border-width: 0px;border-style: none;border-color: rgb(51, 51, 51);border-radius: 5px;overflow: hidden;box-sizing: border-box !important;overflow-wrap: break-word !important;"]')
    .each((i, e) => {
        const $e = $(e);
        const $children = $e.children('section');
        const index = i;

        let name1 = $children.eq(1).text().replace(/ |\r|\n/ig, '');
        // console.log(name1);

        resultObj[index] = {
            'name': name1,
            'child': {}
        };

        $children.each((_i, _e) => {
            const $_e = $(_e);
            // console.log($_e);
            let name2 = $_e.children('p').text().replace(/ |\r|\n/ig, '');
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

                                let name3 = $___e.text().replace(/ |\r|\n/ig, '');

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
                                            'name': $(e).text().replace(/ |\r|\n/ig, ''),
                                            'href': $(e).attr('href')
                                        });
                                    });
                                }
                            });

                        // const $a = $__e.children('a');



                        // $a.each((i, e) => {

                        //     console.log(i, e);
                        //     // resultObj[index].child[_i].child2[child3_index].href.push($(e).attr('href'));
                        // });

                        // resultObj[index].child[_i].child2.push({
                        //     'name3': $.trim($e.text()).replace(/ |\r|\n/ig, ''),
                        //     'href': $(e).attr('href'),
                        // });



                        // if ($a.length == 1) {
                        //     resultObj[index].child[_i].child2[child3_index].href = $.trim($a.attr('href'));
                        // } else if ($a.length > 1) {
                        //     // $a.each((i, e) => {
                        //     //     resultObj[index].child[_i].child2[child3_index].href.push($(e).attr('href'));
                        //     // });
                        // }

                        // $a.each((i, e) => {
                        //     resultObj[index].child[_i].child2[child3_index].href.push({

                        //         $(e).attr('href')
                        //     });


                        // });
                    });

            }


        });
    });


console.log(resultObj);