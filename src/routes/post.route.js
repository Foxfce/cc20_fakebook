import express from 'express';
import * as postController from '../controllers/post.controller.js';
import upload from '../middlewares/upload.middleware.js';

const postRoute = express.Router();

postRoute.get('/',postController.getAllPost);
postRoute.post('/',upload.single('image'),postController.createPost);
postRoute.put('/',postController.updatePost);
postRoute.delete('/',postController.deletePost);

export default postRoute;
