const repoAuth = require('../repository/auth');
const jwt = require('jsonwebtoken');



const checkAuth = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Mengambil bagian token setelah "Bearer "
        
        jwt.verify(token, "rahasia", (err, decoded) => {
        if (err) {
            return res.status(403).json({ status_code: 403, message: 'Token Tidak Valid, Silahkan Login Ulang' });
        } else {
            req.user = decoded; // Menyimpan payload di objek req.user
            next(); // Lanjut ke middleware berikutnya
        }
        });
    } else {
        res.status(401).json({ message: 'Token tidak ditemukan dalam header Authorization.' });
    }
}

const login = async (req, res) => {
    try {
        const username = req.body.username;
        const password = req.body.password;

        const authResult = await repoAuth.findByUsername(username);

        if (!authResult) {
            res.status(404).json({
                status_code: 404,
                message: "user not found",
            });
            return;
        }

        if (password !== authResult.password) {
            res.status(400).json({
                status_code: 400,
                message: "incorrect password",
            });
            return;
        }

        req.session.userId = authResult.id;
        const payload = {
            id: authResult.id,
            username: authResult.username
          };
          
          const secretKey = 'rahasia';
          
          const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });
          

        res.status(200).json({
            status_code: 200,
            message: "login success",
            username: authResult.username,
            token: token,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status_code: 500,
            message: error.message
        });
        return;
    }
}

const logout = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({
                status_code: 500,
                message: error.message
            });
            return;
        } else {
            res.status(200).json({
                status_code: 200,
                message: "logout success"
            });
            return;
        }
    })
}

module.exports = {
    checkAuth,
    login,
    logout,
}