export const USER_FRAGMENT = `
fragment UserParts on User {
    id
    username
    firstName
    lastName
    email
    bio
    posts {
        id 
        caption
    }
}
`;
