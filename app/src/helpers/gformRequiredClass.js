module.exports = (required) => {
  if (required) {
    return 'gfield_contains_required';
  }
  return '';
};
