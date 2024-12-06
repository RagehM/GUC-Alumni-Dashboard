const Graduates = require('../models/graduates.model');
const getGraduatesByGender = async (gender) => {
  return await Graduates.find({
    gender: `${gender}`
  });
}
module.exports = getGraduatesByGender;