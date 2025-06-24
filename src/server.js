import dotenv from 'dotenv';
import app from './app.js';

// Call function to read variable in .env
dotenv.config();

const PORT = process.env.PORT || 8000;

app.listen(PORT, ()=>{
  console.log(`Server is running on http://localhost:${PORT}`);
})
