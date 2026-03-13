"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
exports.logout = logout;
const authService = __importStar(require("../services/auth.service"));
const token_service_1 = __importDefault(require("../services/token.service"));
const COOKIE_NAME = "sessionToken";
async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);
        const token = token_service_1.default.generateToken({
            userId: user.id,
            email: user.email,
        });
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: token_service_1.default.COOKIE_MAX_AGE_MS,
            sameSite: "lax",
            path: "/",
        });
        res.status(201).json({
            success: true,
            data: { userId: user.id },
        });
    }
    catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    try {
        const user = await authService.login(req.body);
        const token = token_service_1.default.generateToken({
            userId: user.id,
            email: user.email,
        });
        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            maxAge: token_service_1.default.COOKIE_MAX_AGE_MS,
            sameSite: "lax",
            path: "/",
        });
        res.json({
            success: true,
            data: { userId: user.id },
        });
    }
    catch (error) {
        next(error);
    }
}
function logout(_req, res, next) {
    try {
        res.clearCookie(COOKIE_NAME, { path: "/" });
        res.json({ success: true });
    }
    catch (error) {
        next(error);
    }
}
