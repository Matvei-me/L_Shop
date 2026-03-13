import { users } from "../data/user.data";
import { IUser } from "../types/user.types";

class UserService {
  register(name: string, email: string, password: string): IUser {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existing = users.find(u => u.email === email);
    if (existing) {
      throw new Error("User already exists");
    }

    const newUser: IUser = {
      id: String(Date.now()),
      name,
      email,
      login: email,
      phone: "",
      password,
    };

    users.push(newUser);
    return newUser;
  }

  login(email: string, password: string): IUser {
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return user;
  }
}

export default new UserService();