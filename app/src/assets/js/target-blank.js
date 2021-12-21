jQuery( $ => {
  //opening external and files links in new tab, exclude #, tel: and mailto:
  $( 'a:not([href^="#"]):not([href^="tel:"]):not([href^="mailto:"]):not([href^="javascript:void(0)"]):not(.target-self)' )
    .filter( function() {
      const isExternal = this.hostname !== window.location.hostname,
        isFile = ~ this.pathname.indexOf( '.' ) && - 1 === this.pathname.indexOf( '.php' );
      return isExternal || isFile;
    } ).attr( {
    'target': '_blank',
    'rel': 'noopener'
  } );
} );
