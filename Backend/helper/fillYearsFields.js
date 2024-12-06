const fillYearsFields = (totalYearsOfExperience, gender) => {
  return {
    '0-1': totalYearsOfExperience[gender][0],
    '1-2': totalYearsOfExperience[gender][1],
    '2-3': totalYearsOfExperience[gender][2],
    '3-4': totalYearsOfExperience[gender][3],
    '4-5': totalYearsOfExperience[gender][4],
    '+5': totalYearsOfExperience[gender][5],
  }
}
module.exports = fillYearsFields;