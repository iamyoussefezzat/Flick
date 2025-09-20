import express from 'express';
import { getPosts , getPost , getUserPosts, createPost, likePost, deletePost } from '../controllers/post.controller.js';
import {protectRoute} from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

//public routes
router.get('/', getPosts);
router.get('/:postId',getPost );
router.get('//user/:username',getUserPosts );

//protected routes
router.post('/',protectRoute, upload.single("image") , createPost);  
router.post('/:post:Id/like',protectRoute, upload.single("image") , likePost);  
router.post('/:post:Id',protectRoute, upload.single("image") , deletePost);  






export default router;