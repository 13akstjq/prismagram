import { prisma } from '../../../generated/prisma-client';

export default {
    Post: {
        isLiked: async (parent, __, { reqeust }) => {
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
            prisma
                .likesConnection({ where: { post: { id: parent.id } } })
                .aggregate()
                .count()
    }
};
