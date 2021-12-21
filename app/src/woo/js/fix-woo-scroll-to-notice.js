/* global jQuery */
const $ = jQuery;
const $header = $( 'header.header' );

if ( $header.length ) {
  function init() {
    if ( typeof $.scroll_to_notices === 'function' ) {
      $.scroll_to_notices = $scrollElement => {
        if ( $scrollElement.length ) {
          $( 'html, body' ).animate( {
            scrollTop: $scrollElement.offset().top - ( 100 + $header.height() )
          }, 1000 );
        }
      };
    } else {
      setTimeout( init, 500 );
    }
  }

  init();
}
