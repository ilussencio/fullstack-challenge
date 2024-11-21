import { Request, Response } from "express";

export const getExample = (req: Request, res: Response) => {
  res.json({ message: "GET example endpoint" });
};

export const postExample = (req: Request, res: Response) => {
  const data = req.body;
  res.json({ message: "POST example endpoint", data });
};
