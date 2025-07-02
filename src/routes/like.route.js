import express from "express";
import * as likeController from '../controllers/like.controller.js'

const likeRoute = express.Router();

likeRoute.post('/',likeController.createLike);
likeRoute.delete('/:id', likeController.deleteLike);

export default likeRoute;