const calculateEmployedGraduates = (graduates) => {
  let countOfEmployedGraduates = 0;
  let countOfUnEmployedGraduates = 0;
  graduates.forEach(graduate => {
    const sortedExperiences = graduate.experiences.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sorted Asc
    if (sortedExperiences.length > 0) {
      sortedExperiences[sortedExperiences.length - 1].endDate === 'present' ? countOfEmployedGraduates++ : countOfUnEmployedGraduates++;
    }
  })
  return {
    countOfEmployedGraduates,
    countOfUnEmployedGraduates
  }
}
module.exports = calculateEmployedGraduates;