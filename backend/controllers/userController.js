import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel.js"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

const tokenBlacklist = [];

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "User doesn't exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token, message: "Logged in Successfully" })
        }
        else {
            res.json({ success: false, message: "Invalid Credentials" })
        }
    } catch {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        // checking user already exists or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        //  validating email format & strong password
        if (!validator.isEmail(email))
            return res.json({ success: false, message: "Please enter a valid email" })
        if (password.length < 6) {
            return res.json({ success: false, message: "Please enter at least 6 characters" })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name, email, password: hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)

        res.json({ success: true, token, message: "Registered Successfully" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        const token = jwt.sign(
            {
                email: process.env.ADMIN_EMAIL
            },
            process.env.JWT_SECRET,
            { expiresIn: "6h" }
        );
        res.json({ success: true, token, message: "Logged in Successfully" });
    } else {
        res.json({ success: false, message: "Invalid Credentials" });
    }
};

const adminLogout = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.json({ success: false, message: 'No token provided' });
        }

        const token = authHeader.split(' ')[1];
        const expiresAt = Date.now() + 6 * 60 * 60 * 1000; // 6h

        // 🧹 Clean expired tokens before adding new one
        const now = Date.now();
        for (let i = tokenBlacklist.length - 1; i >= 0; i--) {
            if (tokenBlacklist[i].expiresAt < now) {
                tokenBlacklist.splice(i, 1);
            }
        }

        // ➕ Add token to blacklist
        tokenBlacklist.push({ token, expiresAt });

        return res.json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        return res.json({ success: false, message: 'Logout failed' });
    }
};



export { loginUser, registerUser, adminLogin, adminLogout, tokenBlacklist }