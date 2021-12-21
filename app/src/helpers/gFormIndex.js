let gFormIndex = 0;

module.exports = function( next ) {
  if ( true === next ) {
    gFormIndex ++;
  }

  return gFormIndex;
};
