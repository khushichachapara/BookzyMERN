const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    console.log(req.params)
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: " authentication token require" });

    }
    jwt.verify(token, "bookstore123", (err, user) => {
        //console.log(token);
        
        if (err) {
            console.log(err)
            return res.status(403).json({ message: "token expired, please signIn again." });
        }
        req.user = user;
        next();
    });
};
module.exports = {authenticateToken};