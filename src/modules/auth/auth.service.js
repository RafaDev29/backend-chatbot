const jwt = require('jsonwebtoken');

// Static users
const USERS = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
];

// Secret for token generation
const SECRET_KEY = 'botatugaaa'; // Cambia esto por una clave más segura

const login = (username, password) => {
    const user = USERS.find(
        (u) => u.username === username && u.password === password
    );
    if (user) {
        const token = jwt.sign({ username: user.username }, SECRET_KEY, {
            expiresIn: '1h',
        });
        return token;
    }
    return null;
};

module.exports = {
    login,
};
