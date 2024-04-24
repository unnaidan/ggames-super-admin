import { gql } from '@src/graphql-types';

export const CHALLENGE = gql(`
    query Challenge($id:String){challenge(where:{id:$id}){id name subtitle from to}}
`);
