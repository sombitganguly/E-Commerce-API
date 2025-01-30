import jwt from 'jsonwebtoken'

export const verifyAdmin = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({message:"Unauthenticated, log in first"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded)=>{
        if(err){
            res.status(404).json({message:"Invalid token"})
            return
        }
        else{
            req.user = decoded
            next()
        }
    })
}