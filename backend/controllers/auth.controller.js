import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js";
import { Moderator } from "../models/moderator.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { ROLES } from "../constants/roles.constants.js";

// TODO: this maybe no needed
/**
 * @route   POST /api/v1/guest
 * @desc    Create a guest user 
 * @access  Public
 */
export async function initGuest(req, res) {
    try {
        // give a token to guest user
        generateTokenAndSetCookie(ROLES.GUEST, ROLES.GUEST, res);

        res.status(200).json({
            success: true,
            message: "Guest user created successfully"
        })
    } catch (error) {
        console.log("Error in guestUser controller", error);
    }
}

/**
 * @route   GET /api/v1/auth/check
 * @desc    Check authentication status
 * @access  Public
 */
export async function authCheck(req, res) {
    try {
        res.status(200).json({
            success: true,
            account: req.account,
            role: req.role
        })
    } catch (error) {
        console.log("Error in authCheck controller: " + error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }
}

/**
 * @route   POST /api/v1/auth/signup/:role
 * @desc    Sign up a new user
 * @access  Public
 */
export async function signup(req, res) {
    try {
        const { role } = req.params;
        const { username, email, password, key } = req.body;

        if (role !== ROLES.USER && role !== ROLES.ADMIN && role !== ROLES.MOD) {
            return res.status(400).json({
                success: false,
                message: "Invalid role"
            });
        }

        if (role == ROLES.ADMIN || role == ROLES.MOD) {

            // check if key is provided
            if (!key) {
                return res.status(400).json({
                    success: false,
                    message: "Key is required"
                });
            }

            // check if key is correct
            if (role == ROLES.ADMIN && key !== process.env.ADMIN_KEY) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid admin key"
                });
            }
            else if (role == ROLES.MOD && key !== process.env.MOD_KEY) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid moderator key"
                });
            }
        }

        // check if all fields are filled
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // check if email is valid
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            });
        }

        // check if password is at least 8 characters
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }

        // Valid credentials, now hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // generate random profile pic
        const PROFILE_PICS = [
            "/avatar1.png",
            "/avatar2.png",
            "/avatar3.png",
        ];
        const avatar = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];
        let newAccount;

        let Model;
        if (role === ROLES.USER) Model = User;
        else if (role === ROLES.ADMIN) Model = Admin;
        else if (role === ROLES.MOD) Model = Moderator;

        // check if email is existing
        const existingAccByEmail = await Model.findOne({ email });
        if (existingAccByEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // check if username is existing
        const existingAccByUsername = await Model.findOne({ username });
        if (existingAccByUsername) {
            return res.status(400).json({
                success: false,
                message: "Username already exists"
            });
        }

        // create new user
        newAccount = new Model({
            email,
            username,
            password: hashedPassword,
            avatar
        })

        generateTokenAndSetCookie(role, newAccount._id, res);

        await newAccount.save();

        res.status(201).json({
            success: true,
            // this account returns accountData without pw
            account: {
                ...newAccount._doc,
                password: ""
            },
            role,
            message: "Account created successfully"
        });
    } catch (error) {
        console.log("Error in signup controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * @route   POST /api/v1/auth/login/:role
 * @desc    Log in a user
 * @access  Public
 */
export async function login(req, res) {
    try {
        const { role } = req.params;
        const { email, password, key } = req.body;

        if (role == ROLES.ADMIN || role == ROLES.MOD) {

            // check if key is provided
            if (!key) {
                return res.status(400).json({
                    success: false,
                    message: "Key is required"
                });
            }

            // check if key is correct
            if (role == ROLES.ADMIN && key !== process.env.ADMIN_KEY) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid admin key"
                });
            }
            else if (role == ROLES.MOD && key !== process.env.MOD_KEY) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid moderator key"
                });
            }
        }

        // check if all fields are filled
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        let account;
        if (role == ROLES.USER) {
            account = await User.findOne({ email: email });
        }
        else if (role == ROLES.ADMIN) {
            account = await Admin.findOne({ email: email });
        }
        else if (role == ROLES.MOD) {
            account = await Moderator.findOne({ email: email });
        }

        // check if entered user exists
        if (!account) {
            return res.status(400).json({
                success: false,
                message: "Account does not exist"
            });
        }

        // check if password is correct
        const isPasswordCorrect = await bcryptjs.compare(password, account.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // login successful
        generateTokenAndSetCookie(role, account._id, res);
        res.status(200).json({
            success: true,
            // this account returns accountData without pw
            account: {
                ...account._doc,
                password: ""
            },
            role,
            message: "Login successful"
        })

    } catch (error) {
        console.log("Error in login controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

/**
 * @route   POST /api/v1/auth/logout
 * @desc    Log out the user
 * @access  Public
 */
export async function logout(req, res) {
    try {
        res.clearCookie(`jwt-masakmasak`);
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    } catch (error) {
        console.log("Error in logout controller", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

