"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const token_service_1 = __importDefault(require("../services/token.service"));
const COOKIE_NAME = "sessionToken";
function authMiddleware(req, res, next) {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) {
        res.status(401).json({ success: false, message: "Unauthorized" });
        return;
    }
    try {
        const payload = token_service_1.default.verifyToken(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({ success: false, message: "Unauthorized" });
    }
}
