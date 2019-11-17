$(document).ready(function() {
    $('.services__items').owlCarousel({
        loop: true,
        margin: 5,
        nav: false,
        responsive:{
            0:{
                items:1
            },
            576:{
                items:3
            },
            768: {
                items:4
            }
        }
    });

    $('.comments__items').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('.nav__hamburger').on('click', function () {
        $(this).toggleClass('is-active');
        $('.mainHeader__navList').slideToggle(300, function () {
            if ($(this).is(':visible')) {
                $(this).css('display','flex');
            }
            if ($(this).css('display') === 'none') {
                $(this).removeAttr('style');
            }
        });
    });

    let map = new Datamap({
        element: document.getElementById('map'),
        fills: {
            defaultFill: '#ff817e' // Any hex, color name or rgb/rgba value
        }
    });
});





