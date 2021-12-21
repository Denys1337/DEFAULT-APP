/* global jQuery */
const $ = jQuery;

let updateTimeout = false;

$( document.body )
  .on( 'click', '.quantity .qty-btn:not([disabled])', update )
  .on( 'input', '.quantity .qty', change );

function update() {
  if ( updateTimeout !== false ) {
    clearTimeout( updateTimeout );
  }

  const
    $btn = $( this ),
    $qty = $btn.closest( '.quantity' ).find( '.qty' ),
    value = parseInt( $qty.val() ),
    min = $qty.attr( 'min' ) ? parseInt( $qty.attr( 'min' ) ) : 1,
    max = $qty.attr( 'max' ) ? parseInt( $qty.attr( 'max' ) ) : 999;

  if ( $btn.hasClass( 'minus' ) ) {
    if ( value > min && value > 1 ) {
      $qty.val( value - 1 );
    } else {
      $btn.attr( 'disabled', true );
    }
    $btn.closest( '.quantity' ).find( '.plus' ).attr( 'disabled', false );
  } else {
    if ( value < max ) {
      $qty.val( value + 1 );
    } else {
      $btn.attr( 'disabled', true );
    }
    $btn.closest( '.quantity' ).find( '.minus' ).attr( 'disabled', false );
  }

  updateTimeout = setTimeout( trigger, 1000, $qty );
}

function change() {
  const
    $qty = $( this ),
    max = $qty.attr( 'max' ) ? $qty.attr( 'max' ) : '999';

  if ( parseInt( $qty.val() ) === 0 ) {
    $qty.val( 1 );
  }

  if ( $qty.val().length > max.length ) {
    $qty.val( $qty.val().slice( 0, max.length ) );
  } else {
    if ( parseInt( $qty.val() ) > parseInt( max ) ) {
      $qty.val( max );
    }
  }
}

function trigger( $qty ) {
  $qty.trigger( 'change' );
  updateTimeout = false;
  $( '[name="update_cart"]' ).trigger( 'click' );
}
