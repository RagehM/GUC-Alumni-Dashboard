const getYearOfFirstWorkExperience = require('./getYearOfFirstWorkExperience')
const fillYearsFields = require('./fillYearsFields');
const calculateAverageYears = (graduates) => {
  let totalYearsOfExperience = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];
  graduates.forEach(graduate => {
    const year = getYearOfFirstWorkExperience(graduate);
    const yearsTillFirstWorkExperience = year - new Date(graduate.graduationDate).getFullYear();
    const genderIndex = graduate.gender === 'male' ? 0 : 1;
    const experienceIndex = yearsTillFirstWorkExperience >= 5 ? 5 : yearsTillFirstWorkExperience;
    totalYearsOfExperience[genderIndex][experienceIndex]++;
  });
  const yearsForMales = fillYearsFields(totalYearsOfExperience, 0);
  const yearsForFemales = fillYearsFields(totalYearsOfExperience, 1);
  return {
    yearsForMales,
    yearsForFemales
  }
}
module.exports = calculateAverageYears;