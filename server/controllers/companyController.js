const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Company = mongoose.model('Company');
const { promisify } = require('es6-promisify');
const { findOneAndUpdate, findOne } = require('../models/User');
const { error } = require('protractor');
const { throwError } = require('rxjs');

// Create Mail Contact
exports.profileEdit = async(req, res) => {

    console.log('Recieve new properties ..');
    console.log(req.body);

    const _id = req.body.company.id;
    const prop = req.body.company.name;
    const value = req.body.company.value;

    if (!_id) {
        console.log('Creating a new company ..');
        const co = new Company();
        co[`${prop}`] = value;

        console.log('Create Company property from req ..');
        console.log(co);

        console.log('Save company to db ..');
        const newCompany = await co.save()
            .catch(error => console.log(error));

        console.log(newCompany);
        res.json(newCompany);
    }
};

exports.checkCompanyExist = async (req, res, next) => {
   const existingCompany = await Company.findOne({name: req.body.name}).catch(
      error => res.json(error)
   );
   if(!existingCompany) return next();
   else res.json({status: 'exist'});
}

exports.saveNewCompany = async (req, res) => {   
   const newCompany = new Company(req.body);
   const company = await newCompany.save().catch(
      error => res.json(error)
   );
   if(company && company._id){
      res.json(company);
   }
   
}

exports.getCompanies = async (req, res) => {
   const companies = await Company.find({owner: req.body.owner}).catch(
      error => res.json(error)
   );
   if(companies && companies.id != ''){
      console.log(companies);
      res.json(companies);
   }
}