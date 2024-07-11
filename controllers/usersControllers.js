import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { genAccessToken, genRefreshToken } from '../utility/tokenGen.js';
import { deletingRefreshToken, isValidRefreshToken, saveRefreshToken } from '../utility/refreshToken.js';

const users =[];


export const signup = async(req,res)=>{
    const {fName,lName,pass,usrName}= req.body;
    try{
    const newUser={
        fName : fName,
        lName : lName,
        pass  : await bcrypt.hash(pass,10),
        usrName : usrName,
    }
    users.push(newUser);
    res.status(201).json(users);
}catch(err){
    res.status(401).json({msg:err});
}
}



export const signIn = async (req,res,next)=>{
    const {usrName,pass}=req.body;
    const user = users.find(user=>user.usrName===usrName);
    if(!user){
        return next(); 
    }
    try{
    if (await bcrypt.compare(pass,user.pass)){
     const payLoad = {usrName:usrName};
     const accessToken= genAccessToken(payLoad);
     const refreshToken=genRefreshToken(payLoad);
     saveRefreshToken(refreshToken);
     return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken});

    }
    return res.status(400).json({msg:'invalid credantials'});
}catch (err){
    res.status(400).json({masg:err});
}
}

export const token =(req,res)=>{
  const token = req.body.token;
  if(!token) return res.sendSatus(401);

  if(isValidRefreshToken){
    jwt.verify(token,process.env.REFRESH_TOKEN_SECERT,(err,payLoad)=>{
        if (err) return res.sendStatus(403);
        const accessToken = genAccessToken({usrName:payLoad.usrName});
        const refreshToken= genRefreshToken({usrName:payLoad.usrName});
        deletingRefreshToken(token);
        saveRefreshToken(refreshToken);
        return res.json({ accessToken , refreshToken });

    });
  }

    
}






export const getUser =(req,res)=>{
    const user =users.filter(user=>user.usrName===req.user.usrName);
    res.json(user);
}