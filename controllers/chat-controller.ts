import express, { Request, Response } from "express";

export const getAllChats = async (req: Request, res: Response) => {
  res.send("getAllChats works");
};
