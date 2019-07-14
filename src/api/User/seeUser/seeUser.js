import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        seeUser: async (_, args) => {
            const { username } = args;
            const userProfile = await prisma.user({ username });
            const posts = await prisma.user({ username }).posts();
            console.log(userProfile);
            return {
                user: userProfile,
                posts
            };
        }
    }
};
