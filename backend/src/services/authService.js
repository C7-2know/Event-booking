const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const user = require('../models/user');

class AuthService {
    async register(userData){
        const user = await userService.createUser(userData);
        const token = await this.generateToken(user);
        return { user, token };
    }
    
    async login(email, password){
        const user = await userService.getUserByEmail(email);
        if(!user){
            throw new Error("User not found");
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid credentials");
        }
        const token = await this.generateToken(user);
        return { user, token };
    }

    async generateToken(user){
        return await jwt.sign({ id: user._id, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    }

    async verifyToken(token){
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (error){
            throw new Error("Invalid token");
        }
    }
}

module.exports = new AuthService();