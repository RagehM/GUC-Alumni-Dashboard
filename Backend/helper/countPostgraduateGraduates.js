const countPostgraduateGraduates = (graduates) => {
  let malesMasterHolders = 0, femalesMasterHolders = 0, malesPhdHolders = 0, femalesPhdHolders = 0;
  graduates.forEach(graduate => {
    if (graduate.gender == 'male') {
      graduate.postGraduation == 1 ? malesMasterHolders++ : malesPhdHolders++;
    }
    else {
      graduate.postGraduation == 1 ? femalesMasterHolders++ : femalesPhdHolders++;
    }
  });
  return {
    malesMasterHolders,
    femalesMasterHolders,
    malesPhdHolders,
    femalesPhdHolders
  };
}
module.exports = countPostgraduateGraduates;