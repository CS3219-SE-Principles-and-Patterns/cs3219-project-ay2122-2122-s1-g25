const express = require('express')
const { getUser, deleteUser, createUser, updateUser } = require('../controllers/users')
const router = express.Router()


router.get('/:id', getUser)
router.post('/create', createUser)
router.put('/update', updateUser)
router.delete('/:id', deleteUser)

module.exports = router