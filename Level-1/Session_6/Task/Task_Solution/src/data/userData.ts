export type Role = "user" | "admin";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  role: Role;
}

export const users: User[] = [
  {
    id: 1,
    username: "Huissan",
    email: "test1@gmail.com",
    password: "123abc",
    role: "user",
  },
  {
    id: 2,
    username: "Khaled",
    email: "test12@gmail.com",
    password: "password123",
    role: "user",
  },
  {
    id: 3,
    username: "Mohamed",
    email: "test123@gmail.com",
    password: "pass123",
    role: "admin",
  },
  {
    id: 4,
    username: "Yousef",
    email: "test1234@gmail.com",
    // pass:wordpass1
    password: "$2b$10$7dSkXqdHCniKiubvtGsRi.bKz0G2ArGG3UO3plU24o4CHtwa/b12a",
    role: "admin",
  },
];
