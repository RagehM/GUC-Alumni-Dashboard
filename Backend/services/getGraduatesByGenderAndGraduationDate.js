const Graduates = require("../models/graduates.model");
const getGraduatesByGenderAndGraduationDate = async (gender, graduationDate) => {
  return await Graduates.find({
    gender: `${gender}`,
    graduationDate: `${graduationDate}`
  });
}
module.exports = getGraduatesByGenderAndGraduationDate;