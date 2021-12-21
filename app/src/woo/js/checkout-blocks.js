/* global jQuery */
import '../../assets/js/block';

const $ = jQuery;

$.fn.wldCheckoutBlocks = function() {
  const $allBlocks = this;

  if ( $allBlocks && $allBlocks.length ) {
    this.each( function( i ) {
      const $block = $( this );

      $block.blockIndex = i;

      if ( $block.hasClass( 'block-static' ) ) {
        return this;
      }

      $block
        .on( 'click', '.btn-edit', () => edit( $block ) )
        .on( 'click', '.btn-save', () => save( $block ) )
        .on( 'click', () => {
          if (
            $block.hasClass( 'block-empty' ) &&
            $block.not( '.block-edited' ) &&
            (
              0 === $block.prev().length ||
              $block.prev().hasClass( 'block-done' ) && $block.prev().not( '.block-edited' )
            )
          ) {
            edit( $block );
          }
        } );
    } );

    function save( $block ) {
      $block.wldBlock();

      let fields = {};
      $.each( $block.find( ':input' ).serializeArray(), function() {
        fields[this.name] = this.value;
      } );

      $.post( {
        dataType: 'json',
        url: theme.ajaxUrl,
        data: {
          nonce: theme.ajaxNonce,
          action: 'get_block_format_content',
          type: $block.data( 'block-type' ),
          fields,
        },
        success: function( response ) {
          $( '.woocommerce-input-wrapper .error' ).remove();
          if ( response.success ) {
            const
              i = $block.blockIndex + 1,
              $newBlock = $( response.data.content );

            $block
              .attr( 'class', $newBlock.attr( 'class' ) )
              .find( '.block-format-content' )
              .replaceWith( $newBlock.find( '.block-format-content' ) );

            next( $allBlocks.eq( i ), i, true );
          } else {
            response.data.map( ( item ) => {
              $( '#' + item.id )
                .closest( '.woocommerce-input-wrapper' )
                .append( `<span class="error">${ item.message }</span>` )
                .end()
                .closest( '.form-row' )
                .addClass( 'woocommerce-invalid' );
            } );
          }

          $block.wldUnblock();
        },
        error: function() {
          $block.wldUnblock();
          alert( 'error' );
        }
      } );
    }

    function edit( $block ) {
      $block.addClass( 'block-edited' );
    }

    function next( $next, i, scroll ) {
      if ( $next.length ) {
        if ( $next.hasClass( 'block-done' ) ) {
          next( $allBlocks.eq( i ++ ), i, scroll );
          return;
        }

        $next.addClass( 'block-edited' );

        const $blocks = $next.closest( '.blocks' );
        if ( $blocks.length ) {
          const allDone = 0 === $blocks.find( '.block:not(.block-done)' ).length;

          if ( allDone ) {
            $blocks.addClass( 'block-done' );
          } else {
            $blocks.addClass( 'block-edited' );
          }
        }

        if ( $next.hasClass( 'block-static' ) ) {
          $next.addClass( 'block-done' );
          next( $allBlocks.eq( i ++ ), i );
        }

        if ( true === scroll ) {
          $( 'html, body' ).animate( {
            scrollTop: $next.offset().top - 140
          }, 1000 );
        }
      }
    }
  }

  return this;
};
