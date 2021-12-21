/* global jQuery */

import fontLoader from '../../assets/js/fonts-loader';
import liveDom from "../../assets/js/live-dom";
import '../../assets/js/light-tabs';
import './add-to-cart';
import './checkout-blocks';
import './fix-woo-scroll-to-notice';
import './menu-cart';
import './quantity';

fontLoader( 'woo', theme.url + 'fonts/woo-fonts.css' );

liveDom( 'form.cart' )
  .init( function() {
    jQuery( this ).wldAddToCart();
  } )
  .start();

jQuery( '.section-auth' ).lightTabs();
jQuery( '.menu-item.cart' ).wldMenuCart();
jQuery( '.checkout .block' ).wldCheckoutBlocks();
