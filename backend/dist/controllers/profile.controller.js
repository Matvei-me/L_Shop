"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = getProfile;
const auth_service_1 = require("../services/auth.service");
async function getProfile(req, res, next) {
    try {
        const userId = req.userId;
        if (!userId) {
            res.status(401).json({ success: false, message: "Unauthorized" });
            return;
        }
        const user = await (0, auth_service_1.findUserById)(userId);
        if (!user) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }
        const profile = {
            id: user.id,
            name: user.name,
            email: user.email,
            login: user.login,
            phone: user.phone,
        };
        res.json({ success: true, data: profile });
    }
    catch (error) {
        next(error);
    }
}
