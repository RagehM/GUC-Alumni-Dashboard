const countWorkMode = (graduates) => {
  let onSiteCount = 0;
  let hybridCount = 0;
  let remoteCount = 0;
  graduates.forEach(graduate => {
    const sortedExperiences = graduate.experiences.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    if (sortedExperiences.length > 0) {
      const element = sortedExperiences[sortedExperiences.length - 1].workMode;
      element === 'remote' ? remoteCount++ : element === 'hybrid' ? hybridCount++ : onSiteCount++;
    }
  });
  return {
    onSiteCount,
    hybridCount,
    remoteCount
  }
}
module.exports = countWorkMode;