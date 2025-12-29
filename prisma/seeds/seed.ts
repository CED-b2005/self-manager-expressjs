import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'; // Thư viện hash mật khẩu

const prisma = new PrismaClient();

async function main() {
  // Hash password example (có thể thay đổi theo nhu cầu)
  const hashedPassword = await bcrypt.hash('123456', 10); // Hash password "123456" với salt 10

  // Tạo dữ liệu mẫu cho người dùng
  await prisma.user.createMany({
    data: [
      {
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin',
        password: hashedPassword, // Mật khẩu đã hash
        isActive: true,
      },
      {
        email: 'user@example.com',
        name: 'Regular User',
        role: 'user',
        password: hashedPassword,
        isActive: true,
      },
      {
        email: 'inactive@example.com',
        name: 'Inactive User',
        role: 'user',
        password: hashedPassword,
        isActive: false,
      },
    ],
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });