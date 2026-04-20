import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

// Get payments. Admins see all, tenants see their own.
router.get('/', authenticateJWT, async (req: any, res: Response) => {
  try {
    if (req.user.role === 'ADMIN') {
      const payments = await prisma.payment.findMany();
      res.json(payments);
    } else {
      const payments = await prisma.payment.findMany({
        where: { tenantId: req.user.id }
      });
      res.json(payments);
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch payments' });
  }
});

// Admin: Create a new payment record
router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { amount, dueDate, tenantName, roomNo, tenantId } = req.body;
    const payment = await prisma.payment.create({
      data: { amount, dueDate, tenantName, roomNo, tenantId, status: 'PENDING' }
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Mark payment as PAID
router.put('/:id/pay', authenticateJWT, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payment = await prisma.payment.update({
      where: { id },
      data: { status: 'PAID' }
    });
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

export default router;
