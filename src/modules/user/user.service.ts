import prisma from "../../configs/prisma.config";

export class UserService {

  // Tạo người dùng mới
  async createUser(email: string, name: string, password: string, role: string) {
    try {
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password, // bạn sẽ phải hash password trước khi lưu
          role,
        },
      });
      return user;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  // Lấy tất cả người dùng
  async getAllUsers() {
    try {
      return await prisma.user.findMany();
    } catch (error: any) {
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  // Lấy một người dùng theo id
  async getUserById(userId: string) {
    try {
      return await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  // Cập nhật thông tin người dùng
  async updateUser(userId: string, data: { email?: string; name?: string; role?: string }) {
    try {
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data,
      });
    } catch (error: any) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  // Xóa người dùng
  async deleteUser(userId: string) {
    try {
      return await prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  // Kích hoạt / vô hiệu hóa người dùng
  async toggleUserStatus(userId: string, isActive: boolean) {
    try {
      return await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          isActive,
        },
      });
    } catch (error: any) {
      throw new Error(`Failed to update user status: ${error.message}`);
    }
  }
}