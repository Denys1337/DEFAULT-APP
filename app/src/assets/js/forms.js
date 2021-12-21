/* global jQuery, theme, grecaptcha */

const $ = jQuery;
const gravityFormsReloadStorage = {};
const gravityFormsCheckPopupIntervalsStorage = {};

window.wldReCaptchaInit = function() {
  const $reCaptchaFields = $( theme.reCaptchaInvisibleHolderClassName );

  $reCaptchaFields.each( function() {
    const $form = $( this ).closest( 'form' );

    reCaptchaInit( $form, getGravityFormID( $form ) );
  } );
};

$( function() {
  const $reCaptchaFields = $( theme.reCaptchaInvisibleHolderClassName );
  if ( $reCaptchaFields.length ) {
    $reCaptchaFields.closest( 'form' ).one( 'focus', ':input', function() {
      $( 'head' ).append(
        $( '<script/>' ).attr( 'src', 'https://www.google.com/recaptcha/api.js?onload=wldReCaptchaInit&render=explicit' )
      );
    } );
  }

  const $gravityFormsWrappers = $( '.gform_wrapper' );
  if ( $gravityFormsWrappers.length ) {
    $gravityFormsWrappers.each( function() {
      const $gravityForm = $( this );
      const gravityFormId = getGravityFormID( $gravityForm );

      gravityFormsReloadStorage[ gravityFormId ] = new GravityFormsReload( $gravityForm, gravityFormId );
    } );
  }
} );

$( document )
  .on( 'gform_confirmation_loaded', function( event, gravityFormId ) {
    if ( typeof gravityFormsReloadStorage[ gravityFormId ] !== 'undefined' ) {
      gravityFormsReloadStorage[ gravityFormId ].reloadForm();
    }
  } )
  .on( 'gform_post_render', function( event, gravityFormId, currentPage ) {
    if ( currentPage ) {
      reCaptchaInit( $( '#gform_' + gravityFormId ), gravityFormId );
    }
  } );

class GravityFormsReload {
  constructor( $gform, gFormId ) {
    this.$parent = $gform.parent();
    this.html = this.$parent.html();
    this.gFormId = gFormId;
  }

  reloadForm() {
    const $message = this.$parent.find( '#gform_confirmation_wrapper_' + this.gFormId );
    if ( $message.length ) {
      this.$parent.html( this.html ).append( $message );

      $( document ).trigger( 'gform_post_render', [ this.gFormId, 1 ] );
    }
  };
}

function getGravityFormID( $form ) {
  if ( $form.is( '[id^="gform_"]' ) ) {
    return parseInt( $form.attr( 'id' ).match( /\d+$/ )[ 0 ], 10 );
  }

  return 0;
}

function reCaptchaInit( $form, gFormId = 0 ) {
  const $holder = $form.find( theme.reCaptchaInvisibleHolderClassName );

  if (
    typeof grecaptcha !== 'undefined' && typeof grecaptcha.render !== 'undefined' &&
    typeof theme !== 'undefined' && $holder.is( ':empty' )
  ) {
    const holderId = grecaptcha.render( $holder.get( 0 ), {
      'sitekey': theme.reCaptchaInvisibleSiteKey,
      'size': 'invisible',
      'badge': theme.reCaptchaInvisibleBadgePosition,
      'callback': function() {
        $form.trigger( 'submit', [ true, true ] );
      },
      'expired-callback': function() {
        grecaptcha.reset( holderId );
      }
    } );

    $form.on( 'submit', function( e, i, executedRecaptcha ) {
      if ( ! executedRecaptcha ) {
        e.preventDefault();
        grecaptcha.execute( holderId );

        if ( gFormId ) {
          $( '#gform_confirmation_message_' + gFormId ).remove();

          setTimeout( function() {
            if ( ! gravityFormsCheckPopupIntervalsStorage[ gFormId ] ) {
              gravityFormsCheckPopupIntervalsStorage[ gFormId ] = setInterval( function() {
                const $iframe = $( 'iframe[src*="recaptcha/api2/bframe"]' );

                // Exit if has open recaptcha
                if ( $iframe.length ) {
                  for ( let i = 0; i < $iframe.length; i++ ) {
                    if ( 'visible' === $iframe.eq( i ).parent().parent().css( 'visibility' ) ) {
                      return;
                    }
                  }
                }

                $( '#gform_ajax_spinner_' + gFormId + ':not(.verification-passed)' ).hide();
                clearInterval( gravityFormsCheckPopupIntervalsStorage[ gFormId ] );
                gravityFormsCheckPopupIntervalsStorage[ gFormId ] = false;
              }, 1000 );
            }
          }, 500 );
        }
      } else {
        if ( gFormId ) {
          $( '#gform_ajax_spinner_' + gFormId ).addClass( 'verification-passed' ).show();
        }
      }
    } );
  }
}
