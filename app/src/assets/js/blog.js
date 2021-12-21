jQuery( document ).ready( ( $ ) => {
  //Script for archive list in blog. If there isn't blog on the site it should remove
  $( '.archive-title:contains("Archive")' ).parent().addClass( 'archive-widget' );
  $( '.archive-widget li' ).each( function( i, item ) {
    var text = $( item ).find( 'a' ).text();
    var year = text.slice( text.indexOf( ' ' ) + 1 );
    $( item ).find( 'a' ).text( $( item ).find( 'a' ).text().slice( 0, text.indexOf( ' ' ) + 1 ) );

    if ( $( '.archive-widget' ).find( '.' + year ).length ) {
      $( item ).detach().appendTo( '.' + year + ' .year-group' );
    } else {
      $( '.archive-widget > ul' )
        .append( '<li class="' + year + '">' + year + '<ul class="year-group"></ul></li>' );
      $( item ).detach().appendTo( '.' + year + ' .year-group' );
    }
  } );
  $( '.archive-widget > ul > li' ).on( 'click', function() {
    $( this ).find( '.year-group' ).slideToggle();
  } );
  $( '.archive-widget > ul > li a' ).on( 'click', function( e ) {
    e.stopPropagation();
  } );
} );
