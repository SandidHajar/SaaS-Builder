import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import projectRoutes from './interfaces/routes/projectRoutes';
import authRoutes from './interfaces/routes/authRoutes';
import { errorHandler } from './interfaces/middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
