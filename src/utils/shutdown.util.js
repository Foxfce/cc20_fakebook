import prisma from "../config/prisma.client.js";

export default async function (signal) {
  console.log(`\nReceived ${signal} , shutting down`);
  try {
    await prisma.$disconnect();
    console.log("Prisma disconnected");
  } catch (error) {
    console.log("Error when disconnected");
  } finally {
    // process.exit(0);
  }
}