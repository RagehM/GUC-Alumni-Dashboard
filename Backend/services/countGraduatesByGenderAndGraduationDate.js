const Graduates = require("../models/graduates.model");

const countGraduatesByGenderAndGraduationDate = async (gender, graduationDate) => {
  return await Graduates.countDocuments({
    gender: `${gender}`,
    graduationDate: `${graduationDate}`
  });
}
module.exports = countGraduatesByGenderAndGraduationDate;