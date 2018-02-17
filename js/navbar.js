(function($){

    $.extend($.easing, {
        easeInOutCubic : function(x, t, b, c, d){
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        }
    });

    $.fn.outerFind = function(selector){
        return this.find(selector).addBack(selector);
    };

    (function($,sr){
        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        var debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) func.apply(obj, args);
                    timeout = null;
                };

                if (timeout) clearTimeout(timeout);
                else if (execAsap) func.apply(obj, args);

                timeout = setTimeout(delayed, threshold || 100);
            };
        }
        // smartresize
        jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    })(jQuery,'smartresize');

    (function(){

        var scrollbarWidth = 0, originalMargin, touchHandler = function(event){
            event.preventDefault();
        };

        function getScrollbarWidth(){
            if (scrollbarWidth) return scrollbarWidth;
            var scrollDiv = document.createElement('div');
            $.each({
                top : '-9999px',
                width  : '50px',
                height : '50px',
                overflow : 'scroll',
                position : 'absolute'
            }, function(property, value){
                scrollDiv.style[property] = value;
            });
            $('body').append(scrollDiv);
            scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
            $('body')[0].removeChild(scrollDiv);
            return scrollbarWidth;
        }

    })();

    // $.isMobile = function(type){
    //     var reg = [];
    //     var any = {
    //         blackberry : 'BlackBerry',
    //         android : 'Android',
    //         windows : 'IEMobile',
    //         opera : 'Opera Mini',
    //         ios : 'iPhone|iPad|iPod'
    //     };
    //     type = 'undefined' == $.type(type) ? '*' : type.toLowerCase();
    //     if ('*' == type) reg = $.map(any, function(v){ return v; });
    //     else if (type in any) reg.push(any[type]);
    //     return !!(reg.length && navigator.userAgent.match(new RegExp(reg.join('|'), 'i')));
    // };



    $(function(){

        // $('html').addClass($.isMobile() ? 'mobile' : 'desktop');

        // .mbr-navbar--sticky
        $(window).scroll(function(){
            $('.mbr-navbar--sticky').each(function(){
                var method = $(window).scrollTop() > 10 ? 'addClass' : 'removeClass';
                $(this)[method]('mbr-navbar--stuck')
                    .not('.mbr-navbar--open')[method]('mbr-navbar--short');
            });
        });

        // .mbr-hamburger
        $(document).on('add.cards change.cards', function(event){
            $(event.target).outerFind('.mbr-hamburger:not(.mbr-added)').each(function(){
                $(this).addClass('mbr-added')
                    .click(function(){
                        $(this)
                            .toggleClass('mbr-hamburger--open')
                            .parents('.mbr-navbar')
                            .toggleClass('mbr-navbar--open')
                            .removeClass('mbr-navbar--short');
                    }).parents('.mbr-navbar').find('a:not(.mbr-hamburger)').click(function(){
                        $('.mbr-hamburger--open').click();
                    });
            });
        });
        $(window).smartresize(function(){
            if ($(window).width() > 991)
                $('.mbr-navbar--auto-collapse .mbr-hamburger--open').click();
        }).keydown(function(event){
            if (27 == event.which) // ESC
                $('.mbr-hamburger--open').click();
        });

        // init
        $('body > *:not(style, script)').trigger('add.cards');
        $('html').addClass('mbr-site-loaded');
        $(window).resize().scroll();

        // smooth scroll
        if (!$('html').hasClass('is-builder')){
            $(document).click(function(e){
                try {
                    var target = e.target;
                    do {
                        if (target.hash){
                            var useBody = /#bottom|#top/g.test(target.hash);
                            $(useBody ? 'body' : target.hash).each(function(){
                                e.preventDefault();
                                // in css sticky navbar has height 64px
                                var stickyMenuHeight = $('.mbr-navbar--sticky').length ? 64 : 0;
                                var goTo = target.hash == '#bottom'
                                        ? ($(this).height() - $(window).height())
                                        : ($(this).offset().top - stickyMenuHeight);
                                $('html, body').stop().animate({
                                    scrollTop: goTo
                                }, 800, 'easeInOutCubic');
                            });
                            break;
                        }
                    } while (target = target.parentNode);
                } catch (e) {
                   // throw e;
                }
            });
        }

    });

})(jQuery);
!function() {
}();
