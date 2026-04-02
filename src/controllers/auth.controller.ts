import { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";

//for login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //checking user
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // check passwd
    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create a token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//for register
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      message: "User created",
      user: userObj,
    });
  } catch (error: any) {
    console.error("Registration Error:", error);

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};
