const logout = async (req, res) => {
    const allowedDomains = [
        "http://localhost:5173",
        "http://localhost:5174", 
        "https://food-delivery-app-swj3.vercel.app",
        "https://food-delivery-app-rose-one.vercel.app"
        
    ]
    const origin = req.headers.origin;

    // Determine if the request's origin is in the list of allowed domains
    const domain = allowedDomains.find((allowedDomain) => origin.includes(allowedDomain));

    if (domain) {
        res.clearCookie('accessToken');
    
        res.clearCookie('refreshToken');
    } else {
        res.status(400).json({ success: false, message: "Invalid domain" });
        return;
    }

    res.status(200).json({ success: true, message: "Successfully logged out" });
}

export { logout };
