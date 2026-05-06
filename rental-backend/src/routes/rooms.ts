import { Router, Request, Response } from 'express';
import { Room } from '../models/Room';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management APIs
 */

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Get all rooms
 *     description: Admins and Tenants can get a list of all rooms.
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of rooms
 *       500:
 *         description: Server error
 */
// Get all rooms (Admin or Tenant)
router.get('/', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Add a new room (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
 *     responses:
 *       201:
 *         description: Room created successfully
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/rooms/{id}/status:
 *   put:
 *     summary: Update room status (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Room ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [AVAILABLE, OCCUPIED, MAINTENANCE]
 *     responses:
 *       200:
 *         description: Room updated successfully
 *       404:
 *         description: Room not found
 *       500:
 *         description: Server error
 */
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
