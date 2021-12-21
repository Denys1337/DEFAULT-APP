( function() {
  const elements = document.querySelectorAll( '[data-1x]' ),
    size     = is2x() ? '2x' : '1x',
    l        = elements.length;

  for ( let i = 0; i < l; i ++ ) {
    setBackgroundImage( elements[i] );
  }

  function setBackgroundImage( element ) {
    let url = element.getAttribute( 'data-' + size );

    if ( ! url ) {
      url = element.getAttribute( 'data-1x' );
    }

    element.style.backgroundImage = 'url(' + url + ')';
  }

  function is2x() {
    return window.devicePixelRatio && window.devicePixelRatio >= 2;
  }
} )();
