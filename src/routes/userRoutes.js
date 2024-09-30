const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to create a new user
router.post('/register', userController.createUser);

// Route to get all users
router.get('/getAll', userController.getAllUsers);

// Route to get a user by ID
router.get('/:username', userController.getUserByUserName);

// Route to update a user
router.put('/update/:username', userController.updateUser);

// Route to delete a user
router.delete('/delete/:username', userController.deleteUser);

module.exports = router;
