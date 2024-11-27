import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";
import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import { Moderator } from "../models/moderator.model.js";
import { ROLES } from "../constants/roles.constants.js";

export const protectRoute = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            // check if user is logged in (having token in cookie)
            const token = req.cookies['jwt-masakmasak'];

            if (!token) {
                return res.status(401).json({ 
                    success: false, 
                    message: "Unauthorized - No token provided" 
                });
            }

            // check if token is valid
            const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
            if (!decoded) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized - Invalid Token"
                });
            }

            // Check if user's role is allowed
            if (!allowedRoles.includes(decoded.role)) {
                return res.status(403).json({ 
                    success: false, 
                    message: "Forbidden - Insufficient permissions" 
                });
            }       

            // check if account exists
            let account;
            switch (decoded.role) {
                case ROLES.GUEST:
                    account = { _id: "guest" };
                    break;
                case ROLES.USER:
                    account = await User.findById(decoded.accountId).select("-password");
                    break;
                case ROLES.ADMIN:
                    account = await Admin.findById(decoded.accountId).select("-password");
                    break;
                case ROLES.MOD:
                    account = await Moderator.findById(decoded.accountId).select("-password");
                    break;
                default:
                    return res.status(401).json({
                        success: false,
                        message: "Invalid role specified"
                    });
            }
            if (!account) {
                return res.status(401).json({
                    success: false,
                    message: "Account not found"
                });
            }

            // attach account to req, for further use in controllers
            req.account = account;
            req.role = decoded.role;

            next();

        } catch (error) { 
            console.log("Error in protectRoute middleware", error);
            res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}
