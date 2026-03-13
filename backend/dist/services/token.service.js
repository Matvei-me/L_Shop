"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.COOKIE_MAX_AGE_MS = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const COOKIE_MAX_AGE_SEC = 10 * 60; // 10 минут
exports.COOKIE_MAX_AGE_MS = COOKIE_MAX_AGE_SEC * 1000;
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, env_1.JWT_SECRET, {
        expiresIn: COOKIE_MAX_AGE_SEC,
    });
}
function verifyToken(token) {
    const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
    return { userId: decoded.userId, email: decoded.email };
}
exports.default = {
    generateToken,
    verifyToken,
    COOKIE_MAX_AGE_MS: exports.COOKIE_MAX_AGE_MS,
};
