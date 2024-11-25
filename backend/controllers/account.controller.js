import { Admin } from "../models/admin.model.js";
import { Moderator } from "../models/moderator.model.js";
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export async function updateProfile(req, res) {
    try {
        const { id } = req.params;
        const { username, email, password, avatar } = req.body;        
        const role = req.role;

        let Model;
        if (role === 'user') Model = User;
        else if (role === 'admin') Model = Admin;
        else if (role === 'moderator') Model = Moderator;

        // provided fields
        const updateFields = {};

        if (username) {
            const existingUsername = await Model.findOne({ 
                username,
                _id: { $ne: id } // exclude current user
            });

            if (existingUsername) {
                return res.status(400).json({
                    success: false,
                    message: "Username already exists"
                });
            }
            updateFields.username = username;
        }

        if (email) {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid email"
                });
            }

            const existingEmail = await Model.findOne({ 
                email,
                _id: { $ne: id } // exclude current user
            });

            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }
            updateFields.email = email;
        }

        if (password) {
            // Validate password length
            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be at least 8 characters"
                });
            }

            // Hash the new password
            const salt = await bcryptjs.genSalt(10);
            updateFields.password = await bcryptjs.hash(password, salt);
        }

        if (avatar) {
            // TODO: validation for avatar URL
            updateFields.avatar = avatar;
        }

        // If no fields to update
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update"
            });
        }

        let updatedAccount;
        updatedAccount = await Model.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        ).select("-password");

        res.status(200).json({
            success: true,
            account: updatedAccount,
            message: "Profile updated successfully"
        });

    } catch (error) {
        console.log("Error in updateProfile controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}