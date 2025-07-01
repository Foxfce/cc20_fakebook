import fs from 'fs/promises';
import cloudinary from "../config/cloudinary.config.js";
import path from 'path';
import prisma from '../config/prisma.client.js';
import createError from '../utils/create-error.util.js';

export const getAllPost = async (req, res, next) => {
  try {
    const resp = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true
          }
        },
        comments: true,
        likes: true,
      }
    })
    res.json({ posts: resp });
  } catch (error) {
    next(error);

  }
}

export const createPost = async (req, res, next) => {
  try {
    // req.body will get all the text file req.file or req.files will get the file upload
    const { message } = req.body;

    // Check if the req.file is existing
    let haveFile = !!req.file;
    let uploadResult = null;
    if (haveFile) {

      // Method request uploding to cloudinary .upload(saved pathed, { option })
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name
      })
      fs.unlink(req.file.path);
    }
    // console.log(uploadResult);
    const data = {
      message: message,
      image: uploadResult?.secure_url || '',
      userId: req.user.id
    }

    const rs = await prisma.post.create({ data });

    res.status(201).json({
      message: 'Create Post Succesfully',
      result: rs,
    });
  } catch (error) {
    next(error);
  }
}

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {message, removePic} = req.body;

    const foundPost = await prisma.post.findUnique({
      where: { id: +id }
    })

    if (!foundPost || req.user.id !== foundPost.userId) {
      createError(400, 'Cannot edit this post')
    }
    const haveFile = !!req.file
    let uploadResult
    if (haveFile) {
      uploadResult = await cloudinary.uploader.upload(req.file.path, {
        overwrite: true,
        public_id: path.parse(req.file.path).name
      })
      fs.unlink(req.file.path);
    }

    const data = haveFile
      ? { message, userId: req.user.id, image: uploadResult.secure_url }
      : { message, userId: req.user.id, image: removePic? '': foundPost.image }

    const rs = await prisma.post.update({
      where: { id: +id },
      data : data,
    })
    res.json({ message: 'Edit posts' });

  } catch (error) {
    next(error);
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundPost = await prisma.post.findUnique({
      where: { id: +id }
    })
    if (!foundPost) {
      createError(400, 'ID not found')
    }

    if (req.user.id != foundPost.userId) {
      createError(400, 'Unauthorized permission')
    }

    // console.log(req.user.id);
    // console.log(foundPost);

    const rs = await prisma.post.delete({ where: { id: +id } })
    res.json({ message: 'Delete posts', result: rs });

  } catch (error) {
    next(error);
  }
}