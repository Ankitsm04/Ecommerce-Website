const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body;

            const userExist = await Users.findOne({ email });
            if (userExist) return res.status(400).json({ msg: "Email Already Registered" });

            if (password.length < 6)
                return res.status(400).json({ msg: "Password is at least 6 characters" });

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new Users({
                name, email, password: passwordHash
            });

            // Save to MongoDB
            await newUser.save();

            // Create JWT for authentication
            const accesstoken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });

            res.json({ accesstoken, refreshtoken });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            const userExists = await Users.findOne({ email });
            if (!userExists) return res.status(401).json({ msg: "Invalid email" });

            const isMatch = await bcrypt.compare(password, userExists.password);
            if (!isMatch) return res.status(401).json({ msg: "Invalid password" });

            const accesstoken = createAccessToken({ id: userExists._id });
            const refreshtoken = createRefreshToken({ id: userExists._id });

            res.json({
                msg: "Logged in Successfully",
                accesstoken,
                refreshtoken,
                userId: userExists._id.toString(),
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    logout: async (req, res) => {
        try {
            res.json({ msg: "Logged Out" }); // Simply notify the frontend to remove tokens
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password');
            if (!user) return res.status(400).json({ msg: "User Not Found" });
            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

module.exports = userCtrl;
