const express = require('express')
const { getUser, deleteUser, createUser } = require('../controllers/users')
const router = express.Router()


router.get('/:id', getUser)
router.post('/', createUser)
router.delete('/:id', deleteUser)

module.exports = router