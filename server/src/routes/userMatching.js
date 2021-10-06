const express = require('express');
const { getUserMatching, createUserMatching, updateUserMatching, deleteUserMatching } = require('../controllers/userMatching');
const router = express.Router();

router.get('/:id', getUserMatching)
router.post('/', createUserMatching)
router.put('/:id', updateUserMatching)
router.delete('/:id', deleteUserMatching)

module.exports = router