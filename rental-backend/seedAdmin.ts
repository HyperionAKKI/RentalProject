import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { User } from './src/models/User';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  await mongoose.connect(process.env.DATABASE_URL || 'mongodb://localhost:27017/rental-backend');
  
  const existingAdmin = await User.findOne({ email: 'admin@rental.com' });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Super Admin',
      email: 'admin@rental.com',
      password: hashedPassword,
      role: 'ADMIN',
    });
    console.log('Admin user created: admin@rental.com / admin123');
  } else {
    console.log('Admin user already exists.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
