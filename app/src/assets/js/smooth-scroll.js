jQuery( $ => {
  const
    $header = $( '#sticky-header' ),
    fix = 18;

  $( window ).on( 'load', function() {
    setTimeout( function() {
      if ( location.hash ) {
        window.scrollTo( 0, 0 );
        maybeScrollTo( location.hash );
      }
    }, 1 );
  } );

  $( document ).on(
    'click',
    'a[href*="#"]:not([href="#"]):not([href*="popup"]):not(.popup-link)',
    function( e, runMaybeNeedClick ) {
      if ( $( this ).parent().hasClass( 'popup-link' ) ) {
        return;
      }

      if (
        location.pathname.replace( /^\//, '' ) === this.pathname.replace( /^\//, '' ) &&
        location.hostname === this.hostname
      ) {
        if ( e ) {
          e.preventDefault();
        }

        maybeScrollTo( this.hash, e, runMaybeNeedClick );
      }
    }
  );

  function maybeNeedClick( id, link ) {
    let $links = $( '[href="#' + id + '"]' );
    if ( link ) {
      $links = $links.not( link );
    }

    if ( $links.length ) {
      $links.eq( 0 ).trigger( 'click', [ true ] );

      return true;
    }

    return false;
  }

  function maybeScrollTo( hashOrIdOrName, event, runMaybeNeedClick ) {
    if ( hashOrIdOrName.startsWith( '#' ) ) {
      hashOrIdOrName = hashOrIdOrName.slice( 1 );
    }

    if ( true !== runMaybeNeedClick && maybeNeedClick( hashOrIdOrName, event && event.currentTarget ) ) {
      return;
    }

    let $target = $( '#' + hashOrIdOrName );
    if ( 0 === $target.length ) {
      $target = $( '[name=' + hashOrIdOrName + ']' );
    }

    scrollTo( $target );
  }

  function scrollTo( $target ) {
    if ( $target.length ) {
      const offset = $target.offset().top - fix;
      const top = offset - $header.outerHeight();

      $( 'html,body' ).animate( { scrollTop: top }, 1000, function() {
        $( 'html,body' ).animate( { scrollTop: offset - $header.outerHeight() }, 100 );
      } );
    }
  }

  $.fn.wldScrollTo = function() {
    if ( this && this.length ) {
      scrollTo( $( this ).eq( 0 ) );
    }

    return this;
  };
} );
