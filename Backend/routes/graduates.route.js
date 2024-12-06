const express = require("express");
const {
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
} = require("../controllers/graduates.controller.js");
const router = express.Router();

router.get("/", getGraduates);
router.get("/:id", getGraduateById);
router.get(
  "/batch/postgraduate-gender-percentage/:gradDate?",
  getPostgraduateGenderPercentage
);
router.get(
  "/batch/getYearsTillFirstWorkExperience/:gradDate",
  getYearsTillFirstWorkExperience
);
router.get("/batch/graduatesLocationAggregate", getGraduatesLocationAggregate);
router.get(
  "/batch/getGraduatesEmploymentPercentage/:gradDate?",
  getGraduatesEmploymentPercentage
);
router.get("/batch/getAverageExperience", getAverageExperience);
router.get("/batch/getGraduatesCount/:gradDate", getGraduatesCount);
router.get("/batch/getWorkModeCount/:gradDate?", getWorkModeCount);
router.get("/batch/getGraduatesTotalCount/:gradDate?", getGraduatesTotalCount);
router.get("/batch/getTotalPostGraduation", getTotalPostGraduation);
router.get("/batch/getTopHiringCompany", getTopHiringCompany);
router.get("/batch/getInsights", getInsights);
router.get("/batch/getGraduatesField/:field", getGraduatesField);
router.get("/batch/getSwitchedGraduates", getSwitchedGraduates);

router.post("/", createGraduate);

router.put("/:id", updateGraduateById);

router.delete("/:id", deleteGraduateById);

module.exports = router;
