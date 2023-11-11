import express, { Request, Response } from "express";

export const getAllReports = async (req: Request, res: Response) => {
  res.send("getAllReports works");
};
