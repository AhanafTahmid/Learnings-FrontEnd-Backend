const express = require('express');
const router = express.Router();
const { getAllUsers,
    updateUser,
    deleteUser,
    createUser,
    getAllUserbyId 
} = require('../controllers/user')

router.route('/:id')
.get(getAllUserbyId)
.patch(updateUser)
.delete( deleteUser)

router.route('/')
.post(createUser)
.get(getAllUsers);

module.exports = router;