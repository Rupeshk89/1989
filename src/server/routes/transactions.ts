import express from 'express';
import { z } from 'zod';
import { prisma } from '../db';

const router = express.Router();

const transactionSchema = z.object({
  type: z.enum(['INCOME', 'EXPENSE']),
  amount: z.number().positive(),
  description: z.string(),
  date: z.string().transform(str => new Date(str)),
  propertyId: z.string()
});

router.get('/', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        property: {
          userId: req.userId
        }
      },
      include: {
        property: true
      },
      orderBy: {
        date: 'desc'
      }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = transactionSchema.parse(req.body);
    
    // Verify property belongs to user
    const property = await prisma.property.findFirst({
      where: {
        id: data.propertyId,
        userId: req.userId
      }
    });
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    const transaction = await prisma.transaction.create({
      data
    });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

export const transactionRouter = router;