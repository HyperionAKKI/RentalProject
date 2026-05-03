import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { authenticateJWT, requireAdmin } from '../middleware/auth';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication and registration
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 default: TENANT
 *               roomNo:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
router.post('/register', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, role, roomNo } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'TENANT',
      roomNo
    });

    res.status(201).json({ message: 'User registered successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Sign up a new tenant account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: secret123
 *               roomNo:
 *                 type: string
 *                 example: "101"
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 userId:
 *                   type: string
 *       400:
 *         description: Validation error or email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.post('/signup', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, email, password, roomNo } = req.body;

    // --- Input validation ---
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // --- Check for existing account ---
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'TENANT',
      roomNo: roomNo?.trim() || null,
    });

    res.status(201).json({ message: 'Account created successfully', userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during sign up' });
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     roomNo:
 *                       type: string
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Server error during login
 */
router.post('/login', async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // TEMPORARY OFFLINE BYPASS for the frontend developer
    if (email === 'admin@rental.com' && password === 'admin123') {
      const token = jwt.sign(
        { id: 'offline-admin-id', role: 'ADMIN', email: 'admin@rental.com' }, 
        process.env.JWT_SECRET || 'supersecret123', 
        { expiresIn: '24h' }
      );
      return res.json({
        token,
        user: {
          id: 'offline-admin-id',
          name: 'Super Admin',
          email: 'admin@rental.com',
          role: 'ADMIN',
          roomNo: null
        }
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email }, 
      process.env.JWT_SECRET || 'supersecret123', 
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        roomNo: user.roomNo
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

router.get('/profile', authenticateJWT, async (req: any, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.user.id).select('name email role roomNo');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * @swagger
 * /api/auth/admin/register-tenant:
 *   post:
 *     summary: "[ADMIN ONLY] Register a new tenant"
 *     description: Requires a valid Admin JWT. The owner/admin can register new tenants and optionally assign a room and role. Now supports multipart/form-data for file uploads.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jane Doe
 *               email:
 *                 type: string
 *                 example: jane@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: tenant123
 *               contact:
 *                 type: string
 *                 example: "+1234567890"
 *               roomNo:
 *                 type: string
 *                 example: "202"
 *               moveInDate:
 *                 type: string
 *                 format: date
 *                 example: "2026-06-01"
 *               idProof:
 *                 type: string
 *                 example: "Passport/SSN"
 *               role:
 *                 type: string
 *                 enum: [TENANT, ADMIN]
 *                 default: TENANT
 *                 example: TENANT
 *               idProofFile:
 *                 type: string
 *                 format: binary
 *                 description: Identity Proof document
 *               rentalFile:
 *                 type: string
 *                 format: binary
 *                 description: Rental Agreement document
 *     responses:
 *       201:
 *         description: Tenant registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *                     roomNo:
 *                       type: string
 *       400:
 *         description: Validation error or email already registered
 *       401:
 *         description: No token provided
 *       403:
 *         description: Access denied — Admins only
 *       500:
 *         description: Server error
 */
router.post(
  '/admin/register-tenant',
  authenticateJWT,
  requireAdmin,
  upload.fields([{ name: 'idProofFile', maxCount: 1 }, { name: 'rentalFile', maxCount: 1 }]),
  async (req: any, res: Response): Promise<any> => {
    try {
      const { name, email, password, roomNo, role, contact, moveInDate, idProof } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };

      // --- Input validation ---
      if (!name || !name.trim()) {
        return res.status(400).json({ error: 'Name is required' });
      }
      if (!email || !email.trim()) {
        return res.status(400).json({ error: 'Email is required' });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      if (!password || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      const allowedRoles = ['TENANT', 'ADMIN'];
      const assignedRole = role && allowedRoles.includes(role.toUpperCase()) ? role.toUpperCase() : 'TENANT';

      // --- Duplicate check ---
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return res.status(400).json({ error: 'A user with this email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const idProofFilePath = files && files['idProofFile'] ? `/uploads/${files['idProofFile'][0].filename}` : null;
      const rentalFilePath = files && files['rentalFile'] ? `/uploads/${files['rentalFile'][0].filename}` : null;

      const newUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: assignedRole,
        roomNo: roomNo?.trim() || null,
        contact: contact?.trim() || null,
        moveInDate: moveInDate?.trim() || null,
        idProof: idProof?.trim() || null,
        idProofFile: idProofFilePath,
        rentalFile: rentalFilePath,
      });

      res.status(201).json({
        message: `Tenant registered successfully by admin (${req.user.email})`,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          roomNo: newUser.roomNo,
          contact: newUser.contact,
          moveInDate: newUser.moveInDate,
          idProof: newUser.idProof,
          idProofFile: newUser.idProofFile,
          rentalFile: newUser.rentalFile,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error during tenant registration' });
    }
  }
);

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all user data
 *     description: Retrieve a list of all registered users.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *                   roomNo:
 *                     type: string
 *                   contact:
 *                     type: string
 *                   moveInDate:
 *                     type: string
 *       401:
 *         description: No token provided
 *       500:
 *         description: Server error
 */
router.get('/users', authenticateJWT, async (req: Request, res: Response): Promise<any> => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

export default router;
