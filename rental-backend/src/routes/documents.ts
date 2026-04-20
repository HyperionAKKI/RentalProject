import { Router, Request, Response } from 'express';
import { prisma } from '../prisma';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const documents = await prisma.document.findMany();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

router.post('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const { tenantName, roomNo, contact, idProof, agreement, tenantId } = req.body;
    const document = await prisma.document.create({
      data: { tenantName, roomNo, contact, idProof, agreement, tenantId }
    });
    res.status(201).json(document);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create document record' });
  }
});

export default router;
