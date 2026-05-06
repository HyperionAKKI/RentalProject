import { Router, Request, Response } from 'express';
import { DocumentModel } from '../models/Document';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documents
 *   description: Document management APIs
 */

/**
 * @swagger
 * /api/documents:
 *   get:
 *     summary: Get all documents (Admin only)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of documents
 *       500:
 *         description: Server error
 */
router.get('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const documents = await DocumentModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Create a new document record (Admin only)
 *     tags: [Documents]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tenantName:
 *                 type: string
 *               roomNo:
 *                 type: string
 *               contact:
 *                 type: string
 *               idProof:
 *                 type: string
 *               agreement:
 *                 type: string
 *               tenantId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Document created successfully
 *       500:
 *         description: Server error
 */
router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { tenantName, roomNo, contact, idProof, agreement, tenantId } = req.body;
    const document = await DocumentModel.create({
      tenantName, roomNo, contact, idProof, agreement, tenantId
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document record' });
  }
});

export default router;
