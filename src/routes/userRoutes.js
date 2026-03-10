import express from 'express';
const router = express.Router();
import { 
    registerUser, 
    authUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
    
} from '../controllers/userController.js';
import { protect,admin } from '../middlewares/authMiddleware.js';



// Public routes
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/logout', logoutUser);

// Private routes (requires token)
router.route('/profile')
    .get(protect, getUserProfile)    // Get current user's data
    .put(protect, updateUserProfile); // Update name, email, or password


// Get all users (Admin only)
router.route('/').get(protect, admin, getUsers);

// Delete, Get single, or Update a specific user (Admin only)
router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);


export default router;