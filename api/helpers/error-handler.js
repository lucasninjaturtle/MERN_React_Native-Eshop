function errorHandler(err, req, res, next){
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        //JWT authentic error
        return res.status(401).json({message: 'the user is not Authorized'})
    }
    if(err.name === 'ValidationError'){
        //validation error
        return res.status(401).json({message: err})
    }else{
        //default error
        return res.status(500).json(err)
    }
}

module.exports=errorHandler;