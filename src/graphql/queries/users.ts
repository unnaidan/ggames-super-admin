import { gql } from '@src/graphql-types';

export const USERS = gql(`
    query Users($search:String $skip:Int $take:Int $orderBy:[UserOrderByInput!]){users(skip:$skip take:$take orderBy:$orderBy where:{OR:[{name:{contains:$search}}{surname:{contains:$search}}{phone:{contains:$search}}]}){count nodes{id name surname profileImage phone role energy createdAt}}}
`);
