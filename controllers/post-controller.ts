import express, { Request, Response } from "express";

export const getAllPosts = async (req: Request, res: Response) => {
  res.send("getAllPosts works");
};
