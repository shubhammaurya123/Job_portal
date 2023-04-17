const express = require('express');
const router = express.Router();

const { getSearchedJob, getSingleJob,updateStudentApplied,getEducationField ,  updateStudentApproved, updateStudentRejected } = require('../controllers/jobController')

router.route('/job').get(getSearchedJob)
router.route('/job/:title/:_id').get(getSingleJob)
router.route("/job/:id/:jobId").patch(updateStudentApplied);
router.route("/job/rejectedStudent/:id/:jobId").patch(updateStudentRejected)
router.route("/job/apporvedStudent/:id/:jobId").patch(updateStudentApproved)

module.exports = router