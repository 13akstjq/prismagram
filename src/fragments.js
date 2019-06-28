export const COMMENT_FRAGMENT = `
        id
        text
        user {
            username
        }
`;

export const USER_FRAGMENT = `
        id
        username
`;

export const FILE_FRAGMENT = `
        id
        url
`;

export const POST_FRAGMENT = `
    fragment PostParts on Post {
        id
        caption
        location
        user {
            ${USER_FRAGMENT}
        }
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
    }
`;
