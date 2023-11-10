const checkAuthentication = (req, res, next) => {
    //console.log(req.session.userId);
    if (typeof req.session.userId == 'undefined') {
        next();
    } else {
        res.redirect('/');
    }
    
}

export default checkAuthentication;
