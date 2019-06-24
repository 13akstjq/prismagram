
// .env 파일을 import하기위한 코드 
import dotenv from "dotenv";
import path from "path";
dotenv.config({path : path.resolve(__dirname, ".env")}); 

import {Adjectives,Nouns} from './words';
import nodemailer from 'nodemailer';
import sgTransport from "nodemailer-sendgrid-transport";
import jwt from 'jsonwebtoken';


export const generateSecret = () =>{
    const randomNumber = Math.floor(Math.random()*Adjectives.length);
    return  `${Adjectives[randomNumber]} ${Nouns[randomNumber]}`; 
}

 const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
          }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};

export const sendSecretMail = (address,secret) => {
    const email = {
        from : "mshan7@prismagram.com",
        to : address,
        subject : "confirm for login",
        html : `secret key is <Strong>${secret}</Strong>`
    };
    return sendMail(email);
}


export const generateJwt = (id) => jwt.sign({id},process.env.JWT_SECRET);