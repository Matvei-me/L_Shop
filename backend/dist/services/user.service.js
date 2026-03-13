"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_data_1 = require("../data/user.data");
class UserService {
    register(name, email, password) {
        if (!name || !email || !password) {
            throw new Error("All fields are required");
        }
        const existing = user_data_1.users.find(u => u.email === email);
        if (existing) {
            throw new Error("User already exists");
        }
        const newUser = {
            id: String(Date.now()),
            name,
            email,
            login: email,
            phone: "",
            password,
        };
        user_data_1.users.push(newUser);
        return newUser;
    }
    login(email, password) {
        const user = user_data_1.users.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        return user;
    }
}
exports.default = new UserService();
