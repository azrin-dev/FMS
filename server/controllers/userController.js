const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = mongoose.model('User');
const { promisify } = require('es6-promisify');
const { body, sanitizeBody } = require("express-validator");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mail = require('../handlers/mail');
const axios = require('axios');
const nodemailer = require('../handlers/nodemailer');
const express = require('express');
const app = express();
const passport = require('passport');
// var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const https = require('https');


// Linkedin login 
// passport.use(new LinkedInStrategy({
//          clientID: process.env.LINKEDIN_KEY,
//          clientSecret: process.env.LINKEDIN_SECRET,
//          callbackURL: 'https://biz.azrin.dev/user/login',
//          scope: ['r_emailaddress', 'r_basicprofile'],
//          state: true
//       }, 
//       function(accessToken, refreshToken, profile, done) {         

//          process.nextTick(function () {
//             console.log(accessToken, refreshToken, profile, done);
//             return done(accessToken);
//          });
//       }
// ));

// exports.authLinkedin = async(req, res, next) => {
//    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_KEY}&redirect_uri=https%3A%2F%2Fbiz.azrin.dev/user/login/linkedin&state=${process.env.LINKEDIN_SECRET}&scope=r_liteprofile%20r_emailaddress`;

//    const auth = await axios.get(url);
//    res.json(auth.request.res.responseUrl);
// }

// exports.approvedLinkedin = async(req, res, next) => {

//    const url = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${req.body.code}&redirect_uri=https%3A%2F%2Fbiz.azrin.dev/user/login/linkedin&client_id=${process.env.LINKEDIN_KEY}&client_secret=${process.env.LINKEDIN_SECRET}`;

//    const response = await axios.post(url);

//    const token = response.data.access_token;

//    var options = {
//       "headers": {
//          "Authorization": `Bearer ${token}`,
//          "cache-control": "no-cache",
//          "Connection": "Keep-Alive"
//       }
//    };

//    const profile = await axios.get('https://api.linkedin.com/v2/me', options);
//    res.json(profile.data);

// }

// exports.redirectLinkedin = function(req, res){
//    console.log(req, res);
// }

exports.reqLocation = async(req, res) => {
    let ip = req.ip.slice(7, 20).trim();
    if (ip) {
        let local = await axios.get(`https://geo.ipify.org/api/v1?apiKey=${process.env.IPIFY_KEY}&ipAddress=${ip}`);
        let country = local.data.location.country;
        if (local) res.json({ country });
        else res.json({ country: 'NA' });
    }
}; //

exports.checkMimeType = (req, res, next) => {
    const isFile = req.file.mimetype.startsWith('image/');
    if (isFile) {
        return next();
    } else {
        res.json({ status: 406, message: 'Not Acceptable' });
    }
};

exports.resize = async(req, res, next) => {
    //check if there is no new file to upload
    if (!req.file) {
        return next();
    }
    if (req.file) {
        const extension = req.file.mimetype.split('/')[1];
        const fileName = `${uuidv4()}.${extension}`.toLowerCase();
        req.file.fileName = fileName;
        var buffer = req.file.buffer;

        //Now resize and upload file/photos to public/uploads
        const photo = await jimp.read(buffer);
        await photo.resize(400, jimp.AUTO);
        await photo.write(`src/assets/uploads/${fileName}`);
        return next();
    }
};

// ** Registration **
exports.userExist = async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next();
    }

    res.json({ status: 400, statusText: 'Email already exist. Please login with your email' });

};

exports.register = async(req, res) => {
    const authToken = crypto.randomBytes(20).toString('hex');
    const authTokenExpire = Date.now() + 3600000;
    const user = new User({
        email: req.body.email,
        authToken,
        authTokenExpire
    });
    await user.setPassword(req.body.password);
    const response = await user.save().catch(
        error => res.json(error)
    );
    if (response && response._id) {
      //   var options = {
      //       to: response.email,
      //       authToken: response.authToken
      //   };
      //   const sendEmail = nodemailer.authEmail(options);
        res.json({ response });
    }
};

