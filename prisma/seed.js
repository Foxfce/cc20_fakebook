import prisma from "../src/config/prisma.client.js";
import bcrypt from "bcryptjs";

const hashedPassword = bcrypt.hashSync('123456', 10);

const userData = [
  {
    firstName: 'Andy', lastName: 'Codecamp', password: hashedPassword, email: 'andy@ggg.mail',
    profileImage: 'https://www.svgrepo.com/show/420364/avatar-male-man.svg'
  },
  {
    firstName: 'Bobby', lastName: 'Codecamp', password: hashedPassword, email: 'bobby@ggg.mail',
    profileImage: 'https://www.svgrepo.com/show/420319/actor-chaplin-comedy.svg'
  },
  {
    firstName: 'Candy', lastName: 'Codecamp', password: hashedPassword, mobile: '1111111111',
    profileImage: 'https://www.svgrepo.com/show/420327/avatar-child-girl.svg'
  },
  {
    firstName: 'Danny', lastName: 'Codecamp', password: hashedPassword, mobile: '2222222222',
    profileImage: 'https://www.svgrepo.com/show/420314/builder-helmet-worker.svg'
  }
]

const postData = [
  {message: 'hello 1', userId: 2},
  {message: 'hello 2', userId: 1},
  {message: 'hello 3', userId: 1},
  {message: 'hello 4', userId: 4},
]

async function seedDB() {
  await prisma.user.createMany({ data: userData, skipDuplicates: true });
  await prisma.post.createMany({data: postData, skipDuplicates: true});
}

seedDB().then(console.log('DB Seed successful'))
  .catch(err=>console.log(err))
  .finally(prisma.$disconnect());