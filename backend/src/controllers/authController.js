const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const { user, token } = await authService.register(req.body);
        res.status(201).json({ user, token });  
    }catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.login = async (req, res, next) => {
    try {
        const { user, token } = await authService.login(req.body.email, req.body.password);
        res.status(200).json({ user, token });
    }catch (error) {
        res.status(401).json({ message: error.message });
    }   
}