exports.authenticateAuthToken = async(req, res) => {
    const user = await User.findOneAndUpdate({ authToken: req.body.authToken }, { authenticated: true, terms: true }, { new: true, useFindAndModify: false })
        .catch(error => res.json(error));

    if (user) {

        let currentDate = Date.now();
        let authTokenExpire = user.authTokenExpire.getMilliseconds();
        if (currentDate > authTokenExpire) {
            let jwtToken = user.generateJwt();
            user.token = jwtToken;
            res.json(user);
        } else res.json({ status: 401, statusText: 'Unauthorized' })
    } else res.json({ status: 404, statusText: 'Not found' });
};

// ** Login **

exports.authenticate = async(req, res, next) => {
    const authToken = req.body.authToken;

    const authenticate = User.authenticate();
    const authenticateUser = await authenticate(req.body.email, req.body.password)
        .catch(error => res.json(error));
    const user = authenticateUser.user;

    if (user) {
        const tokenExpiry = user.authTokenExpire.getTime();
        const now = Date.now();

        if (tokenExpiry > now) {
            const authenticated = await User.findOneAndUpdate({ _id: user._id }, { authenticated: true }, { new: true, useFindAndModify: false })
                .catch(error => res.json(error));

            if (authenticated) {
                const token = user.generateJwt();
                res.json({ id: user._id, token });
            } else res.json({ status: 400, statusText: 'Authentication error. Please login again.' });
        } else res.json({ status: 401, statusText: 'Your authentication link has already expired. Please register again.' });
    } else res.json({ status: 400, statusText: 'Authentication link error. Please register again.' });
}; //

exports.login = async(req, res) => {
   console.log(req.body);
    const authenticate = User.authenticate();
    const authenticateUser = await authenticate(req.body.email, req.body.password)
        .catch(error => res.json(error));
    const user = authenticateUser.user;

    if (user) {

        const token = user.generateJwt();
        user.token = token;
        res.json(user);

    } else res.json({ status: 400, statusText: 'Email or password error.' });

};

// ** Profile **
exports.updateProfile = async(req, res) => {
    let objKey = Object.keys(req.body).reduce((acc, key) => {
        if (key != 'type' && '_id') acc = key;
        return acc;
    }, {});
    let objValue = req.body[objKey];
    let data = {};
    data[objKey] = objValue;

    const user = await User.findOneAndUpdate({ _id: req.body._id },
            data, { new: true, useFindAndModify: false }
        )
        .catch(error => res.json(error));

    if (user) res.json(user);
}

exports.updateStateCountryByCity = async(req, res) => {

    let data = res.locals.autoCompleteStateCountry; // { state: 'Pahang', country: 'Malaysia', phonecode: '60' }
    console.log(req.body);
    let phoneCode = Number(data.phonecode);
    const user = await User.findOneAndUpdate({ _id: req.body._id }, { state: data.state, country: data.country, phoneCode }, { new: true, useFindAndModify: false }).catch(error => res.json(error));
    console.log(user);
    if (user && user._id) res.json(user);
};

exports.updateCountryByState = async(req, res) => {
    let data = res.locals.autoCompleteCountry;
    let phoneCode = Number(data.phonecode);
    if (data) {
        const user = await User.findOneAndUpdate({ _id: req.body._id }, { country: data.name, phoneCode }, { new: true, useFindAndModify: false }).catch(error => res.json(error));

        if (user) res.json(user);
    }
};


exports.updateCountry = async(req, res) => {
    let country = res.locals.autoCompleteCountry;
    let phoneCode = Number(country.phonecode);
    const user = await User.findOneAndUpdate({ _id: country.userId }, { phoneCode, country: country.name }, { new: true, useFindAndModify: false }).catch(error => res.json(error));
    if (user && user._id) res.json(user);

};


