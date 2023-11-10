const verifyTokenAndAuthorization = (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers['x-access-token'];

        if (!token) {
            return res.status(403).send('Token is required for authentication');
        }

        jwt.verify(token, config.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    message: `Invalid Token ${err}.`
                });
            }

            req.user = decoded.user;

            if (req.user.user_id === req.params.user_id || req.user.role) {
                next();
            } else {
                res.status(403).json("You are not allowed");
            }
        });
    } catch (error) {
        return res.status(401).send(`Invalid Token! ${error}.`);
    }
};

module.exports = { verifyTokenAndAuthorization };
