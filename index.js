import bodyParser from 'body-parser';
import express from 'express';
import { connect } from 'mongoose';
import process from 'node:process';
import authRoutes from './modules/auth/routes.js';
import userRoutes from './modules/users/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

try {
  await connect('mongodb://localhost:27017/intro-jwt');
} catch (error) {
  console.error('Unable to connect to database', error);
}

app.use(bodyParser.json());
app.set('port', PORT);

app.use('/auth', authRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});
