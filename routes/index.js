const express = require("express");
const router = express.Router();

const pvisitorData = require('../controllers/formdata')
const gActiveEvents = require('../controllers/getactiveevents')
const gCurrentOpening = require('../controllers/currentopening')
const pModalContact = require('../controllers/modalcontactus');
const pSendOpeningMail = require('../controllers/sendopeningapplicationmail');
const pOpeningApplication = require('../controllers/openingapplication');
const pContactUS = require('../controllers/contactus');
const pUpload = require('../controllers/upload');
const pHireResource = require('../controllers/hireourresource');

const validate = require('../middlewares/validator');
const { bodyValidation } = require('../validations');

router.post('/formdata/userdetails/:id', pvisitorData.next);
router.post('/formdata/visitordata/:id', pvisitorData.visitordata);
router.post('/event/getactiveevents', gActiveEvents.getActiveEvents);
router.get('/career/currentopening', gCurrentOpening.getCurrentOpening);
router.post('/contact/modalcontactus',validate(bodyValidation.modalContactValidate),pModalContact.modalContact)
router.post('/contact/openingapplication', pOpeningApplication.openingApplication)
router.post('/contact/sendopeningapplicationmail', pSendOpeningMail.sendOpeningApplication)
router.post('/contactus/inquiry',validate(bodyValidation.inquiryValidate), pContactUS.getContacted)
router.post('/hiredeveloper/hireourresource',validate(bodyValidation.hireDevelopValidate), pHireResource.hireResource)
router.post('/upload/:aid',pUpload.uploadFile)

module.exports = router;