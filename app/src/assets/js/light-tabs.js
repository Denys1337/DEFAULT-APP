( function( $ ) {
  jQuery.fn.lightTabs = function( options ) {
    const createTabs = function() {
      const tabs     = this;
      const showPage = function( i ) {
        $( tabs ).find( '.tab' ).hide().eq( i ).show();
        $( tabs ).find( '.tabs-nav' ).each(function( index, element ) {
          $(element).find('li').removeClass( 'active' ).eq( i ).addClass( 'active' );
        });
      };

      // Initialize tabs and show first tab content
      showPage( 0 );

      // Add data attributes with tab-content index
      $( tabs ).find( '.tabs-nav' ).each( ( index, element ) => {
        $( element ).find( 'li' ).each( ( index, element ) => {
          $( element ).attr( 'data-page', index );
        } );
      } );

      // Add event listener on each tab
      $( tabs ).find( '.tabs-nav li' ).on( 'click', function() {
        showPage( parseInt( $( this ).attr( 'data-page' ) ) );
      } );

      //select tab by hash
      var hash = window.location.hash;
      if ( hash && $( '.tabs-nav li[data-hash="' + hash + '"]' ).length ) {
        $( '.tabs-nav li[data-hash="' + hash + '"]' ).trigger( 'click' );
      }
      ;
    };

    return this.each( createTabs );
  };
}( jQuery ) );
