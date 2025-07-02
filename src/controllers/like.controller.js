import prisma from "../config/prisma.client.js";
import createError from "../utils/create-error.util.js";

export async function createLike(req, res, next) {
  const { postId } = req.body
  const postData = await prisma.post.findUnique({ where: { id: postId } });

  if (!postData) {
    createError(401, "Cannot like this post");
  }

  const rs = await prisma.like.create({
    data: {
      userId: req.user.id,
      postId: postId
    }
  })
  res.json(rs)

}

export async function deleteLike(req, res, next) {
  const { id } = req.params //postId
  const rs = await prisma.like.delete({
    where: {
      userId_postId: {
        userId: req.user.id,
        postId: +id,
      }
    }
  })

  res.json(rs);
}