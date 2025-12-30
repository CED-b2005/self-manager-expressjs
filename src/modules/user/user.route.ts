import { Router } from 'express';
import UserModule from './user.module';

const userController = new UserModule.controlLer();
const userRouter = Router();

// Routes
userRouter.post('/', userController.createUser);  // Tạo user
userRouter.get('/', userController.getAllUsers);  // Lấy tất cả users
userRouter.get('/:id', userController.getUserById);  // Lấy user theo ID
userRouter.put('/:id', userController.updateUser);  // Cập nhật user
userRouter.delete('/:id', userController.deleteUser);  // Xóa user
userRouter.patch('/:id/status', userController.toggleUserStatus);  // Kích hoạt / vô hiệu hóa user

export default userRouter;