import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Convert 'id' to '_id' to match MongoDB format
        req.user = {
            _id: decoded.id,
            email: decoded.email
        };
        
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export const isAuth = authenticate; 