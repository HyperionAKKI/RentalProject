import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { User } from './src/models/User';
import { Room } from './src/models/Room';
import { Payment } from './src/models/Payment';
import { MaintenanceTask } from './src/models/MaintenanceTask';

dotenv.config();

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log('Connected!');

    console.log('Clearing old dummy data...');
    await User.deleteMany({ email: { $in: ['admin@test.com', 'tenant1@test.com', 'tenant2@test.com'] } });
    await Room.deleteMany({ number: { $in: ['101', '102', '103', '104'] } });
    
    // Creating Rooms
    console.log('Creating Rooms...');
    const rooms = await Room.insertMany([
      { number: '101', status: 'OCCUPIED' },
      { number: '102', status: 'AVAILABLE' },
      { number: '103', status: 'MAINTENANCE' },
      { number: '104', status: 'AVAILABLE' },
    ]);

    // Creating Users
    console.log('Creating Users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'ADMIN'
    });

    const tenant1 = await User.create({
      name: 'John Doe',
      email: 'tenant1@test.com',
      password: hashedPassword,
      role: 'TENANT',
      roomNo: '101',
      contact: '1234567890',
      moveInDate: new Date().toISOString()
    });

    const tenant2 = await User.create({
      name: 'Jane Smith',
      email: 'tenant2@test.com',
      password: hashedPassword,
      role: 'TENANT',
      roomNo: '102',
      contact: '0987654321',
      moveInDate: new Date().toISOString()
    });

    console.log('✅ Dummy data inserted successfully!');
    console.log('\n--- Test Credentials ---');
    console.log('Admin: admin@test.com / password123');
    console.log('Tenant 1: tenant1@test.com / password123');
    console.log('Tenant 2: tenant2@test.com / password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
