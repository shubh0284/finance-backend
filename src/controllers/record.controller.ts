import { Request, Response } from "express";
import { Record } from "../models/record.model";
import { AuthRequest } from "../middlewares/auth.middleware";

//create record
export const createRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json(record);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//get all record
export const getRecords = async (req: AuthRequest, res: Response) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    const filter: any = { user: req.user.id };

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate as string),
        $lte: new Date(endDate as string),
      };
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//updare record
export const updateRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true },
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

//delete record
export const deleteRecord = async (req: AuthRequest, res: Response) => {
  try {
    const record = await Record.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
