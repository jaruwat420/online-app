

const verifyRole = (req, res, next) => {
    try {
        // Check if the user is authenticated
        if (!req.session.user) {
            return res.status(403).send('User is not authenticated');
        }

        // Check user role
        console.log(req.session.user.role); // Ensure this prints the correct role

        if (req.session.user.role === 'admin') {
            // User is an admin, allow access
            next();
        } else if (req.session.user.role === 'customer') {
            // User is a customer, redirect to customer page
            res.redirect('/');
        } else {
            // If role is not recognized, deny access
            res.status(403).json("You are not allowed");
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
};

export default verifyRole;