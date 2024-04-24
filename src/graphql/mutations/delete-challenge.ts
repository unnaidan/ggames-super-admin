import { gql } from '@src/graphql-types';

export const DELETE_CHALLENGE = gql(`
    mutation DeleteChallenge($id:String){deleteChallenge(where:{id:$id}){id}}
`);
