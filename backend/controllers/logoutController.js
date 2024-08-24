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
    console.log(domain);
    console.log("Am here");
    
    

    if (domain) {
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: domain // Dynamic domain setting
        });
    
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            domain: domain // Dynamic domain setting
        });
    } else {
        res.status(400).json({ success: false, message: "Invalid domain" });
        return;
    }

    res.status(200).json({ success: true, message: "Successfully logged out" });
}

export { logout };
