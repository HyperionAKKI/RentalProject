import { Router, Request, Response } from 'express';
import { Payment } from '../models/Payment';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Payment management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "661abc123def456789"
 *         amount:
 *           type: number
 *           example: 5000
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2026-05-01"
 *         tenantName:
 *           type: string
 *           example: "Akarsh Tiwari"
 *         roomNo:
 *           type: string
 *           example: "A-101"
 *         tenantId:
 *           type: string
 *           example: "user123"
 *         status:
 *           type: string
 *           enum: [PENDING, PAID]
 *           example: PENDING
 *
 *     CreatePayment:
 *       type: object
 *       required:
 *         - amount
 *         - dueDate
 *         - tenantName
 *         - roomNo
 *         - tenantId
 *       properties:
 *         amount:
 *           type: number
 *           example: 5000
 *         dueDate:
 *           type: string
 *           format: date
 *           example: "2026-05-01"
 *         tenantName:
 *           type: string
 *           example: "Akarsh Tiwari"
 *         roomNo:
 *           type: string
 *           example: "A-101"
 *         tenantId:
 *           type: string
 *           example: "user123"
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get payments
 *     description: Admin gets all payments, tenant gets only their own payments
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create payment (Admin only)
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePayment'
 *     responses:
 *       201:
 *         description: Payment created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       403:
 *         description: Forbidden (Admin only)
 *       500:
 *         description: Server error
 */
router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { amount, dueDate, tenantName, roomNo, tenantId } = req.body;
    const payment = await Payment.create({
      amount,
      dueDate,
      tenantName,
      roomNo,
      tenantId,
      status: 'PENDING',
    });
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment' });
  }
});

/**
 * @swagger
 * /payments/{id}/pay:
 *   put:
 *     summary: Mark payment as PAID
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */
router.put('/:id/pay', authenticateJWT, async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const payment = await Payment.findByIdAndUpdate(
      id,
      { status: 'PAID' },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

export default router;