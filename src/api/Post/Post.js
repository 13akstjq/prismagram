import { prisma } from '../../../generated/prisma-client';

export default {
    Post: {
        isLiked: async (parent, __, { request }) => {
            const { id: parentId } = parent;
            const { user } = request;
            const result = await prisma.$exists.like({
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: parentId
                        }
                    }
                ]
            });
            return result;
        },
        likeCount: async (parent, _, __) =>
            await prisma
                .likesConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count(),

        commentCount: async (parent, _, __) =>
            await prisma
                .commentsConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count(),
        files: parent => prisma.post({ id: parent.id }).files(),
        comments: parent => prisma.post({ id: parent.id }).comments(),
        user: parent => prisma.post({ id: parent.id }).user(),
        Likes: parent => prisma.post({ id: parent.id }).Likes()
    }
};
