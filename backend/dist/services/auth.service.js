"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.findUserById = findUserById;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const usersPath = path_1.default.resolve(__dirname, "../data/users.json");
async function readUsers() {
    const data = await fs_1.promises.readFile(usersPath, "utf-8");
    return JSON.parse(data);
}
async function writeUsers(users) {
    await fs_1.promises.writeFile(usersPath, JSON.stringify(users, null, 2));
}
async function register(dto) {
    const users = await readUsers();
    const existingByEmail = users.find((u) => u.email === dto.email);
    if (existingByEmail) {
        throw new Error("User with this email already exists");
    }
    const existingByLogin = users.find((u) => u.login === dto.login);
    if (existingByLogin) {
        throw new Error("User with this login already exists");
    }
    const hashedPassword = await bcrypt_1.default.hash(dto.password, 10);
    const newUser = {
        id: (0, uuid_1.v4)(),
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
async function login(dto) {
    const users = await readUsers();
    const user = users.find((u) => u.email === dto.email);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt_1.default.compare(dto.password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    return user;
}
async function findUserById(id) {
    const users = await readUsers();
    return users.find((u) => u.id === id) ?? null;
}
