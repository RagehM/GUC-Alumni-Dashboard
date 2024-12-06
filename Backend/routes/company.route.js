const express = require('express');
const router = express.Router();
const { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany, importCompaniesJson} = require('../controllers/company.controller.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });



router.get('/', getCompanies);
router.get('/:id', getCompanyById);

router.post('/', createCompany);
router.post('/import', upload.single('companies'), importCompaniesJson);

router.put('/:id', updateCompany);

router.delete('/:id', deleteCompany);

module.exports = router;