const calcTopPosition = function(el) {
    var bodyRect = document.body.getBoundingClientRect(),
        elRect = el.getBoundingClientRect();

    return elRect.top - bodyRect.top;
};
