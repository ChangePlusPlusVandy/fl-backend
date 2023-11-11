import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const getAllUsers = async (req: Request, res: Response) => {
  res.send("getAllUsers works");
};

//add a new user:
export const insertUser = async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body);
    await newUser.save();
    return res.status(200).json(newUser);
  } catch (err: any) {
    console.log(err.message);
    return res.status(400).send({ message: err.message });
  }
};
