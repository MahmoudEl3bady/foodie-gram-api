import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db.js';
import { genAccessToken, genRefreshToken } from '../utility/tokenGen.js';
import { revokingRefreshToken, isValidRefreshToken, saveRefreshToken } from '../utility/refreshToken.js';


export const signup = async(req,res)=>{
    const {fName,lName,pass,email,usrName}= req.body;
    console.log(req.body);
    try{
    await db('users').insert({
        first_name : fName,
        last_name : lName,
        password  : await bcrypt.hash(pass,10),
        email : email,
        username : usrName,
    });
    res.sendStatus(201);
}catch(err){
    res.status(401).json({msg:err.message});
}
}



export const signIn = async (req,res,next)=>{
    const {usrName,pass}=req.body;
    try{
   const user = await db('users').where({ username: usrName }).first();
    if(!user){
        return res.status(404).json({msg:unfound});
    }
   
        console.log(user);
    if (await bcrypt.compare(pass,user.password)){
     const accessToken= genAccessToken({id : user.id});
     const refreshToken=genRefreshToken({id : user.id});
     saveRefreshToken(refreshToken,user.id);
     return res.status(200).json({accessToken:accessToken, refreshToken:refreshToken});

    }
    return res.status(400).json({msg:'invalid credantials'});
}catch (err){
    res.status(400).json({msg:err.message});
}
}


export const signOut = async(req,res)=>{
    const token = req.body.token;
    try{
    
    if(!token) return res.sendStatus(401);
    const dbToken= await isValidRefreshToken(token);
    if(!dbToken || dbToken.revoked) return res.sendStatus(403);
    revokingRefreshToken(token);
    return res.status(200).json({ msg: 'Successfully signed out' });
    }catch (err){
        return res.json({msg:err.message});
    }

}
export const token = async(req,res)=>{
  const token = req.body.token;
  if(!token) return res.sendStatus(401);
  const dbToken= await isValidRefreshToken(token);
  console.log(dbToken);
  if(!dbToken || dbToken.revoked) return res.sendStatus(403);
    jwt.verify(token,process.env.REFRESH_TOKEN_SECERT,(err,payLoad)=>{
        if (err) return res.sendStatus(403);
        const accessToken = genAccessToken({id:payLoad.id});
        const refreshToken= genRefreshToken({id:payLoad.id});
        revokingRefreshToken(token);
        console.log(dbToken);
        saveRefreshToken(refreshToken,dbToken.user_id);
        return res.json({ accessToken , refreshToken });

    });
   
}






export const getUser = async(req,res)=>{
    try {
        const user =await db('users').where({id: req.payLoad.id }).first();
        res.json(user);
    } catch (error) {
        res.json({msg:error.message});
    }
    
}