const authService = require('./auth.service');

const loginController = (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = authService.login(username, password);
        if (token) {
            res.json({
                status: true,
                message: 'Login successful',
                data: { token },
            });
        } else {
            res.status(401).json({
                status: false,
                message: 'Invalid username or password',
            });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    loginController,
};
