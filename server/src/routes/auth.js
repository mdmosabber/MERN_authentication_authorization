const router = require('express').Router();
const authController = require('../controllers/authController');
const {verifyToken} = require('../middleware/auth')



router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route
router.put('/update-profile',verifyToken, authController.updateProfile);






module.exports = router;