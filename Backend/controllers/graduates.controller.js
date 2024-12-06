const Graduates = require("../models/graduates.model");
// const Companies = require("../models/companies.model");
const countGraduatesByGenderAndGraduationDate = require("../services/countGraduatesByGenderAndGraduationDate");
const countPostgraduateGraduates = require("../helper/countPostgraduateGraduates");
const calculateAverageYears = require("../helper/calculateAverageYears");
const getRegions = require("../helper/getRegions");
const calculateEmployedGraduates = require("../helper/calculateEmployedGraduates");
const getGraduatesByGenderAndGraduationDate = require("../services/getGraduatesByGenderAndGraduationDate");
const countWorkMode = require("../helper/countWorkMode");
const countGraduatesByGender = require("../services/countGraduatesByGender");
const getGraduatesByGender = require("../services/getGraduatesByGender");
// Get all graduates
const getGraduates = async (req, res) => {
  try {
    const graduates = await Graduates.find(req.body);
    res.status(200).send(graduates);
  } catch (error) {
    res.status(500).send("error getting graduates");
  }
};

// Get graduate by id
const getGraduateById = async (req, res) => {
  try {
    const { id } = req.params;
    const graduate = await Graduates.findById(id);
    graduate.set(req.body);
    res.status(200).send(graduate);
  } catch (error) {
    res.status(500).send("error getting graduate");
  }
};

