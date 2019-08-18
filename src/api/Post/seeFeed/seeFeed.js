import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeFeed: async (_, __, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            return await prisma.posts({
                where: {
                    OR: [{ user }, { user: { followers_some: user } }]
                }
                // orderBy: 'createdAt_DESC'
            });
        }
    }
};
