const express = require('express');
const { getAllUserMatchings, createUserMatching } = require('../controllers/userMatchingController');
const router = express.Router();

router.route('/matchUser')
    .get(getAllUserMatchings)
    .post(createUserMatching);

module.exports = router