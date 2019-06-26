import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editUser: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { username, firstName, lastName, email, bio } = args;
            const { user } = request;

            return await prisma.updateUser({
                where: { id: user.id },
                data: { username, firstName, lastName, email, bio }
            });
        }
    }
};
