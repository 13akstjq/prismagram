import { prisma } from '../../../generated/prisma-client';

export default {
    Post: {
        isLiked: async (parent, __, { request }) => {
            const { id: parentId } = parent;
            const { user } = request;

            return await prisma.$exists.post({
                AND: [
                    {
                        id: parentId
                    },
                    {
                        Likes_some: {
                            id: user.id
                        }
                    }
                ]
            });
        },
        likeCount: async (parent, _, __) =>
            await prisma
                .likesConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count(),
        files: parent => prisma.post({ id: parent.id }).files(),
        comments: parent => prisma.post({ id: parent.id }).comments(),
        user: parent => prisma.post({ id: parent.id }).user(),
        Likes: parent => prisma.post({ id: parent.id }).Likes()
    }
};
