const jwt = require('jsonwebtoken');

async function idMiddleware(req,res,next){
    try{
        const {token} = req.cookies;
        if(!token)
            throw new Error("Token is not Persent");

        const Paylode = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const {_id} = Paylode;
        if(!_id)
            throw new Error("Token Invalid");

        console.log(_id);

         req.userId = _id;
        
        
        // console.log(req.body.user_id);

        next();

    }
    catch(err){
        // res.send("Error : " + err);
        res.json({success : false , message : "Error : " + err});
    }
}

module.exports = idMiddleware;