import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { genAccessToken, genRefreshToken } from '../utility/tokenGen.js';
import { revokingRefreshToken, isValidRefreshToken, saveRefreshToken } from '../utility/refreshToken.js';
import db from '../db/db.js';
import dotenv from 'dotenv';
dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECERT,
    callbackURL: "/users/auth/google/callback"
  },
   async(gaccessToken, grefreshToken, profile, cb) => {
    try {
      const usrName = profile.emails[0].value.split('@')[0];
      const user = await db('users').where({ username: usrName }).first();
      if ( user) {
      console.log(typeof(user.id));
     const accessToken= genAccessToken({id:user.id});
     const refreshToken=genRefreshToken({id:user.id});
     saveRefreshToken(refreshToken,user.id);
     return cb(null,{accessToken,refreshToken});
      }
     const newUser= await db('users').insert({
        first_name : profile.name.givenName,
        last_name : profile.name.familyName,
        email : profile.emails[0].value,
        username : usrName,
    })
    
     const accessToken= genAccessToken({id:newUser[0]});
     const refreshToken=genRefreshToken({id:newUser[0]});
     saveRefreshToken(refreshToken,newUser[0]);
     return cb(null,{accessToken,refreshToken});
     
      
    } catch (err) {
      return cb(err);
    }
  }
));




export default passport;