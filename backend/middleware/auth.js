import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  const {token} = req.headers;
    if (!token) {
    return res.json({ success:false, message: 'No token, authorization denied' });
  }
    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } catch (err) {   
    res.json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;