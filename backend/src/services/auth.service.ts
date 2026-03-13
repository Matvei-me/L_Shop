import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { User } from "../models/user.model";
import { RegisterDto, LoginDto } from "../types/auth.types";

const usersPath = path.resolve(__dirname, "../data/users.json");

async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(usersPath, "utf-8");
  return JSON.parse(data) as User[];
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(usersPath, JSON.stringify(users, null, 2));
}

export async function register(dto: RegisterDto): Promise<User> {
  const users = await readUsers();

  if (users.some((u) => u.email === dto.email)) {
    throw new Error("email уже занят");
  }
  if (users.some((u) => u.login === dto.login)) {
    throw new Error("логин уже занят");
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  const newUser: User = {
    id: uuidv4(),
    name: dto.name,
    email: dto.email,
    login: dto.login,
    phone: dto.phone,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  await writeUsers(users);

  return newUser;
}

export async function login(dto: LoginDto): Promise<User> {
  const users = await readUsers();

  const user = users.find((u) => u.email === dto.email);
  if (!user || !(await bcrypt.compare(dto.password, user.password))) {
    throw new Error("Не зашло — проверь email и пароль");
  }

  return user;
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}
