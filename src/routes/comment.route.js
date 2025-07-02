import express from 'express';
import * as commentController from '../controllers/comment.controller.js';

const commentRoute = express.Router();

commentRoute.post('/',commentController.createComment);

export default commentRoute;