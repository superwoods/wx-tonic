$(() => {
    const $imgs = $('body').find('img');
    let imgsObj = {

    };


    $imgs.each((i, e) => {
        const dataSrc = $(e).attr('data-src');
        console.log(i, dataSrc);

        if (dataSrc) {
            // console.log(i);
            $(e).attr('src', dataSrc);
        }
    });

    // console.log($imgs.length);

    $('#js_content').attr('style', '')
        .find('span')
        .each((i, e) => {
            console.log($(e).text());
            const $e = $(e);
            const txt = $e.text();
            if (/欢迎联系荒村|wx847623718|定制交互图文。|本文由JZCreative团队授权转载|最终解释权归JZCreative团队所有|咨询、定制请联系 JZ 管理员|微信:zhuoya_work|）。/.test(txt)) {
                $e.remove();
            }
        });
    $('#meta_content').remove();

    console.log('imgsObj', imgsObj);

    let js_contentHTML = $('#js_content').html();

    let index = 0;

    js_contentHTML = js_contentHTML.replace(/(url\()(&quot;|")?((http(s)?:\/\/)([\s\S]*?)?)(png|jpeg|gif|jpg)?(;)?(&quot;|")?(\))/g, function (...e) {
        index++;

        console.log(index, e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10]);


        // if (type && e[4].length > 0 && /www\.w3\.org/i.test(e[4]) == false) {
        //     const isHttp = e[3] ? false : true;
        //     imgIndex++;

        //     // savePic({
        //     //     src: e[2] + e[4],
        //     //     dist: `${dir}/img/img${imgIndex}.` + type,
        //     //     catchCaseConfig,
        //     //     isHttp,
        //     // });

        //     return `./img/img${imgIndex}.` + type;
        // } else {
        //     return e[0];
        // }


    });





    $('#js_content').html(js_contentHTML);
});