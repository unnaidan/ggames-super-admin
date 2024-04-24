import { gql } from '@src/graphql-types';

export const UPDATE_PACK = gql(`
    mutation UpdatePack($id:String $name:String $order:Int $price:Int $energy:Int $active:Boolean){updatePack(where:{id:$id}data:{name:$name order:$order price:$price energy:$energy active:$active}){id name order price energy active createdAt}}
`);
