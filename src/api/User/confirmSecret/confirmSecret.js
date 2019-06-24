import { prisma } from "../../../../generated/prisma-client";
import {generateJwt} from '../../../utils';
export default {
    Mutation : {
        confirmSecret : async (_,args) =>{
            const {email,secret} = args;
            const user = await prisma.user({email});
            if(secret === user.loginSecret){
                return generateJwt(user.id);
            }else {
                throw Error("Wrong secret!!!");
            }
        }
    }
}