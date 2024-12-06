const getYearOfFirstWorkExperience = (graduate) => {
  const sortedExperiences = graduate.experiences.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)); // Sorted Asc
  const gradDate = new Date(graduate.graduationDate);
  for (let experience of sortedExperiences) {
    const workDate = new Date(experience.startDate);
    if (workDate > gradDate)
      return workDate.getFullYear();
  }
  return new Date().getFullYear();
}

module.exports = getYearOfFirstWorkExperience;