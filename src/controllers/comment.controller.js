import prisma from "../config/prisma.client.js";
import createError from "../utils/create-error.util.js";

export async function createComment(req, res, next) {
  const { message, postId } = req.body;
  const userId = req.user.id;

  const postData = await prisma.post.findUnique({where: {id: postId}});

  if(!postData){
    createError(401, "Cannot create comment");
  }
  const rs = await prisma.comment.create({
    data: {message, postId, userId}
  })
  
  res.json(rs);

}