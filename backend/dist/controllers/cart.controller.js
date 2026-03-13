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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCart = getCart;
exports.addToCart = addToCart;
exports.updateCartItem = updateCartItem;
exports.removeFromCart = removeFromCart;
const cartService = __importStar(require("../services/cart.service"));
async function getCart(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const items = await cartService.getCartByUserId(userId);
        res.json({ success: true, data: items });
    }
    catch (error) {
        next(error);
    }
}
async function addToCart(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const { productId, quantity } = req.body;
        const qty = typeof quantity === "number" && quantity > 0 ? quantity : 1;
        const items = await cartService.addItem(userId, productId, qty);
        res.status(201).json({ success: true, data: items });
    }
    catch (error) {
        next(error);
    }
}
async function updateCartItem(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const productId = req.params.productId;
        const { quantity } = req.body;
        const items = await cartService.updateItemQuantity(userId, productId, quantity);
        res.json({ success: true, data: items });
    }
    catch (error) {
        next(error);
    }
}
async function removeFromCart(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const productId = req.params.productId;
        const items = await cartService.removeItem(userId, productId);
        res.json({ success: true, data: items });
    }
    catch (error) {
        next(error);
    }
}
