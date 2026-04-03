import { prisma } from "../config/prisma";

export const getAllUsers = async () => {
  return prisma.users.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      is_active: true,
      created_at: true,
    },
  });
};

export const updateUserRole = async (id: string, role: string) => {
  return prisma.users.update({
    where: { id },
    data: { role },
  });
};

export const updateUserStatus = async (id: string, is_active: boolean) => {
  return prisma.users.update({
    where: { id },
    data: { is_active },
  });
};