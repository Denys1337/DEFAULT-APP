import {FontLoader} from './fonts-loader';

/**
 * Array of strings that enumerate fonts, format of string "font name:weight(separated by commas)"
 * @typedef {string[]} googleFonts
 */


/**
 * @param {googleFonts} fonts
 */
export function getGoogleFontsUrlByFonts( fonts ) {
  const format_fonts = [];
  const url = 'https://fonts.googleapis.com/css';
  const text = 'abcdefghijklmnopqrstuvwxyz-ABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789,.!?&%$#@;:/|\\\'"`^{}[]()<>+=*~';

  fonts.forEach( font => {
    const parts = font.split( ':' );
    parts[0] = parts[0].replace( / /g, '+' );
    format_fonts.push( parts.join( parts.length === 2 && parts[1] !== '' ? ':' : '' ) );
  } );

  return url + '?family=' + format_fonts.join( '%7C' ) + '&text=' + encodeURIComponent( text );
}

export class GoogleFontsLoader extends FontLoader {
  /**
   * @param {googleFonts} fonts
   */
  constructor( fonts ) {
    super( 'google', getGoogleFontsUrlByFonts( fonts ) );
  }
}

/**
 * @param {googleFonts} fonts
 */
export default function( fonts ) {
  new GoogleFontsLoader( fonts );
}
