import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const authMiddleware = async(req, res, next) => {
    try {
        const token = await req.headers.authorization?.split(" ")[1];
        
        if(!token) {
            return res.status(401).json({message: "Unauthorized"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next()
    } catch (error) {
        console.log("JWT middleware error: ", error);
        return res.status(500).json({message: "Invalid Token"});
    }
}