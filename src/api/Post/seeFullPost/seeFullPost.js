import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeFullPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;
            //post , comments , likeCount
            const post = await prisma.post({ id });
            const comments = await prisma.post({ id }).comments();
            const likeCount = 1;
            return {
                post,
                comments,
                likeCount
            };
        }
    }
};
