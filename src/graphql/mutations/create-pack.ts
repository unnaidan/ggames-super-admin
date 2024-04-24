import { gql } from '@src/graphql-types';

export const CREATE_PACK = gql(`
    mutation CreatePack($name:String $order:Int $price:Int $energy:Int $active:Boolean){createPack(data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}
`);
