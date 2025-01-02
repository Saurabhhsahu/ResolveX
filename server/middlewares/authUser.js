import jwt from 'jsonwebtoken'

//admin authentication middleware
const authUser = async(req,res,next) => {
    try{
        const {token} = req.headers;

        if(!token){
            return res.status(401).json({success:false,message:"Not authorized, Login again"})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        req.body.userId = token_decode.id;
        
        next();
    }
    catch(err){
        console.log("error in authentication of admin : ",err);
        res.json({success:false,message:err.message})
    }
}

export default authUser