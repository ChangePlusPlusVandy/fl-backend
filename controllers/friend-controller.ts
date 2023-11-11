import express, { Request, Response } from "express";
import { Friend } from "../models/friend.model";

export const getAllFriends = async (req: Request, res: Response) => {
  res.send("getAllFriends works");
};
