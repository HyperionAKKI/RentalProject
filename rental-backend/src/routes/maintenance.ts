import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

// Get all maintenance tasks. Admins see all, tenants see their own.
router.get('/', authenticateJWT, async (req: any, res: Response) => {
  try {
    if (req.user.role === 'ADMIN') {
      const tasks = await prisma.maintenanceTask.findMany();
      res.json(tasks);
    } else {
      const tasks = await prisma.maintenanceTask.findMany({
        where: { reporterId: req.user.id }
      });
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
    const task = await prisma.maintenanceTask.create({
      data: {
        title,
        description,
        status: 'PENDING',
        reporterId: req.user.id
      }
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create maintenance task' });
  }
});

// Admin: Update status
router.put('/:id/status', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const task = await prisma.maintenanceTask.update({
      where: { id },
      data: { status }
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update maintenance task' });
  }
});

export default router;
