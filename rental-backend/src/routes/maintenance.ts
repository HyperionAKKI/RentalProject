import { Router, Request, Response } from 'express';
import { MaintenanceTask } from '../models/MaintenanceTask';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Maintenance
 *   description: Maintenance task management APIs
 */

/**
 * @swagger
 * /api/maintenance:
 *   get:
 *     summary: Get all maintenance tasks
 *     description: Admins see all tasks, tenants see only their own.
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of maintenance tasks
 *       500:
 *         description: Server error
 */
// Get all maintenance tasks. Admins see all, tenants see their own.
router.get('/', authenticateJWT, async (req: any, res: Response) => {
  try {
    if (req.user.role === 'ADMIN') {
      const tasks = await MaintenanceTask.find();
      res.json(tasks);
    } else {
      const tasks = await MaintenanceTask.find({ reporterId: req.user.id });
      res.json(tasks);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch maintenance tasks' });
  }
});

/**
 * @swagger
 * /api/maintenance:
 *   post:
 *     summary: Create a maintenance request
 *     description: Tenants and Admins can create requests
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 *       500:
 *         description: Server error
 */
// Tenants & Admins: Create request
router.post('/', authenticateJWT, async (req: any, res: Response) => {
  try {
    const { title, description } = req.body;
    const task = await MaintenanceTask.create({
      title,
      description,
      status: 'PENDING',
      reporterId: req.user.id
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create maintenance task' });
  }
});

/**
 * @swagger
 * /api/maintenance/{id}/status:
 *   put:
 *     summary: Update maintenance task status (Admin only)
 *     tags: [Maintenance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Maintenance Task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, IN_PROGRESS, RESOLVED]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
// Admin: Update status
router.put('/:id/status', authenticateJWT, requireAdmin, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await MaintenanceTask.findByIdAndUpdate(id, { status }, { new: true });
    
    if (!task) {
      return res.status(404).json({ error: 'Maintenance task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update maintenance task' });
  }
});

export default router;
