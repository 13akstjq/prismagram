import passport from "passport";
import {Strategy , ExtractJwt} from 'passport-jwt';
import { prisma } from "../generated/prisma-client";

const JWTOptions = {
    jwtFromRequest  : ExtractJwt.fromAuthHeaderAsBearerToken(),
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

passport.use(new Strategy(JWTOptions,verifyUser));

