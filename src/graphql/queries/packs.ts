import { gql } from '@src/graphql-types';

export const PACKS = gql(`
    query Packs($search:String $skip:Int $take:Int $orderBy:[PackOrderByInput!]){packs(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name order price energy active createdAt}}}
`);
