import { User } from "@prisma/client";

export const excludePassword = (user: User): Omit<User, "password"> => {
  const { password: _password, ...userWithoutPassword } = user;
  return userWithoutPassword as Omit<User, "password">;
};

export const excludePasswordFromUsers = (
  users: User[]
): Omit<User, "password">[] => {
  return users.map((user) => excludePassword(user));
};