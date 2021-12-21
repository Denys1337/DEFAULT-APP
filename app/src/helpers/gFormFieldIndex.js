const gFormIndex = require( './gFormIndex' );
let lastGFormIndex = 0,
  gFormFieldIndex = 0;

module.exports = function( next ) {
  const currentGFormIndex = gFormIndex();

  if ( lastGFormIndex !== currentGFormIndex ) {
    lastGFormIndex = currentGFormIndex;
    gFormFieldIndex = 0;
  }


  if ( true === next ) {
    gFormFieldIndex ++;
  }

  return gFormFieldIndex;
};
