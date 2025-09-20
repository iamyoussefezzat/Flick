import asyncHandler from 'express-async-handler';
import {getAuth} from '@clerk/express';
import Comment from '../models/comment.model.js';
import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import Notification from '../models/notification.model.js';


export const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId })
        .populate('user', 'username firstName lastName  profilePicture')
        .sort({ createdAt: -1 });

    res.status(200).json(comments);
});  

export const createComment = asyncHandler(async (req, res) => {
    const {postId} = req.params;
    const {userId} = getAuth(req);
    const {content} = req.body;

    if (!content || content.trim() === '') {
        res.status(400);
        throw new Error('Comment content is required');
    }

    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (!post || !user) 
     return res.status(404).json({message: 'Post or User not found'});

    // Create notification for post owner if the commenter is not the post owner
    const comment = await Comment.create({
        content,
        post: postId,
        user: user._Id,
    });

    //link comment to post
    await Post.findByIdAndUpdate(postId, {
        $push: {comments: comment._id},
    });

    //create notification if the commenter is not the post owner
    if (post.user.toString() !== userId.toString()) {
        await Notification.create({
            from: user._id,
            to: post.user,
            type: 'comment',
            post: post._id,
            comment: comment._id,
            message: `${user.username} commented on your post.`,
        });
    }

    res.status(201).json({comment});
});

export const deleteComment = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const { commentId } = req.params;
  
    const user = await User.findOne({ clerkId: userId });
    const comment = await Comment.findById(commentId);
  
    if (!user || !comment) {
      return res.status(404).json({ error: "User or comment not found" });
    }
  
    if (comment.user.toString() !== user._id.toString()) {
      return res.status(403).json({ error: "You can only delete your own comments" });
    }
  
    // remove comment from post
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });
  
    // delete the comment
    await Comment.findByIdAndDelete(commentId);
  
    res.status(200).json({ message: "Comment deleted successfully" });
  });