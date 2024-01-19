function checkAuth(req,res,next) {
    if(req.isAuthenticated()) {
        return next()
    }
    return res.status(401).end()
}



function isUser(req,res,next) {
    if(req.session.role === 'regular') {
        return next()
    }
    return res.status(401).end()
}

function isAdmin(req,res,next) {
    if(req.session.role === 'admin') {
        return next()
    }
    return res.status(401).end()
}

function isGuard(req,res,next) {
    if(req.session.role === 'guard') {
        return next()
    }
    return res.status(401).end()
}

 module.exports = {checkAuth,isUser,isAdmin,isGuard}