// Multer is for handle multipart/form-data 
import multer from 'multer';
import path from 'path';

// console.log(process.cwd());
// C:\Users\User\Desktop\CC20-CSS\project\cc20_fakebook\src\middlewares

// console.log(import.meta.url);
// file:///C:/Users/User/Desktop/CC20-CSS/project/cc20_fakebook/src/middlewares/upload.middleware.js

// let picPath = process.cwd() + '/' + 'temp-pic'
// let picPath2 = path.join(process.cwd(), "temp-pic")
// C:\Users\User\Desktop\CC20-CSS\project\cc20_fakebook\src\middlewares\temp-pic
// console.log(picPath2);

const destination = path.join(process.cwd(), 'temp-pic')

// Make multer save with out random the file name by custom Configuration
const storage = multer.diskStorage({

  // It work like express router that has (req, res, next)  cb(null, destination) if have cb(arg1, null , destination) it will become function handle error
  destination: (req, file, cb) => cb(null,destination),
  filename : (req, file, cb) => {
    let fileExt = path.extname(file.originalname)
    let fileName = `pic_${Date.now()}_${Math.round(Math.random()*100)}${fileExt}`;
    cb(null, fileName);
  }
})

// export default multer({dest: destination});
export default multer({storage : storage});
