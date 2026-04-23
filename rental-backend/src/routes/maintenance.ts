import { Router, Request, Response } from 'express';
import { MaintenanceTask } from '../models/MaintenanceTask';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

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
