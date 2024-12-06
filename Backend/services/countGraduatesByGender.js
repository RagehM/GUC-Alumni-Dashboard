const Graduates = require('../models/graduates.model');

const countGraduatesByGender = async (gender) => {
  return await Graduates.countDocuments({ gender: `${gender}` })
}
module.exports = countGraduatesByGender;