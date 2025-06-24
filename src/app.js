import express from 'express';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/post', (req, res) => {
  console.log(req.body);
  res.json({body: req.body});
});
app.use('/api/comment', (req, res) => res.send('comment services Fakebook'));
app.use('/api/like', (req, res) => res.send('like services Fakebook'));

export default app;