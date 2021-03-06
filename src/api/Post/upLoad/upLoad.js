import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        upLoad: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { caption, location, files } = args;
            const post = await prisma.createPost({
                caption,
                location,
                user: { connect: { id: user.id } }
            });
            files.forEach(async file => {
                await prisma.createFile({
                    url: file,
                    post: {
                        // post에도 연결이 됨.... 굳
                        connect: {
                            id: post.id
                        }
                    }
                });
            });
            return post;
        }
    }
};
