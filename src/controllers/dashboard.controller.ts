import { Response } from "express";
import { Record } from "../models/record.model";
import { AuthRequest } from "../middlewares/auth.middleware";

export const getDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    //Total income
    const totalIncome = await Record.aggregate([
      { $match: { user: userId, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //total  expense
    const totalExpense = await Record.aggregate([
      { $match: { user: userId, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //category-wise
    const categoryData = await Record.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    //monthly trend
    const monthlyData = await Record.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    // recent transaction
    const recent = await Record.find({ user: userId })
      .sort({ date: -1 })
      .limit(5);

    res.json({
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      balance:
        (totalIncome[0]?.total || 0) -
        (totalExpense[0]?.total || 0),
      categoryData,
      monthlyData,
      recent,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};