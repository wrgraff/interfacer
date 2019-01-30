var bgElements = function() {
    var bgImgs = document.querySelectorAll('[data-bg]');
    for (var i = 0; i < bgImgs.length; i++) {
        var src = bgImgs[i].dataset.bg,
            color = bgImgs[i].dataset.bgColor;

        if (bgImgs[i].dataset.bgColor) {
            if (color.includes('/')) {
                var colors = color.split('/');
                bgImgs[i].style.backgroundImage = 'url(' + src + '), linear-gradient(to right, #' + colors[0] + ' 50%, #' + colors[1] + ' 50%)';
            } else {
                bgImgs[i].style.backgroundColor = '#' + color;
                bgImgs[i].style.backgroundImage = 'url(' + src + ')';
            }
        } else {
            bgImgs[i].style.backgroundImage = 'url(' + src + ')';
        }
    }
    return bgImgs;
};

bgElements();
