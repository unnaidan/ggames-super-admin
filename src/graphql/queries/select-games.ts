import { gql } from '@src/graphql-types';

export const SELECT_GAMES = gql(`
    query SelectGames{games(orderBy:{name:asc}){nodes{id name}}}
`);
