"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
let users = [];
const getUsers = (req, res, next) => {
    res.json(users);
};
exports.getUsers = getUsers;
const createUser = (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) {
            throw new Error("Name is required");
        }
        const newUser = {
            id: Date.now(),
            name,
        };
        users.push(newUser);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
};
exports.createUser = createUser;
