import { gql } from '@src/graphql-types';

export const DELETE_GAME = gql(`
    mutation DeleteGame($id:String){deleteGame(where:{id:$id}){id}}
`);
