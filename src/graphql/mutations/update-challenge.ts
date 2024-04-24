import { gql } from '@src/graphql-types';

export const UPDATE_CHALLENGE = gql(`
    mutation UpdateChallenge($id:String $name:String $subtitle:String $energy:Int $from:String $to:String $promoImage:String $gameId:String $prizes:PrizeCreateNestedManyInput){updateChallenge(where:{id:$id}data:{name:$name subtitle:$subtitle energy:$energy from:$from to:$to promoImage:$promoImage gameId:$gameId prizes:$prizes}){id name subtitle energy from to promoImage gameId createdAt game{name}prizes(orderBy:[{order:desc}]){nodes{name}}}}
`);
