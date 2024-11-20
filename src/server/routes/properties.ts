import express from 'express';
import { z } from 'zod';
import { db } from '../db';
import { randomUUID } from 'crypto';

const router = express.Router();

const propertySchema = z.object({
  address: z.string(),
  type: z.string(),
  price: z.number().positive(),
  roi: z.number(),
  occupancy: z.number().min(0).max(100),
  imageUrl: z.string().url()
});

router.get('/', (req, res) => {
  try {
    const properties = db.prepare(`
      SELECT p.*, 
             json_group_array(DISTINCT json_object(
               'id', t.id,
               'name', t.name,
               'email', t.email,
               'phone', t.phone
             )) as tenants,
             json_group_array(DISTINCT json_object(
               'id', tr.id,
               'type', tr.type,
               'amount', tr.amount,
               'description', tr.description,
               'date', tr.date
             )) as transactions
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id
      LEFT JOIN transactions tr ON tr.property_id = p.id
      WHERE p.user_id = ?
      GROUP BY p.id
    `).all(req.userId);
    
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

router.post('/', (req, res) => {
  try {
    const data = propertySchema.parse(req.body);
    const propertyId = randomUUID();
    
    db.prepare(`
      INSERT INTO properties (id, address, type, price, roi, occupancy, image_url, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(propertyId, data.address, data.type, data.price, data.roi, data.occupancy, data.imageUrl, req.userId);
    
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(propertyId);
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const property = db.prepare(`
      SELECT p.*, 
             json_group_array(DISTINCT json_object(
               'id', t.id,
               'name', t.name,
               'email', t.email,
               'phone', t.phone
             )) as tenants,
             json_group_array(DISTINCT json_object(
               'id', tr.id,
               'type', tr.type,
               'amount', tr.amount,
               'description', tr.description,
               'date', tr.date
             )) as transactions
      FROM properties p
      LEFT JOIN tenants t ON t.property_id = p.id
      LEFT JOIN transactions tr ON tr.property_id = p.id
      WHERE p.id = ? AND p.user_id = ?
      GROUP BY p.id
    `).get(req.params.id, req.userId);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.json(property);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const data = propertySchema.parse(req.body);
    
    const result = db.prepare(`
      UPDATE properties
      SET address = ?, type = ?, price = ?, roi = ?, occupancy = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND user_id = ?
    `).run(data.address, data.type, data.price, data.roi, data.occupancy, data.imageUrl, req.params.id, req.userId);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    const property = db.prepare('SELECT * FROM properties WHERE id = ?').get(req.params.id);
    res.json(property);
  } catch (error) {
    res.status(400).json({ error: 'Invalid input' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const result = db.prepare('DELETE FROM properties WHERE id = ? AND user_id = ?')
      .run(req.params.id, req.userId);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete property' });
  }
});

export const propertyRouter = router;