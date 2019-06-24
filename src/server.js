import './env';
import logger from 'morgan';
import {GraphQLServer} from 'graphql-yoga';
import schema from './schema';
import passport from 'passport';
import './passport';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({schema});

server.express.use(logger("dev"));
server.start({port : PORT}, () => console.log(`server is running http://localhost:${PORT}`));