// Import các kiểu Request, Response, NextFunction từ Express
// - Request: đại diện cho HTTP request gửi từ client
// - Response: đại diện cho HTTP response trả về client
// - NextFunction: hàm dùng để chuyển control sang middleware tiếp theo
import { Request, Response, NextFunction } from "express";

// Thư viện xử lý JSON Web Token (JWT)
// - dùng để verify / decode token
import jwt from "jsonwebtoken";

// Import PrismaClient để thao tác database
// Import type User để typing cho user đăng nhập
import { PrismaClient, User } from "@prisma/client";

// AppError là custom error middleware
// - giúp thống nhất format lỗi (message, statusCode, errorCode)
import { AppError } from "./error.middleware";

// Khởi tạo Prisma Client
// - dùng để query database (user, post, v.v.)
const prisma = new PrismaClient();

// Mở rộng interface Request mặc định của Express
// - thêm thuộc tính `user` để lưu thông tin user sau khi xác thực
// - giúp TypeScript biết req.user tồn tại
export interface AuthRequest extends Request {
    user?: User;
}

// Middleware authenticate
// - nhiệm vụ: xác thực người dùng thông qua JWT
// - nếu hợp lệ: gắn user vào req.user và cho request đi tiếp
export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Lấy Authorization header từ request
        // Thường có dạng: "Bearer <token>"
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new AppError("Authentication required", 401);
        }

        // Tách token ra khỏi chuỗi "Bearer <token>"
        // - nếu bắt đầu bằng "Bearer " thì cắt 7 ký tự đầu
        // - nếu không thì dùng luôn giá trị header
        const token = authHeader.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : authHeader.trim();

        // Kiểm tra biến môi trường JWT_SECRET
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        // Verify token bằng JWT_SECRET
        // - nếu token hợp lệ: trả về payload
        // - nếu token sai / hết hạn: sẽ throw error
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
            userId: string; // payload lưu userId khi tạo token
        };

        // Tìm user trong database dựa trên userId từ token
        // - chỉ chấp nhận user còn active
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
                isActive: true,
            },
        });

        if (!user) {
            throw new AppError("User not found or inactive", 401, "USER_NOT_FOUND");
        }

        // Gắn thông tin user vào request
        req.user = user;

        // Cho phép request đi tiếp
        next();
    } catch (error) {
        if (error instanceof AppError) {
            next(error);
        } else {
            next(new AppError("Invalid or expired token", 401, "INVALID_TOKEN"));
        }
    }
};

// Middleware authorize
// - dùng để phân quyền theo role
// - nhận vào danh sách role được phép truy cập
export const authorize = (...roles: string[]) => {
    // Trả về middleware thực tế
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        // Nếu chưa có req.user
        // => user chưa được authenticate
        if (!req.user) {
            throw new AppError("Authentication required", 401, "AUTH_REQUIRED");
        }

        // Kiểm tra role của user có nằm trong danh sách role cho phép hay không
        if (!roles.includes(req.user.role)) {
            throw new AppError("Insufficient permissions", 403, "INSUFFICIENT_PERMISSIONS");
        }

        // Nếu hợp lệ role => cho request đi tiếp
        next();
    };
};
