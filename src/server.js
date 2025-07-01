import dotenv from 'dotenv';
import app from './app.js';
import shutdown from './utils/shutdown.util.js';

// Call function to read variable in .env
dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})

process.on("SIGINT", (signal)=>{
  shutdown(signal);
});
process.on("SIGTERM", (signal)=>{shutdown(signal)});

process.on("unhandledException", (signal)=>{shutdown(signal)});
process.on("unhandledRejection", (signal)=>{shutdown(signal)});

// prisma.user.count().then(console.log);
// prisma.user.count().then(rs => console.log(rs));
// prisma.$queryRaw`SELECT * FROM user;`.then(rs=>console.log(rs));

