const express = require('express');
const router = express.Router();

const { getSearchedJob, getSingleJob,updateStudentApplied,getEducationField } = require('../controllers/jobController')

router.route('/job').get(getSearchedJob)
router.route('/job/:title/:_id').get(getSingleJob)
router.route("/job/:id/:jobId").patch(updateStudentApplied);

module.exports = router