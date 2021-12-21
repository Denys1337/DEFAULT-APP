module.exports = (customClass) => {
  if (customClass) {
    return `${customClass}_wrapper`;
  }
  return '';
};
