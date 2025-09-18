import express from 'express';
import {protectRoute} from '../middlewares/auth.middleware.js';
import {getUserProfile,
        syncUser , 
        getCurrentUser ,
        updateUserProfile,
        followUser
    } from '../controllers/user.controller.js';

const router = express.Router();

    router.get('/profile/:username', getUserProfile); 

    router.post('/sync', protectRoute, syncUser);
    
    router.post('/me', protectRoute, getCurrentUser);

    //update
    router.put('/profile', protectRoute, updateUserProfile); 
    //follow
    router.post('/follow/:targetUserId', protectRoute, followUser);

export default router;
