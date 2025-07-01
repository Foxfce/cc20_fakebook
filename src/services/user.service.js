import prisma from "../config/prisma.client.js";

export const getUserBy = async (column, value) => {
  return await prisma.user.findUnique({
    where: {
      [column]: value
    }
  })
}

export const createUser = async (userData) => {
  return await prisma.user.create({ data:  userData  })
}

export const changeImageUser = async (imgData) =>{
  return await prisma.user.patch({ data: imgData})
}