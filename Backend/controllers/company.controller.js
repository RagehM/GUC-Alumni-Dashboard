const Company = require('../models/company.model');
const fs = require('fs');


// get all companies

const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get company by id
const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findById(id);
        res.status(200).json(company);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// create a new company
const createCompany = async (req, res) => {
    try {
        const company = await Company.create(req.body);
        res.status(200).json(company);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// import companies from a JSON file
const importCompaniesJson = async (req, res) => {
    try {
        const companies = JSON.parse(fs.readFileSync(req.file.path, 'utf-8'));

        if (!Array.isArray(companies)) {
            res.status(400).json({ message: 'Invalid JSON file' });
        }

        const inserted = await Company.insertMany(companies);

        res.status(200).json({message: 'Companies imported successfully', inserted });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// update a company by id
const updateCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndUpdate(id, req.body);
        res.status(200).json(company);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// delete a company by id
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        const company = await Company.findByIdAndDelete(id);
        res.status(200).json(company);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, importCompaniesJson };
