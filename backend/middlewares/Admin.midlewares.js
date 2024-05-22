import jwt from 'jsonwebtoken';

export const generateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }); // Set your secret key
    const options = {
        maxAge: 3600000, // 1 hour in milliseconds
        httpOnly: true,
        secure: false, // Use true if your site uses HTTPS
        sameSite: 'strict'
    };
    res.cookie('token', token, options);
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        res.status(400).json({error: 'Invalide token'})
    }
}
