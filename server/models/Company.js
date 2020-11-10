const mongoose = require('mongoose');
const schema = mongoose.Schema;
const validator = require('validator');


const companySchema = new mongoose.Schema({
    created: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        lowercase: true,
        trim: true
    },
    registration: {
        type: String,
        lowercase: true,
        trim: true
    },
    type: {
       type: String,
       lowercase: true,
       trim: true
    },
    address: {
       type: String,
       lowercase: true,
       trim: true
    },
    address2: {
       type: String,
       lowercase: true,
       trim: true
    },
    city: {
       type: String,
       lowercase: true,
       trim: true
    },
    state: {
       type: String,
       lowercase: true,
       trim: true
    },
    country: {
       type: String,
       lowercase: true,
       trim: true
    },
    postCode: {
       type: String,
       lowercase: true,
       trim: true 
    },
    phoneCode: {
       type: String,
       lowercase: true,
       trim: true
    },
    phone: {
        type: String,
        lowercase: true,
        trim: true
    },
    phone2: {
       type: String,
       lowercase: true,
       trim: true
    },
    fax: {
        type: String,
        lowercase: true,
        trim: true
    },
    email: {
       type: String,
       lowercase: true,
       trim: true
    },
    owner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      autopopulate: true
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Company', companySchema);