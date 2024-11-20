import express from 'express';
import { z } from 'zod';
import { prisma } from '../db';

const router = express.Router();

const tenantSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  propertyId: z.string()
});

router.get('/', async (req, res) => {
  try {
    const tenants = await prisma.tenant.findMany({
      where: {
        property: {
          userId: req.userId
        }
      },
      include: {
        property: true
      }
    });
    res.json(tenants);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tenants' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = tenantSchema.parse(req.body);
    
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
    
    const tenant = await prisma.tenant.create({
      data
    });
    res.json(tenant);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

export const tenantRouter = router;