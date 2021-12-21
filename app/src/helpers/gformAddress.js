module.exports = (
  hasStreet,
  hasStreet2,
  hasCity,
  hasState,
  hasZip,
  hasCountry) => {
  let addressClasses = '';
  if (hasStreet) {
    addressClasses+=" has_street";
  }
  if (hasStreet2) {
    addressClasses+=" has_street2";
  }
  if (hasCity) {
    addressClasses+=" has_city";
  }
  if (hasState) {
    addressClasses+=" has_state";
  }
  if (hasZip) {
    addressClasses+=" has_zip";
  }
  if (hasCountry) {
    addressClasses+=" has_country";
  }
  return addressClasses;
};
