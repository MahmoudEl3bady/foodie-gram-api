import db from '../db/db.js';   
import crypto from 'crypto';


 const hashToken = (token) => {
    const hash = crypto.createHash('sha256'); // Use a cryptographic hash function like SHA-256
    hash.update(token); // Update hash with token
    return hash.digest('hex'); // Get hashed token as hexadecimal string
  };


  
export const  saveRefreshToken = async (token,id) =>{
    try {
        await db('refreshtoken').insert({
            user_id:parseInt(id),
            token: hashToken(token),
            expires_at:new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
         });
    } catch (error) {
        return error;
    }
    
}

export const isValidRefreshToken= async (token)=> {
    try{
    const dbToken = await db('refreshtoken').where({ token: hashToken(token) }).first();
    return dbToken;
    }catch (err){
        return err;
    }
}




export const revokingRefreshToken= async (token)=>{
     try {
        await db('refreshtoken').where({token:hashToken(token)}).update({revoked:true});
     } catch (error) {
        
     }
}