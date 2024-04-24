import { gql } from '@src/graphql-types';

export const ORDERS = gql(`
    query Orders($search:String $skip:Int $take:Int $orderBy:[OrderOrderByInput!]){orders(skip:$skip take:$take orderBy:$orderBy where:{user:{phone:{contains:$search}}}){count nodes{id status amount createdAt pack{name}user{name surname profileImage phone}}}}
`);
