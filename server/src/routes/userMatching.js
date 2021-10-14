const express = require('express');
const { getUserMatching, createUserMatching, updateUserMatching, deleteUserMatching } = require('../controllers/userMatching');
const router = express.Router();

router.get('/:id', getUserMatching)
router.post('/', createUserMatching)
router.delete('/:id', deleteUserMatching)

module.exports = router