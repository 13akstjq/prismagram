import { prisma } from '../../../../generated/prisma-client';

const CREATED = 'CREATED';

export default {
    Subscription: {
        newMessage: async (_, args) => {
            const { roomId } = args;
            return await prisma.$subscribe.message({
                AND: [
                    {
                        mutation_in: 'CREATED'
                    },
                    {
                        node: {
                            room: {
                                id: roomId
                            }
                        }
                    }
                ]
            });
        }
    }
};
