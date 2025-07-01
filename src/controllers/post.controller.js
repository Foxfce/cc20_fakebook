import fs from 'fs/promises';
import cloudinary from "../config/cloudinary.config.js";
import path from 'path';
import prisma from '../config/prisma.client.js';

export const getAllPost = async (req, res, next) => {
  try {
    const resp = await prisma.post.findMany({
      orderBy : {createdAt : 'desc'},
      include : {
        user : { select : {
          firstName: true,
          lastName: true,
          profileImage: true
        }}
      }
    })
    res.json({ posts : resp });
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
      image : uploadResult?.secure_url || '',
      userId: req.user.id
    }

    const rs = await prisma.post.create({data});

    res.status(201).json({
      message: 'Create Post Succesfully',
      data: rs,
    });
  } catch (error) {
    next(error);
  }
}

export const updatePost = async (req, res, next) => {
  try {
    res.json({ message: 'Edit posts' });

  } catch (error) {
    next(error);
  }
}

export const deletePost = async (req, res, next) => {
  try {
    res.json({ message: 'Delete posts' });

  } catch (error) {
    next(error);
  }
}