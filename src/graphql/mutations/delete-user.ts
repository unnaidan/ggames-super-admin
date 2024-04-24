import { gql } from '@src/graphql-types';

export const DELETE_USER = gql(`
    mutation DeleteUser($id:String){deleteUser(where:{id:$id}){id}}
`);
