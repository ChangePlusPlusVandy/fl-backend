import express, { Request, Response } from "express";

export const getAllUsers = async (req: Request, res: Response) => {
  res.send("getAllUsers works");
};
