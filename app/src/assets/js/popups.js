/* global jQuery */
jQuery( $ => {
  const $inks = $( '.selector' );

  if ( $inks.length ) {
    require.ensure( [], ( require ) => {
      require( 'magnific-popup' );
      require( 'magnific-popup/dist/magnific-popup.css' );

      $inks.magnificPopup( {} );
    }, 'magnific' );
  }
} );
