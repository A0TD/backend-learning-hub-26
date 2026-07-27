import "dotenv/config";
import type { Request, Response } from "express";
import { users } from "../data/userData.ts";
import type { User } from "../data/userData.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const foundUser = users.find((user) => user.email === email);

    if (foundUser)
      return res.status(400).send("Email already exists! Try a different one.");

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: User = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role: "user",
    };

    users.push(newUser);

    return res.status(201).send("User created!" + newUser);
  } catch (error) {
    res.status(500).send(`Error message: ${error}`);
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const foundUser = users.find((user) => user.email === email);

    if (!foundUser) return res.status(400).send("Incorrect email or password!");

    const correctPassword = await bcrypt.compare(password, foundUser.password);

    if (!correctPassword)
      return res.status(400).send("Incorrect email or password!");

    const token = jwt.sign(
      { id: foundUser.id, role: foundUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "60m" },
    );

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).send("Signed in!");
  } catch (error) {
    res.status(500).send(`Error message: ${error}`);
  }
};

const signOut = (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    res.status(200).send("Signed out successfully!");
  } catch (error) {
    res.status(500).send(`Error message: ${error}`);
  }
};

const getProfile = (req: Request, res: Response) => {
  return res.status(200).send("You are authenticated!");
};

const getAdminProfile = (req: Request, res: Response) => {
  return res.status(200).send("Welcome Admin!");
};

export { signUp, signIn, signOut, getProfile, getAdminProfile };
