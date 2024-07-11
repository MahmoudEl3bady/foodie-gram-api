import jwt from 'jsonwebtoken';


export const genAccessToken = (payLoad)=>{
    return  jwt.sign(payLoad,process.env.ACCESS_TOKEN_SECERT,{expiresIn:'40s'});
}




export const genRefreshToken=(payLoad)=>{
    return jwt.sign(payLoad,process.env.REFRESH_TOKEN_SECERT,{expiresIn:'7d'});
}