import express from 'express';
import cors from 'cors';
import { authRouter } from './routes/auth';
import { propertyRouter } from './routes/properties';
import { tenantRouter } from './routes/tenants';
import { transactionRouter } from './routes/transactions';
import { authenticateToken } from './middleware/auth';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRouter);

// Protected routes
app.use('/api/properties', authenticateToken, propertyRouter);
app.use('/api/tenants', authenticateToken, tenantRouter);
app.use('/api/transactions', authenticateToken, transactionRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});