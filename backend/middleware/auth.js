import dotenv from "dotenv"
dotenv.config()

import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    
    
    const accessToken = req.cookies.accessToken
    console.log("Am here and am trying to verify that the user is logged in");
    
    console.log(accessToken);
    

    if (!accessToken) {
        console.log("No access-token");
        return refresh(req, res, next);  // Pass next() to refresh so it can call it if needed
        return res.status(401).json({ success: false, message: "Unauthorized Login again" });
    }

 
    

    try { 
        jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) {
                    console.log("Token verification failed:", err);
                    return res.status(403).json({ message: "Forbidden" });
                }
                req.body.userId = decoded.id;
                next();
            }
        );
    } catch (error) {
        console.log("Error in auth middleware:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


const refresh = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    console.log(`This is refreshToken -------- ${refreshToken}`);
    

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "No Refresh token" });
            }

            const accessToken = jwt.sign(
                { id: decoded.id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1m" }
            );

            res.cookie("accessToken", accessToken, { 
                httpOnly: true,
               
                maxAge: 1 * 24 * 60 * 60 * 1000
            })
            req.body.userId = decoded.id;

            // Call next() here to continue with the next middleware/controller
            next();
        }
    );
};

export default authMiddleware;
