import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const { user } = request;
            const { roomId, toId, message } = args;
            let room;
            if (roomId === undefined) {
                // 방이 없기 때문에 새로 만들어야 함.
                if (user.id !== toId) {
                    room = await prisma.createRoom({
                        participants: {
                            connect: [{ id: user.id }, { id: toId }]
                        }
                    });
                }
            } else {
                room = await prisma.room({ id: roomId });
            }
            if (!room) {
                throw Error('room not found');
            }
            const getTo = room.participants.filter(
                participant => user.id !== participant.id
            )[0];
            console.log(getTo);
            return prisma.createMessage({
                text: message,
                from: {
                    connect: {
                        id: user.id
                    }
                },
                to: {
                    connect: {
                        id: toId ? toId : getTo.id
                    }
                },
                room: {
                    connect: {
                        id: room.id
                    }
                }
            });
        }
    }
};
