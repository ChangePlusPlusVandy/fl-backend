import express, { Request, Response } from "express";

export const getAllAttendance = async (req: Request, res: Response) => {
  res.send("getAllAttendances works");
};
