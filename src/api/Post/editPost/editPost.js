import { prisma } from '../../../../generated/prisma-client';
const EDIT = 'EDIT';
const DELETE = 'DELETE';
export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { id, caption, location, action } = args;
            const post = await prisma.$exists.post({ id, user }); // id를 갖고있는 게시물이면서 user가 request의 user인지
            if (post) {
                if (action === EDIT) {
                    return await prisma.updatePost({
                        where: { id },
                        data: {
                            caption,
                            location
                        }
                    });
                } else if (action === DELETE) {
                    return prisma.deletePost({ id });
                }
            } else {
                throw Error("you can't do that");
            }
        }
    }
};
