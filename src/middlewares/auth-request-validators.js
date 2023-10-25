const validateAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'Email or password missing int he signup request'
        })
    }
    next();
}

const validateIsAdmin  = (req, res, next) =>{
    if(!req.body.id){
        return res.status(400).json({
            success: false,
            data: {},
            message: 'Something went wrong',
            err: 'User id is nt given'
        })
    }
    next();
}

module.exports ={
    validateAuth,
    validateIsAdmin
}