import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const authToken = (req,res,next)=>{
    const authHeader= req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.sendStatus(401);
    jwt.verify(token,process.env.ACCESS_TOKEN_SECERT,(err,payload)=>{
        if(err) return res.sendStatus(403);
        req.payload=payload;
        next();
    });
    
}


export default authToken;