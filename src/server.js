import './env';
import logger from 'morgan';
import { GraphQLServer } from 'graphql-yoga';
import schema from './schema';
import passport from 'passport';
import { authenticateJwt } from './passport';
import { isAuthenticated } from './middlewares';
import { uploadMiddleware, uploadController } from './upload';

const PORT = process.env.PORT || 4000;
const server = new GraphQLServer({
    schema,
    context: ({ request }) => ({ request, isAuthenticated })
});

server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.post('/api/upload', uploadMiddleware, uploadController);

// server.express.post(
//     '/api/upload',
//     upload.single('file'),
//     ({ req, res, next }) => {
//         const { file } = req;
//         console.log(file);
//         res.end();
//     }
// );

server.start({ port: PORT }, () =>
    console.log(`server is running http://localhost:${PORT}`)
);
