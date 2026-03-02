import { Request, Response, NextFunction } from "express";

interface User {
  id: number;
  name: string;
}

let users: User[] = [];

export const getUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json(users);
};

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new Error("Name is required");
    }

    const newUser: User = {
      id: Date.now(),
      name,
    };

    users.push(newUser);

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};