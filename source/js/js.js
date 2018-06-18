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
(function ($) {
    $(document).on('scroll', function(e) {
        var target = $('#advInteraction')
        ,   startPosition = parseInt($(target).offset().top) - parseInt($(window).outerHeight())/2 - parseInt($(target).outerHeight())/2
        ,   scrollPosition = parseInt($(window).scrollTop())
        ;

        if (startPosition <= scrollPosition) {
            $(target).addClass('animate');
        }

    });

})(jQuery);

// 모든 리소스가 로딩 된 후  설정
(function ($) {
    $('body').addClass('loading');
    $(function () {
        $('#barrior').addClass('remove').on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){

            // modal block 삭제
            $('body').removeClass('loading').addClass('animate');
            document.getElementById('barrior').outerHTML = '';

            // body의 class 삭제
        });
    });
})(jQuery);



// --------------------------------------------------------------------------------
// hash location + smooth scrolling
// 스크롤 위치에 따른 GNB color changing (by class binding)
// policy view
// --------------------------------------------------------------------------------
(function ($) {

    function moveToHash (hash) {
        if (hash === '') { return false; }

        var hash = (function (hash) {
            return document.getElementById(hash.replace('#',''));
        })(hash);

        if (!!hash) {

            if(typeof e !== 'undefined') {
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }

                e.preventDefault();
                var insertQuery;

                if (e.type === 'click') {

                    insertQuery = $(e.target).attr('href');
                    history.pushState(null, null, insertQuery);
                }
            }

            $('#policy,#term,#disclimer').removeClass('viewing');
            $(hash).addClass('viewing');
        }
    }

    function checkHash (hash) {
        if (location.hash === '#policy' || location.hash === '#term' || location.hash === '#disclimer') {
            return true;
        }

        return false;
    }

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

    var _isSetClassName = true;

    function smoothScrollTo(hash, e) {
        if (hash === '') { return false; }

        if ($(hash).length > 0) {

            if(typeof e !== 'undefined') {
                if ('scrollRestoration' in history) {
                    history.scrollRestoration = 'manual';
                }

                e.preventDefault();
                var insertQuery;

                if (e.type === 'click') {

                    insertQuery = $(e.target).attr('href');
                    history.pushState(null, null, insertQuery);
                }
            }

            _isSetClassName = false;

            $('html,body').animate({
                scrollTop: $(hash).offset().top
            }, 350, function() {
                _isSetClassName = true;
            });
            // !!!! element의 길이에 따라서 스크롤 이동하는 타이밍 받도록 변경해야 됨
        }

    }

    $(function() {
        // footer의 post들을 처리
        // hash의 값은 3개안에 있는지 검사를...
        if(!!checkHash(location.hash)) {
            $('body').addClass('posting');
            moveToHash(location.hash);
        }

        //footer의 버튼들에 이동 매핑
        $('#footer .policy a').click(function () {
            $('body').addClass('posting');
            moveToHash(this.href);
        });

        // 로딩시 바인딩
        headerInteraction($('#header'),$(window),null);

        $(document).on('scroll', function(e) {
            headerInteraction($('#header'),$(window),null);
        });


        // header의 interaction 처리
        $('#header nav a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(e) {
            $('#header a[href*="#"]').removeClass('viewing');
            $(this).addClass('viewing');
            smoothScrollTo(this.hash, e);
        });

        smoothScrollTo(location.hash);

        $(window).on('hashchange',function (e) {
            if(!!checkHash(location.hash)) {
                $('body').addClass('posting');
                moveToHash(location.hash);
                $('html,body').scrollTop(0);
            } else {
                $('body').removeClass('posting');
                $('#policy,#term,#disclimer').removeClass('viewing');
                $('html,body').scrollTop(0);
            }

            if(!checkHash(location.hash)) {
                smoothScrollTo(location.hash, e);
            }
        });
    });
})(jQuery);
