const express = require('express');
const router = express.Router();

const {postSearchDesignation, getSearchDesignation, postTopProfile, getTopProfile, postLocation, getLocation, updateLocationClickCount} = require('../controllers/adminController')

router.route('/designation').post(postSearchDesignation)
router.route('/designation').get(getSearchDesignation)
router.route('/top_profile').post(postTopProfile)
router.route('/top_profile').get(getTopProfile)
router.route('/location').post(postLocation)
router.route('/location').get(getLocation)
router.route('/location/:searchLocation').post(updateLocationClickCount)

module.exports = router