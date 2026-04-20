import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all rooms (Admin or Tenant)
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const rooms = await prisma.room.findMany();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Admin: Add a new room
router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { number, status } = req.body;
    const room = await prisma.room.create({
      data: { number, status: status || 'AVAILABLE' }
    });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Admin: Update room status
router.put('/:id/status', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const room = await prisma.room.update({
      where: { id },
      data: { status }
    });
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

export default router;
