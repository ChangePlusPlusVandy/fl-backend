import express, { Request, Response } from "express";

export const getAllMessages = async (req: Request, res: Response) => {
  res.send("getAllMessages works");
};
