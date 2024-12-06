const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "companyName is required for experience"],
  },
  location: {
    type: String,
    default: null,
  },
  jobTitle: {
    type: String,
    required: [true, "jobTitle is required for experience"],
  },
  startDate: {
    type: String,
    required: [true, "startDate is required for experience"],
  },
  endDate: {
    type: String,
    required: [true, "endDate is required for experience"],
  },
  jobType: {
    type: String,
    enum: {
      values: [
        "internship",
        "part time",
        "full time",
        "freelance",
        "seasonal",
        "contract",
        "self employed",
        "Apprenticeship",
        "apprenticeship",
      ],
      message: "Not a valid jobType",
    },
    default: "full time",
  },
  jobLevel: {
    type: String,
    enum: {
      values: ["junior", "senior", "manager", "techlead"],
      message: "Not a valid jobLevel",
    },
    default: null,
  },
  workMode: {
    type: String,
    enum: {
      values: ["on-site", "hybrid", "remote"],
      message: "Not a valid workMode",
    },
    default: "on-site",
  },
});

const graduatesSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required for graduates"],
  },
  graduationDate: {
    type: String,
    required: [true, "graduationDate is required for graduates"],
    // min: [2008, 'graduationDate must be atleast 2008'],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Not a valid gender",
    },
    required: [true, "gender is required for graduates"],
  },
  age: {
    type: Number,
    default: null,
  },
  major: {
    type: String,
    default: "MET",
  },
  experiences: {
    type: [experienceSchema],
    default: [],
  },
  postGraduation: {
    type: Number,
    enum: {
      values: [0, 1, 2], // 0 for not holding Masters or Phd, 1 for Masters, 2 for Phd
      message: "Not a valid postGraduation",
    },
    default: 0,
  },
});

const graduate = mongoose.model("Graduate", graduatesSchema);
module.exports = graduate;
