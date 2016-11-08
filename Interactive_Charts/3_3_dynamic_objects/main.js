// external js: masonry.pkgd.js

$(document).ready(function () {

    var $grid = $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    $grid.on('click', '.grid-item-content', function () {

        var itemContent = this;
        setItemContentPixelSize(itemContent);

        var itemElem = itemContent.parentNode;
        $(itemElem).toggleClass('is-expanded');

        // force redraw
        var redraw = itemContent.offsetWidth;
        // renable default transition
        itemContent.style[transitionProp] = '';

        addTransitionListener(itemContent);
        setItemContentTransitionSize(itemContent, itemElem);

        $grid.masonry();
    });

});

var transitionProp = getStyleProperty('transition');
var transitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'otransitionend',
    transition: 'transitionend'
}[transitionProp];

function setItemContentPixelSize(itemContent) {
    var previousContentSize = getSize(itemContent);
    // disable transition
    itemContent.style[transitionProp] = 'none';
    // set current size in pixels
    itemContent.style.width = previousContentSize.width + 'px';
    itemContent.style.height = previousContentSize.height + 'px';
}

function addTransitionListener(itemContent) {
    if (!transitionProp) {
        return;
    }
    // reset 100%/100% sizing after transition end
    var onTransitionEnd = function () {
        itemContent.style.width = '';
        itemContent.style.height = '';
        itemContent.removeEventListener(transitionEndEvent, onTransitionEnd, false);
    };
    itemContent.addEventListener(transitionEndEvent, onTransitionEnd, false);
}

function setItemContentTransitionSize(itemContent, itemElem) {
    // set new size
    var size = getSize(itemElem);
    itemContent.style.width = size.width + 'px';
    itemContent.style.height = size.height + 'px';
}
