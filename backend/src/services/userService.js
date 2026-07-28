const User = require('../models/user');
const bcrypt = require('bcrypt');

class UserService {
    async getAllUsers() {
        const users = await User.find();
        return users;
    }

    async getUserById(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async getUserByEmail(email) {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async createUser(userData) {
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const hashed = await bcrypt.hash(userData.password, 10);
        const newUser = new User({ ...userData, password: hashed });
        await newUser.save();
        return newUser;
    }

    async updateUser(userId, updatedData) {
        if (updatedData.password) {
            updatedData.password = await bcrypt.hash(updatedData.password, 10);
        }
        const existingUser = await User.findOne({ email: updatedData.email, _id: { $ne: userId } });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    }

    async deleteUser(userId) {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
}

module.exports = new UserService();