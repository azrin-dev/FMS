const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandlers');

const validateController = require('../controllers/validateController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const imageController = require('../controllers/imageController');
const uploadController = require('../controllers/uploadController');
const autoCompleteController = require('../controllers/autoCompleteController');
const companyController = require('../controllers/companyController');
const chartController = require('../controllers/chartController');

const pug = require('pug');

const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });


// ** COMPANY **
router.post('/company/profile/edit',
    catchErrors(companyController.profileEdit)
);

router.post('/charts/regression/linear',
    chartController.linear
);


//  ** USER **
router.get('/user/linkedin',
    catchErrors(userController.authLinkedin)
);

router.post('/user/linkedin/approved',
    catchErrors(userController.approvedLinkedin)
);

router.post('/user/location',
    catchErrors(userController.reqLocation)
);

router.post('/user/register',
    validateController.reqValidateAuth,
    catchErrors(userController.register)
);

router.post('/user/register/authenticate',
    validateController.reqValidateToken,
    catchErrors(userController.authenticateAuthToken)
)

router.post('/user/authenticate',
    validateController.reqValidateAuth,
    catchErrors(userController.authenticate)
);

router.post('/user/login',
    validateController.reqValidateAuth,
    catchErrors(userController.login)
);

router.post('/user/forgot-password',
    validateController.reqValidateForgotPassword,
    catchErrors(userController.forgotPassword)
);

router.post('/user/reset-password',
    userController.reqValidateResetPassword,
    validateController.validationErrors,
    catchErrors(userController.resetPassword)
);

router.post('/user/profile',
    validateController.reqValidateUserId,
    authController.decodeReq,
    catchErrors(authController.getUser),
    catchErrors(userController.profileUser)
);

router.get('/user/profile',
    authController.decodeReq,
    catchErrors(authController.getUserProfile)
);

router.post('/user/profile/update',
    authController.decodeReq,
    validateController.reqValidateUpdateProfile,
    catchErrors(userController.updateProfile)
);

// Autocomplete
router.post('/user/profile/autocomplete/cities',
    autoCompleteController.reqCities
);

router.post('/user/profile/autocomplete/states',
    autoCompleteController.reqStates
);

router.post('/user/profile/autocomplete/countries',
    autoCompleteController.reqCountries
);

// Autocomplete Cities/States/Countries from city
router.post('/user/profile/update/autocomplete/city/state-country',
    authController.decodeReq,
    autoCompleteController.reqStateCountry,
    catchErrors(userController.updateStateCountryByCity)
);

// Autocomplete Cities/States/Countries from state
router.post('/user/profile/update/autocomplete/state/country',
    authController.decodeReq,
    autoCompleteController.reqCountryFromState,
    catchErrors(userController.updateCountryByState)
);

// Autocomplete Country from phonecode
router.post('/user/profile/update/autocomplete/country',
    authController.decodeReq,
    autoCompleteController.reqCountryFromPhonecode,
    catchErrors(userController.updateCountry)
);

router.post('/user/profile/edit',
    authController.decodeReq,
    validateController.reqValidateProfile,
    catchErrors(userController.editProfile)
);

router.post('/user/profile/address',
    catchErrors(userController.addressAutoComplete)
);

router.post('/user/profile/image',
    upload.single('image'),
    userController.checkMimeType,
    userController.resize,
    catchErrors(userController.saveProfileImage)
);




// ** POSTS **
router.get('/posts',
    catchErrors(postController.getAllPost)
);

router.post('/posts/post/new',
    authController.decodeAdminReq,
    validateController.reqValidateNewPost,
    catchErrors(postController.createPost)
);

router.get('/posts/categories',
    catchErrors(postController.getCategories)
);

router.get('/posts/tags',
    catchErrors(postController.getTags)
);

router.post('/posts/post/image/upload',
    imageController.uploadSingle,
    imageController.resize
);

// ** POST **
router.post('/posts/post',
    authController.decodeAdminReq,
    catchErrors(postController.getPost)
);

router.post('/posts/post/comment/new',
    authController.decodeAdminReq,
    validateController.reqValidateNewComment,
    catchErrors(postController.newComment),
    catchErrors(postController.updatePost)
);

router.post('/posts/post/update',
    authController.decodeAdminReq,
    validateController.reqValidateNewPost,
    catchErrors(postController.updateAPost)
);

module.exports = router;