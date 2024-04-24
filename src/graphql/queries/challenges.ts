import { gql } from '@src/graphql-types';

export const CHALLENGES = gql(`
    query Challenges($search:String $skip:Int $take:Int $orderBy:[ChallengeOrderByInput!]){challenges(skip:$skip take:$take orderBy:$orderBy where:{name:{contains:$search}}){count nodes{id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:asc}]){nodes{name order}}}}}
`);
