import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
import userRoutes from './routes/userRoutes';
import catRoutes from './routes/catRoutes';
import taskRoutes from './routes/taskRoutes';
import 'express-async-errors'
import errorHandler from './utils/errorHandlers';

dotenv.config();

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URL;

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(cors())

app.use('/users', userRoutes);
app.use('/cats', catRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
