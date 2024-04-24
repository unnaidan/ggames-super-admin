import { gql } from '@src/graphql-types';

export const SCOREBOARD = gql(`
    query Scoreboard($id:String){scoreboard(where:{id:$id}){id name profileImage phone position score}}
`);
