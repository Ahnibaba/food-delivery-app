import jwt from "jsonwebtoken";

const verifyJwt = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    console.log(accessToken);
    

    if (!accessToken) {
        console.log("No accessToken");
        
        return refresh(req, res, next);  // Pass next() to refresh so it can call it if needed
    }

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Forbidden" });
            }
            req.body.id = decoded.id;
            next();
        }
    );
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
                { expiresIn: "7d" }
            );

            res.cookie("accessToken", accessToken, { maxAge: 7 * 24 * 60 * 60 * 1000});
            req.body.id = decoded.id;

            // Call next() here to continue with the next middleware/controller
            next();
        }
    );
};

export { verifyJwt };
