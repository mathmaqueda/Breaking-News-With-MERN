import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from '../services/user.service.js';

dotenv.config();

export const authMiddleware = (req, res, next) => {
    try {
        const { authorization } = req.headers;
        
        if (!authorization) {
            return res.status(401).send({ message: "Invalid authorization" });
        }
    
        const parts = authorization.split(" ");
    
        if (parts.length !== 2) {
            return res.status(401).send({ message: "Invalid authorization" });
        }
    
        const [schema, token] = parts;
    
        if (schema !== "Bearer") {
            return res.status(401).send({ message: "Invalid authorization" });
        }
    
        jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
            if (error) {
                return res.status(401).send({ message: "Invalid token" });
            }

            const user = await userService.findByIdService(decoded.id);

            if (!user || !user.id) {
                return res.status(401).send({ message: "User not found" });
            }

            req.userId = user.id; 

            // next sempre deve estar acessível, senão crasha.
            return next();
        })
    } catch (err) {
        res.status(500).send(err.message);
    }
}