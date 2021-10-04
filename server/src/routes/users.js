const express = require('express')
const { getUser, deleteUser, createUser } = require('../controllers/users')
const router = express.Router()


router.get('/:id', getUser)
router.post('/create', createUser)
// router.put('/update', updateUser)
router.delete('/:id', deleteUser)

module.exports = router