exports.forgotPassword = async(req, res) => {

    const user = await User.findOne({ email: req.body.email })
        .catch(error => res.json(error));

    if (user) {

        const authToken = crypto.randomBytes(20).toString('hex');
        const authTokenExpire = Date.now() + 3600000;

        const updatedAuthTokenUser = await User.findOneAndUpdate({ _id: user._id }, { authToken, authTokenExpire }, { new: true, useFindAndModify: false })
            .catch(error => res.json(error));

        if (updatedAuthTokenUser) {

            // Send email for password change                           
            const authURL = `http://${req.headers.host}/auth/reset-password-2/${updatedAuthTokenUser.authToken}`;
            var options = {
                user: {
                    email: updatedAuthTokenUser.email
                },
                subject: 'Forgot password authentication',
                html: `
                   <p>IMPORTANT: We have received a request from you to change your password. Please change your password in one hour after receiving this email. If it is not you, please ignore this email.</p>
                   <p>Change your password <a href="${authURL}"> this link</a></br>
                   or this link ${authURL}.</p>`
            };
            var sendMail = mail.send(options);
            res.json({ status: 200, statusText: 'Success. Please check your email to change your password in one hour before link expired.' });

        } else res.json({ status: 400, statusText: 'Fail to generate token, please try again' });
    } else res.json({ status: 400, statusText: 'Email does not exist, please register to login.' });

};

exports.forgotPassword1 = async(req, res, next) => {
    const result = await User.findOne({ email: req.body.email })
        .catch(error => res.json(error));
    console.log(result);
    if (result && result._id) {
        res.locals.user = result;
        return next();
    }
    res.json(result);
}

exports.forgotPassword2 = async(req, res, next) => {
    const user = res.locals.user;
    console.log(user);
    res.json(user);
}

// ** Reset Password
exports.reqValidateResetPassword = [

    body('email').isEmail().normalizeEmail(),
    body('password').not().isEmpty().trim().escape(),
    body('passwordConfirm').not().isEmpty().trim().escape()

];

exports.resetPassword = async(req, res) => {

    const user = await User.findOne({ authToken: req.body.token })
        .catch(error => res.json(error));

    if (user) {

        const tokenExpiry = user.authTokenExpire.getTime();
        const now = Date.now();

        if (tokenExpiry > now) {

            const editedUser = await user.setPassword(req.body.password)
                .catch(error => res.json(error));

            if (editedUser) {
                const jwtToken = user.generateJwt();
                const id = editedUser._id;
                res.json({ status: 200, statusText: 'Password reset successful.', id, jwtToken });
            } else res.json({ status: 401, statusText: 'Error resetting password, please try again.' });

        } else res.json({ status: 401, statusText: 'Your authentication link has already expired. Please re apply forgot password again.' });

    } else res.json({ status: 400, statusText: 'Email or password or link error, please apply to reset your password again.' });

};

exports.profileUser = async(req, res) => {
    const user = await User.findOne({ _id: req.body._id })
        .catch(error => res.json(error));

    if (user && user._id) res.json(user);
    else res.json({ status: 400, statusText: 'User does not exist, please register to login.' });
}; //

// ** Edit Profile
exports.editProfile = async(req, res) => {

    const profile = req.body;
    const user = await User.findOneAndUpdate({ _id: req.body._id }, profile, { new: true, useFindAndModify: false })
        .catch(error => res.json(error));

    if (user) {
        res.json(user);
    } else res.json({ status: 400, statusText: 'Fail to update profile, please try again' });

};

exports.addressAutoComplete = async(req, res) => {

    const query = req.body.address;

    const geocode = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${apiKey}`);
};

exports.saveProfileImage = async(req, res) => {
    const user = await User.findOneAndUpdate({ _id: req.body._id }, { image: req.file.fileName }, { new: true, useFindAndModify: false })
        .catch(error => res.json(error));
    if (user && user._id) res.json(user);
    else res.json({ status: 401, statusText: 'Unauthorized' });

};