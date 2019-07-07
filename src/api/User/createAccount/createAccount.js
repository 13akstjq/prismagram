import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const {
                username,
                email,
                firstName = '',
                lastName = '',
                bio = ''
            } = args;

            const emailExists = await prisma.$exists.user({ email });
            if (emailExists) {
                throw Error('this email is already taken!');
            }
            const usernameExists = await prisma.$exists.user({ username });
            if (usernameExists) {
                throw Error('this username is already taken!');
            }
            const user = await prisma.createUser({
                username,
                email,
                firstName,
                lastName,
                bio
            });
            return true;
        }
    }
};