// Create a new graduate
const createGraduate = async (req, res) => {
  try {
    await Graduates.insertMany(req.body);
    // Array.isArray(req.body)
    //   ? await Graduates.insertMany(req.body)
    //   : await Graduates.create(req.body);
    res.status(201).send("Graduate added successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// update a graudate by id
const updateGraduateById = async (req, res) => {
  try {
    const { id } = req.params;
    await Graduates.findByIdAndUpdate(id, req.body);
    res.status(200).send("Graduate updated successfully");
  } catch (error) {
    res.status(500).send("error updating graduate");
  }
};

// Delete a graduate by id
const deleteGraduateById = async (req, res) => {
  try {
    const { id } = req.params;
    await Graduates.findByIdAndDelete(id);
    res.status(200).send("Graduate deleted successfully");
  } catch (error) {
    res.status(500).send("error deleting graduate");
  }
};

const getPostgraduateGenderPercentage = async (req, res) => {
  try {
    const { gradDate } = req.params;
    const graduates = await Graduates.find({
      graduationDate: gradDate,
      postGraduation: { $in: [1, 2] },
    });
    const maleCount = await countGraduatesByGenderAndGraduationDate(
      "male",
      gradDate
    );
    const femaleCount = await countGraduatesByGenderAndGraduationDate(
      "female",
      gradDate
    );
    const countResult = {
      maleCount,
      femaleCount,
    };
    const countOfPostGraduateDegreeHolders =
      countPostgraduateGraduates(graduates);
    res
      .status(200)
      .send({ ...countResult, ...countOfPostGraduateDegreeHolders });
  } catch (error) {
    res.status(500).send("Could not get postGraduation percentage");
  }
};

const getYearsTillFirstWorkExperience = async (req, res) => {
  try {
    const { gradDate } = req.params;
    const graduates = await Graduates.find({
      graduationDate: gradDate,
    });
    const result = calculateAverageYears(graduates);
    res.status(200).send(result);
  } catch (error) {
    res
      .status(500)
      .send("Error getting yearsTillFirstWorkExperience for graduates");
  }
};

const getGraduatesLocationAggregate = async (req, res) => {
  try {
    let graduateExperiences = await Graduates.find({}).select("experiences");

    if (req.body.year) {
      const startDate = `${req.body.year}-01-01`;
      const endDate = `${req.body.year + 1}-01-01`;
      for (let i = 0; i < graduateExperiences.length; i++) {
        graduateExperiences[i].experiences = graduateExperiences[
          i
        ].experiences.filter(
          (experience) =>
            experience.startDate >= startDate && experience.startDate < endDate
        );
      }
    }

    let regionsCount = [];

    for (let i = 0; i < graduateExperiences.length; i++) {
      for (let j = 0; j < graduateExperiences[i].experiences.length; j++) {
        const location = graduateExperiences[i].experiences[j].location;
        if (location) {
          const region = await getRegions(location);
          if (region) {
            const index = regionsCount.findIndex(
              (item) => item.region === region
            );
            if (index !== -1) {
              regionsCount[index].count++;
            } else {
              regionsCount.push({ region, count: 1 });
            }
          }
        }
      }
    }
    res.status(200).send(regionsCount);
  } catch (error) {
    res
      .status(500)
      .send("Error getting graduatesLocationAggregate for graduates");
  }
};

const getGraduatesEmploymentPercentage = async (req, res) => {
  try {
    const { gradDate } = req.params;
    let maleGraduates;
    let femaleGraduates;
    if (gradDate) {
      maleGraduates = await getGraduatesByGenderAndGraduationDate(
        "male",
        gradDate
      );
      femaleGraduates = await getGraduatesByGenderAndGraduationDate(
        "female",
        gradDate
      );
    } else {
      maleGraduates = await getGraduatesByGender("male");
      femaleGraduates = await getGraduatesByGender("female");
    }
    const males = calculateEmployedGraduates(maleGraduates);
    const females = calculateEmployedGraduates(femaleGraduates);
    const result = {
      males,
      females,
    };
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Error getting GraduatesEmploymentPercentage for graduates");
  }
};

const getAverageExperience = async (req, res) => {
  try {
    const maleGraduatesExperiences = await Graduates.find({
      gender: "male",
    }).select("experiences");
    const femaleGraduatesExperiences = await Graduates.find({
      gender: "female",
    }).select("experiences");

    let maleCount = 0;
    let femaleCount = 0;
    let totalMaleExperience = 0;
    let totalFemaleExperience = 0;

    for (let i = 0; i < maleGraduatesExperiences.length; i++) {
      for (let j = 0; j < maleGraduatesExperiences[i].experiences.length; j++) {
        if (maleGraduatesExperiences[i].experiences != []) {
          const startDate = new Date(
            maleGraduatesExperiences[i].experiences[j].startDate
          );
          if (maleGraduatesExperiences[i].experiences[j].endDate == "present") {
            var endDate = new Date();
          } else {
            var endDate = new Date(
              maleGraduatesExperiences[i].experiences[j].endDate
            );
          }
          const experience = endDate.getFullYear() - startDate.getFullYear();
          totalMaleExperience += experience;
          maleCount++;
        }
      }
    }

    for (let i = 0; i < femaleGraduatesExperiences.length; i++) {
      for (
        let j = 0;
        j < femaleGraduatesExperiences[i].experiences.length;
        j++
      ) {
        if (femaleGraduatesExperiences[i].experiences != []) {
          const startDate = new Date(
            femaleGraduatesExperiences[i].experiences[j].startDate
          );
          const endDate = new Date(
            femaleGraduatesExperiences[i].experiences[j].endDate
          );
          const experience = endDate.getFullYear() - startDate.getFullYear();
          totalFemaleExperience += experience;
          femaleCount++;
        }
      }
    }

    const averageMaleExperience = totalMaleExperience / maleCount;
    const averageFemaleExperience = totalFemaleExperience / femaleCount;
    const result = {
      averageMaleExperience,
      averageFemaleExperience,
    };

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error getting AverageExperience for graduates");
  }
};

const getGraduatesCount = async (req, res) => {
  try {
    const { gradDate } = req.params;
    const totalCount = await Graduates.countDocuments({
      graduationDate: `${gradDate}`,
    });
    const maleCount = await countGraduatesByGenderAndGraduationDate(
      "male",
      gradDate
    );
    const femaleCount = await countGraduatesByGenderAndGraduationDate(
      "female",
      gradDate
    );
    const result = {
      totalCount,
      maleCount,
      femaleCount,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error getting graduates Count");
  }
};

const getWorkModeCount = async (req, res) => {
  try {
    const { gradDate } = req.params;
    let maleGraduates;
    let femaleGraduates;
    if (gradDate) {
      maleGraduates = await getGraduatesByGenderAndGraduationDate(
        "male",
        gradDate
      );
      femaleGraduates = await getGraduatesByGenderAndGraduationDate(
        "female",
        gradDate
      );
    } else {
      maleGraduates = await getGraduatesByGender("male");
      femaleGraduates = await getGraduatesByGender("female");
    }
    const maleResult = countWorkMode(maleGraduates);
    const femaleResult = countWorkMode(femaleGraduates);
    const result = {
      maleResult,
      femaleResult,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("Error getting workMode Count");
  }
};

const getGraduatesTotalCount = async (req, res) => {
  try {
    const { gradDate } = req.params;
    let maleCount;
    let femaleCount;
    if (gradDate) {
      maleCount = await countGraduatesByGenderAndGraduationDate(
        "male",
        gradDate
      );
      femaleCount = await countGraduatesByGenderAndGraduationDate(
        "female",
        gradDate
      );
    } else {
      maleCount = await countGraduatesByGender("male");
      femaleCount = await countGraduatesByGender("female");
    }
    res.status(200).send({ maleCount, femaleCount });
  } catch (error) {
    res.status(500).send("Error getting GraduatesTotalCount");
  }
};

const getTotalPostGraduation = async (req, res) => {
  try {
    const result = await Graduates.aggregate([
      {
        $match: {
          postGraduation: { $in: [1, 2] },
        },
      },
      {
        $group: {
          _id: {
            $year: { $dateFromString: { dateString: "$graduationDate" } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const formatedResult = result.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});
    res.status(200).send(formatedResult);
  } catch (error) {
    res.status(500).send("Error getting TotalPostGraduation");
  }
};

const getTopHiringCompany = async (req, res) => {
  try {
    const result = await Graduates.aggregate([
      { $unwind: "$experiences" },
      {
        $group: {
          _id: "$experiences.companyName",
          graduateCount: { $sum: 1 },
        },
      },
      { $sort: { graduateCount: -1 } },

      { $limit: 5 },
    ]);

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("error");
    console.error("Error fetching top hiring company:", error);
  }
};

const getInsights = async (req, res) => {
  try {
    const result = await Graduates.aggregate([
      { $unwind: "$experiences" },
      {
        $lookup: {
          from: "companies",
          localField: "experiences.companyName",
          foreignField: "name",
          as: "companyInfo",
        },
      },
      { $unwind: "$companyInfo" },
      {
        $match: {
          "companyInfo.companySize": "10,001+",
        },
      },
      {
        $group: {
          _id: "$companyInfo.name",
          graduateCount: { $sum: 1 },
        },
      },
    ]);

    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send("error");
  }
};

const getGraduatesField = async (req, res) => {
  try {
    const { field } = req.params;
    const result = await Graduates.aggregate([
      { $unwind: "$experiences" },
      {
        $lookup: {
          from: "companies",
          localField: "experiences.companyName",
          foreignField: "name",
          as: "companyInfo",
        },
      },
      { $unwind: "$companyInfo" },
      {
        $match: {
          "companyInfo.field": field,
        },
      },
      {
        $group: {
          _id: null,
          totalGraduates: { $sum: 1 },
        },
      },
    ]);

    if (result.length > 0) {
      res.status(200).send({ totalGraduates: result[0].totalGraduates });
    } else {
      res.status(200).send({ totalGraduates: 0 });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching data.");
  }
};

const getSwitchedGraduates = async (req, res) => {
  const techKeywords = [
    "Software Engineer",
    "Full Stack Engineer",
    "Frontend Developer",
    "MERN Fullstack Developer",
    "Machine Learning Engineer",
    "Salesforce Developer",
    "Flutter Developer",
    "Junior Researcher",
    "IT",
    "Data Structures",
    "Computer Programming",
    "iOS Developer",
    "Lead iOS Engineer",
    "Founding iOS Engineer",
    "Flutter Developer Intern",
    "Software Engineer Intern",
    "Junior Teaching Assistant",
    "Full-stack Developer",
    "Freelance iOS Engineer",
    "Senior Software Engineer",
    "Frontend Web Developer",
  ];

  try {
    const graduates = await Graduates.find();
    let switchedGraduates = [];
    let count = 0;
    graduates.forEach((graduate) => {
      const experiences = graduate.experiences;
      if (experiences && experiences.length > 1) {
        const firstJob = experiences[experiences.length - 1]?.jobTitle || "";
        const lastJob = experiences[0]?.jobTitle || "";
        const firstJobIsTech = techKeywords.some((keyword) =>
          firstJob.includes(keyword)
        );
        const lastJobIsTech = techKeywords.some((keyword) =>
          lastJob.includes(keyword)
        );
        if (firstJobIsTech !== lastJobIsTech) {
          switchedGraduates.push(graduate.name);
          count++;
        }
      }
    });
    res.status(200).send({ count, switchedGraduates });
  } catch (error) {
    console.error("Error occurred: ", error);
    res.status(500).send("Error fetching switched graduates");
  }
};

module.exports = {
  getGraduates,
  getGraduateById,
  createGraduate,
  updateGraduateById,
  deleteGraduateById,
  getPostgraduateGenderPercentage,
  getYearsTillFirstWorkExperience,
  getGraduatesLocationAggregate,
  getGraduatesEmploymentPercentage,
  getAverageExperience,
  getGraduatesCount,
  getWorkModeCount,
  getGraduatesTotalCount,
  getTotalPostGraduation,
  getTopHiringCompany,
  getInsights,
  getGraduatesField,
  getSwitchedGraduates,
};
