import { Router, Request, Response } from 'express';
import { DocumentModel } from '../models/Document';
import { authenticateJWT, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', authenticateJWT, requireAdmin, async (req: Request, res: Response) => {
  try {
    const documents = await DocumentModel.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch documents' });
  }
});

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
