import express from 'express';
const router = express.Router();
import { authUser,getUserProfile,registerUser,updateUserProfile,loginUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
// @desc Auth user & get token
router.route('/register').post(registerUser);
router.post('/login', authUser);
router.route('/profile').get( protect,getUserProfile).put(protect, updateUserProfile);

// @route POST /api/users/login
//router.route('/profile').put(protect, updateUserProfile);
export default router;