const express = require('express');
const router = express.Router();


const {sendMail} = require('../controllers/sendingMail')

router.route('/mail').get(sendMail)

module.exports = router