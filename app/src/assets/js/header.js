jQuery( ( $ ) => {
  //Mobile menu open/close
  const openBtn = document.getElementById( 'open-button' );
  let isOpen = false;

  function toggleMenu() {
    if ( isOpen ) {
      $( 'body' ).removeClass( 'show-menu' );
    } else {
      $( 'body' ).addClass( 'show-menu' );
    }
    isOpen = ! isOpen;
  }

  $( '#open-button' ).on( 'click', toggleMenu );
  $( '#close-button' ).on( 'click', toggleMenu );
  $( '.btn-close' ).on( 'click', ( { target } ) => {
    if ( isOpen && target !== openBtn ) {
      toggleMenu();
    }
  } );

  // mobile menu expand/minimize
  const $hasChildrenItem = $( '.menu-wrap .menu-item-has-children' );
  $hasChildrenItem.prepend( '<div class="expand-btn"></div>' );
  $( '.expand-btn' ).on( 'click', ( event ) => {
    const $menuItem = $( event.currentTarget ).parent();
    const $parentItem = $( event.currentTarget ).parent().parent();

    if ( $menuItem.hasClass( 'open' ) ) {
      $parentItem.find( '.menu-item-has-children' ).removeClass( 'open' );
    } else {
      $parentItem.find( '.menu-item-has-children' ).removeClass( 'open' );
      $menuItem.addClass( 'open' );
    }
  } );

  //sticky header
  const $sticky = $( '#sticky-header' );
  if ( $sticky.length ) {
    const stickyHeaderTop = $sticky.get( 0 ).clientHeight;
    $( document ).on( 'scroll', () => {
      if ( $( window ).scrollTop() > stickyHeaderTop ) {
        $sticky.addClass( 'fixed' ).removeClass( 'unfixed' );
      } else {
        $sticky.removeClass( 'fixed' ).addClass( 'unfixed' );
      }
    } );
  }
} );
