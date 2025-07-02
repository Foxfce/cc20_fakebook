import express from 'express';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import notFoundMiddleware from './middlewares/not-found.middleware.js';
import errorMiddleware from './middlewares/error.middleware.js';
import authenticate from './middlewares/authenticate.middleware.js';
import postRoute from './routes/post.route.js';
import likeRoute from './routes/like.route.js';
import commentRoute from './routes/comment.route.js';

const app = express();

app.use(cors({
  origin : "http://localhost:5173",
}))

app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/post',authenticate, postRoute);
app.use('/api/comment',authenticate, commentRoute);
app.use('/api/like',authenticate, likeRoute);
app.use('/api/admin', authenticate, (req, res) => res.send('like services Fakebook'));

app.use(notFoundMiddleware)
app.use(errorMiddleware)

export default app;