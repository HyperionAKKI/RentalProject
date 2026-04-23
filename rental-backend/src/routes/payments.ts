import { Router, Request, Response } from 'express';
import { Payment } from '../models/Payment';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

// Get payments. Admins see all, tenants see their own.
router.get('/', authenticateJWT, async (req: any, res: Response) => {
  try {
    if (req.user.role === 'ADMIN') {
      const payments = await Payment.find();
      res.json(payments);
    } else {
      const payments = await Payment.find({ tenantId: req.user.id });
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
    const payment = await Payment.create({
      amount, dueDate, tenantName, roomNo, tenantId, status: 'PENDING'
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

// Mark payment as PAID
router.put('/:id/pay', authenticateJWT, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(id, { status: 'PAID' }, { new: true });
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

export default router;
