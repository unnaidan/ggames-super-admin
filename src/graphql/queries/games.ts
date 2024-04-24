import { gql } from '@src/graphql-types';

export const GAMES = gql(`
    query Games($search:String $skip:Int $take:Int $orderBy:[GameOrderByInput!]){games(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id icon code name version subtitle description cover ageRating size summaryRating featured createdAt screenshots(orderBy:[{order:asc}]){nodes{src order}}}}}
`);
