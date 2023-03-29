const express = require('express');
const router = express.Router();

const{getUserDetail,getUserJob,updateJobApplied,updateJobBookmarked,deleteBookmarkedJob, likeJob, dislikeJob,sendUserOtp,verifyUserOtp,sendTempPassword,changePassword, verifyTempPassword , getAllUser} = require('../controllers/userController')


router.route('/sendOtp').post(sendUserOtp)
router.route('/getAllUser').get(getAllUser)
router.route('/verifyOtp').post(verifyUserOtp)
router.route('/').get(getUserDetail)
router.route('/:jobId').get(getUserJob);
router.route("/:id/:jobId").patch(updateJobApplied);
router.route('/bookmark/:id/:jobId').patch(updateJobBookmarked);
router.route('/bookmark/:id/:jobId').delete(deleteBookmarkedJob);
router.route('/action/like/:jobId').patch(likeJob)
router.route('/action/dislike/:jobId').patch(dislikeJob)
router.route('/sendTempPassword').post(sendTempPassword)
router.route('/verifyTempPassword').post(verifyTempPassword)
router.route('/changePassword').post(changePassword)
module.exports = router