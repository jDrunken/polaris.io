// --------------------------------------------------------------------------------
// bugger menu
// --------------------------------------------------------------------------------
(function ($) {
    $(function(){
        $('#header .bugger').click(function(){
            $('#header nav').addClass('open');
        });

        $('#header .close').click(function(){
            $('#header nav').removeClass('open');
        });
    });
})(jQuery);




// --------------------------------------------------------------------------------
// 스크롤 위치에 따른 GNB color changing (by class binding)
// --------------------------------------------------------------------------------
(function ($) {
    $(function (){
        function headerInteraction (target,window,wall) {
            var target = $(target)
                ,   scrollPosition = parseInt($(window).scrollTop())
                ,   changeScrollPosition = (function (wall){
                    if (wall === 0 || wall === null) {
                        return 0;
                    }
                    if (wall.length <= 1) {
                        return parseInt($(wall).outerHeight());
                    } else {
                        var sum = 0;
                        for (i in wall) {
                            sum = sum + parseInt($(wall[i]).outerHeight());
                        }

                        return sum;
                    }
                })(wall)
            ;


            scrollPosition > changeScrollPosition  ?  target.addClass('invert') : target.removeClass('invert');
        }

        // 로딩시 바인딩
        headerInteraction($('#header'),$(window),$('#summary'))

        $(document).on('scroll', function(e) {
            headerInteraction($('#header'),$(window),null);

        });

    });
})(jQuery);


// --------------------------------------------------------------------------------
// tab view :: faq
// button click :: faq details
// --------------------------------------------------------------------------------
(function ($) {
    $(function () {
        var handler = {
            tab : $('#faq .link a'),
            button : $('#faq dl dt button')
        }
        ,   target = {
                dl : $('#faq dl'),
                dt : $('#faq dt')
            }
        ;

        $(handler.tab).click (function (e) {
            // 기본동작 중지
            e.preventDefault();

            $(handler.tab).removeClass('viewing');
            $(target.dl).removeClass('viewing')
            $(target.dt).removeClass('viewing')

            $(this).addClass('viewing');
            $($(this).attr('href')).addClass('viewing');
        });

        $(handler.button).click(function (e){
            e.preventDefault();
            $(target.dt).removeClass('viewing');
            $(this).parent('dt').addClass('viewing');
        });
    });


})(jQuery);


// --------------------------------------------------------------------------------
// advantage interaction
// --------------------------------------------------------------------------------
(function () {
    $(document).on('scroll', function(e) {
        var target = $('#advInteraction')
        ,   startPosition = parseInt($(target).offset().top) - parseInt($(window).outerHeight())/2 - parseInt($(target).outerHeight())/2
        ,   scrollPosition = parseInt($(window).scrollTop())
        ;

        if (startPosition <= scrollPosition) {
            $(target).addClass('animate');
        }

    });

})();
