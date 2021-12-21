/* global jQuery, wc_add_to_cart_params */
import '../../assets/js/block';

const $ = jQuery;
const $body = $( document.body );

$.fn.wldMenuCart = function() {
  if ( this && this.length ) {
    this.each( function() {
      const
        $menu_item = $( this ),
        $link = $menu_item.children( 'a' );

      let
        $cart,
        $items,
        scrollTop = 0;

      $menu_item
        .on(
          'click',
          '[data-close]',
          e => {
            e.preventDefault();
            $menu_item.removeClass( 'open-cart' );
          }
        );

      $body
        .on(
          'wc_fragments_refreshed wc_fragments_loaded',
          function() {
            $cart = $menu_item.children( '.menu-cart' );
            $items = $cart.find( '.woocommerce-mini-cart' );
            $items
              .scrollTop( scrollTop )
              .on(
                'scroll',
                () => scrollTop = $items.scrollTop()
              );

            if ( $.fn.mCustomScrollbar ) {
              setTimeout( function() {
                $items.mCustomScrollbar( { 'mouseWheel': true } );
              } );
            }
          }
        ).on( 'added_to_cart', () => toggle( true ) );

      $link
        .on(
          'click',
          function( e ) {
            e.preventDefault();
            toggle();
          }
        );

      function toggle( state ) {
        $menu_item.toggleClass( 'open-cart', state );

        loadScrollBar();
      }

      function scrollToggle() {
        const $items = $menu_item.children( '.menu-cart' ).find( '.woocommerce-mini-cart' );

        if ( $menu_item.hasClass( 'open-cart' ) ) {
          setTimeout( function() {
            $items.mCustomScrollbar( { 'mouseWheel': true } );
          } );
        } else {
          setTimeout( function() {
            $items.mCustomScrollbar( 'destroy' );
          } );
        }
      }

      function loadScrollBar() {
        const $items = $menu_item.children( '.menu-cart' ).find( '.woocommerce-mini-cart' );

        if ( ! $.fn.mCustomScrollbar ) {
          $items.wldBlock();
          require.ensure( [], ( require ) => {
            require( 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min' );
            require( 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css' );

            scrollToggle();

            $items.wldUnblock();
          }, 'scrollbar' );
        } else {
          scrollToggle();
        }
      }
    } );
  }

  return this;
};
