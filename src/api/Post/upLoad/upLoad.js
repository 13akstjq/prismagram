import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        upLoad: (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, files } = args;
            const post = prisma.createPost({ caption });
            files.array.forEach(element => {});
        }
    }
};
