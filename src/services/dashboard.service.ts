import { prisma } from "../config/prisma";

// 1. Summary (income, expense, net)
export const getSummary = async () => {
  const result = await prisma.records.groupBy({
    by: ["type"],
    _sum: {
      amount: true,
    },
  });

  let totalIncome = 0;
  let totalExpense = 0;

  result.forEach((r) => {
    if (r.type === "INCOME") totalIncome = Number(r._sum.amount || 0);
    if (r.type === "EXPENSE") totalExpense = Number(r._sum.amount || 0);
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};

// 2. Category-wise breakdown
export const getCategoryBreakdown = async () => {
  const result = await prisma.records.groupBy({
    by: ["category"],
    _sum: {
      amount: true,
    },
  });

  return result.map((r) => ({
    category: r.category,
    total: Number(r._sum.amount || 0),
  }));
};

// 3. Monthly trends
export const getMonthlyTrends = async () => {
  const records = await prisma.records.findMany({
    select: {
      amount: true,
      type: true,
      date: true,
    },
  });

  const trends: any = {};

  records.forEach((r) => {
    const month = new Date(r.date).toISOString().slice(0, 7); // YYYY-MM

    if (!trends[month]) {
      trends[month] = { income: 0, expense: 0 };
    }

    if (r.type === "INCOME") {
      trends[month].income += Number(r.amount);
    } else {
      trends[month].expense += Number(r.amount);
    }
  });

  return Object.entries(trends).map(([month, data]: any) => ({
    month,
    ...data,
  }));
};

// 4. Recent activity
export const getRecentActivity = async () => {
  return prisma.records.findMany({
    orderBy: { created_at: "desc" },
    take: 5,
  });
};