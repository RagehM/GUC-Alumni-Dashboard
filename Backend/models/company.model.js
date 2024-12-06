const { Schema, model } = require("mongoose");

const CompanySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  field: {
    type: String,
    required: false,
  },
  avgSalary: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  founded: {
    type: Date,
    required: false,
  },
  headQuarters: {
    type: String,
    required: false,
  },
  companySize: {
    type: String,
    required: false,
  },
});

const Company = model("Company", CompanySchema);

module.exports = Company;
