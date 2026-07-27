import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "../data/userData.ts";
export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.token;

  if (!token) return res.status(401).send("Authentication failure!");

  next();
};

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).send("Authentication failure!");

    const verification = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as { id: number; role: Role };

    if (verification.role !== "admin")
      return res.status(403).send("Authorization failure!");

    next();
  } catch (error) {
    return res.status(500).send(`Error message: ${error}`);
  }
};
