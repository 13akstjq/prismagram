import './env';
import logger from 'morgan';
import { GraphQLServer } from 'graphql-yoga';
import schema from './schema';
import passport from 'passport';
import { authenticateJwt } from './passport';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request }),
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.start({ port: PORT }, () =>
    console.log(`server is running http://localhost:${PORT}`),
);
