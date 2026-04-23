import { Router, Request, Response } from 'express';
import { Room } from '../models/Room';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all rooms (Admin or Tenant)
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

// Admin: Add a new room
router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { number, status } = req.body;
    const room = await Room.create({ number, status: status || 'AVAILABLE' });
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
    const room = await Room.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update room' });
  }
});

export default router;
