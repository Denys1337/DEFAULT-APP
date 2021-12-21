/* global jQuery */
jQuery($ => {
    const $slider = $('.selector');

    if ($slider.length) {
        require.ensure([], (require) => {
            require('slick-carousel');
            require('slick-carousel/slick/slick.css');

            $slider.slick({ autoplay: true });
        }, 'slick');
    }
});