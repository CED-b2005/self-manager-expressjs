import { Router } from 'express';
import UserModule from './user.module';

const userController = new UserModule.controlLer();
const userRouter = Router();

// Routes
userRouter.post('/users', userController.createUser);  // Tạo user
userRouter.get('/users', userController.getAllUsers);  // Lấy tất cả users
userRouter.get('/users/:id', userController.getUserById);  // Lấy user theo ID
userRouter.put('/users/:id', userController.updateUser);  // Cập nhật user
userRouter.delete('/users/:id', userController.deleteUser);  // Xóa user
userRouter.patch('/users/:id/status', userController.toggleUserStatus);  // Kích hoạt / vô hiệu hóa user

export default userRouter;