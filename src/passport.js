
// .env 파일을 import하기위한 코드 
import dotenv from "dotenv";
import path from "path";
dotenv.config({path : path.resolve(__dirname, ".env")}); 


import passport from "passport";
import JwtStrategy from 'passport-jwt';
import { prisma } from "../generated/prisma-client";


const JWTOptions = {
    jwtFromRequest  : JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

const verifyUser = (payload, done) =>{
    try{
        const user = prisma.user({id : payload.id});
        if(user !== null){
            return done(null,user);
        }else {
            return done(null,false);
        }
    }catch{
        return done(err,false);
    }
};

passport.use(new JwtStrategy(JWTOptions,verifyUser));

