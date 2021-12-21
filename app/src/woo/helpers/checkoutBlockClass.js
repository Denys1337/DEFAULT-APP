module.exports = function( blockIndex, step ) {
  if ( step > blockIndex ) {
    return 'block-done block-has-content';
  } else if ( step === blockIndex ) {
    return 'block-edited block-empty-content'
  } else {
    return 'block-empty block-empty-content'
  }
}
