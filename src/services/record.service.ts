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
  const {
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = filters;

  const pageNumber = Number(page);
  const pageSize = Number(limit);
  const skip = (pageNumber - 1) * pageSize;

  const whereClause = {
    ...(type && { type }),
    ...(category && { category }),
    ...(startDate &&
      endDate && {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      }),
  };

  // Important: get total count for pagination metadata
  const [data, total] = await Promise.all([
    prisma.records.findMany({
      where: whereClause,
      skip,
      take: pageSize,
      orderBy: { date: "desc" },
    }),
    prisma.records.count({
      where: whereClause,
    }),
  ]);

  return {
    data,
    meta: {
      total,
      page: pageNumber,
      limit: pageSize,
      totalPages: Math.ceil(total / pageSize),
    },
  };
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