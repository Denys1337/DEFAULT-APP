module.exports = (fileSize) => {
  if (fileSize) {
    return fileSize * 1048576;
  }
  return 104857600;
};
