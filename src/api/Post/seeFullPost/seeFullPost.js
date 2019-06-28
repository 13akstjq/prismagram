import { prisma } from '../../../../generated/prisma-client';
import { POST_FRAGMENT } from '../../../fragments';

export default {
    Query: {
        seeFullPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { id } = args;
            return await prisma.post({ id }).$fragment(POST_FRAGMENT);
        }
    }
};
