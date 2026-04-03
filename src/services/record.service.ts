import { prisma } from "../config/prisma";

export const createRecord = async (data: any, userId: string) => {
  return prisma.records.create({
    data: {
      ...data,
      date: new Date(data.date),
      user_id: userId,
    },
  });
};

export const getRecords = async (filters: any) => {
  const { type, category, startDate, endDate } = filters;

  return prisma.records.findMany({
    where: {
      ...(type && { type }),
      ...(category && { category }),
      ...(startDate &&
        endDate && {
          date: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
    },
    orderBy: { date: "desc" },
  });
};

export const updateRecord = async (id: string, data: any) => {
  return prisma.records.update({
    where: { id },
    data,
  });
};

export const deleteRecord = async (id: string) => {
  return prisma.records.delete({
    where: { id },
  });
};