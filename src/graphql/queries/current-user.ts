import { gql } from '@src/graphql-types';

export const CURRENT_USER = gql(`
    query CurrentUser{currentUser{id name surname profileImage phone role}}
`);
