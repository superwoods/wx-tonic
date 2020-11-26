$(() => {
    const $imgs = $('body').find('img');
    $imgs.each((i, e) => {
        const dataSrc = $(e).attr('data-src');
        console.log(i, dataSrc);
        if (dataSrc) {
            $(e).attr('src', dataSrc);
        }
    });


    console.log($imgs.length);


    $('#js_content').attr('style', '');
});