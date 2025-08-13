import express from 'express';
const router = express.Router();
import { authUser,getUserProfile,registerUser,updateUserProfile,loginUser,deleteUser ,getUsers,updateUser,getUserById} from '../controllers/userController.js';
import { protect,admin } from '../middleware/authMiddleware.js';
// @desc Auth user & get token
router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/login', authUser);
router.route('/profile').get( protect,getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);
router.route('/:id').get(protect, admin, getUserById);
router.route('/:id').put(protect, admin, updateUser);


// @route POST /api/users/login
//router.route('/profile').put(protect, updateUserProfile);
export default router;