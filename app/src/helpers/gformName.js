module.exports = (
  hasPrefix,
  hasFirstName,
  hasMiddleName,
  hasLastName,
  hasSuffix) => {
  let addressClasses = '';
  let nameHasClass = 0;
  if (hasPrefix) {
    addressClasses+=" has_prefix";
    nameHasClass++;
  }
  if (hasFirstName) {
    addressClasses+=" has_first_name";
    nameHasClass++;
  }
  if (hasMiddleName) {
    addressClasses+=" has_middle_name";
    nameHasClass++;
  }
  if (hasLastName) {
    addressClasses+=" has_last_name";
    nameHasClass++;
  }
  if (hasSuffix) {
    addressClasses+=" has_suffix";
    nameHasClass++;
  }
  addressClasses+=` gf_name_has_${nameHasClass}`;
  return addressClasses;
};
