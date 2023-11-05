import express, { Request, Response } from "express";

export const getAllFriends = async (req: Request, res: Response) => {
  res.send("getAllFriends works");
};
