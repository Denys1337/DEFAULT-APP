/* global jQuery */
( function( $ ) {
  $.fn.wldBlock = function() {
    if ( this && this.length ) {
      this.each( function() {
        const
          $element = $( this ),
          oldPosition = $element.css( 'position' ),
          $div = $( '<div>', {
            css: {
              cursor: 'wait',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              zIndex: 100,
              background: '#fff',
              opacity: '0.5',
            }
          } );

        if ( 'relative' !== oldPosition && 'absolute' !== oldPosition ) {
          $element.css( 'position', 'relative' );
          $element.data( 'block-old-position', oldPosition );
        }

        $element.data( 'block-div', $div ).append( $div );

      } );
    }

    return this;
  };

  $.fn.wldUnblock = function() {
    if ( this && this.length ) {
      this.each( function() {
        const
          $element = $( this ),
          oldPosition = $element.data( 'block-old-position' ),
          $div =  $element.data( 'block-div' );

        if ( oldPosition ) {
          $element.css( 'position', oldPosition );
        }

        if ( $div ) {
          $div && $div.remove();
        }
      } );
    }

    return this;
  };
} )( jQuery );
