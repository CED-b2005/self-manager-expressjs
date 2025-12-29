import { Request, Response } from 'express';
import { UserService } from './user.service';

const userService = new UserService();

export class UserController {
  // Tạo người dùng mới
  async createUser(req: Request, res: Response) {
    const { email, name, password, role } = req.body;

    try {
      const newUser = await userService.createUser(email, name, password, role);
      return res.status(201).json(newUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy tất cả người dùng
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Lấy thông tin người dùng theo ID
  async getUserById(req: Request, res: Response) {
    const userId = req.params.id;
    try {
      const user = await userService.getUserById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Cập nhật thông tin người dùng
  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const { email, name, role } = req.body;

    try {
      const updatedUser = await userService.updateUser(userId, { email, name, role });
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Xóa người dùng
  async deleteUser(req: Request, res: Response) {
    const userId = req.params.id;

    try {
      await userService.deleteUser(userId);
      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }

  // Kích hoạt / vô hiệu hóa người dùng
  async toggleUserStatus(req: Request, res: Response) {
    const userId = req.params.id;
    const { isActive } = req.body;

    try {
      const updatedUser = await userService.toggleUserStatus(userId, isActive);
      return res.status(200).json(updatedUser);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
