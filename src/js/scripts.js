import $ from 'jquery';
import 'owl.carousel';

window.$ = $;

$(document).ready(function () {

    let body = $('body');
    let links = $('.mainHeader__links');
    let hamburger = $('.hamburger');

    function closeMenu() {
        body.removeClass('stop-scrolling');
        body.off('touchmove');
        links.fadeOut(500);
        hamburger.removeClass('is-active');
    }

    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        closeMenu();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });

    hamburger.on('click', function () {
        $(this).toggleClass('is-active');

        body.addClass('stop-scrolling');
        body.bind('touchmove', function(e) {
            e.preventDefault()
        });

        links.css({'display': 'flex'});

        if (! $(this).hasClass('is-active')) {
            closeMenu();
        }
    });


    $('.aboutUs__slider').owlCarousel({
        margin: 10,
        loop: true,
        items: 1,
        responsive: {
            0: {
                stagePadding: 0
            },
            400: {
                stagePadding: 100
            }
        },
        center: true
    });

    $('.whatTheySays__slider').owlCarousel({
        margin: 10,
        loop: true,
        items: 1,
        //stagePadding: 80,
        center: true,
        nav: true,
        responsive: {
            0: {
                stagePadding: 0
            },
            400: {
                stagePadding: 80
            }
        },
        onTranslated: function (e) {
            let dataId = $(e.target).find('.owl-item.active').find('img').attr('data-id');
            dataId = parseInt(dataId);

            if (dataId <= 0) {
                return;
            }

            let comment = $(".whatTheySays__descBlock[data-id='" + dataId + "']");

            if (comment.length) {
                $('.whatTheySays__descBlock').removeClass('active');
                comment.addClass('active fadeInRight');
            }
        },
    });

    $('.whatTheySays__star').hover(function () {
        $(this).addClass('active').prevAll('.whatTheySays__star').addClass('active');
    }, function () {
       $(this).removeClass('active').prevAll('.whatTheySays__star').removeClass('active');
    });
});
